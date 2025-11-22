import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import debounce from 'lodash.debounce';
import type { FireIncident, PredictedFire, ViewportBounds, FilterKey } from '../types';
import { toFilterKey, startOfWeekISO, parseAlarmDate } from '../utils';
import { DEFAULT_PROBABILITY_THRESHOLD, FILTER_KEYS } from '../constants';

export const useFireData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [incidents, setIncidents] = useState<FireIncident[]>([]);
  const [predicted, setPredicted] = useState<PredictedFire[]>([]);
  const [activeFilters] = useState<FilterKey[]>(FILTER_KEYS);
  const [nameFilter, setNameFilter] = useState('');
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedCauses, setSelectedCauses] = useState<number[]>([]);
  const [selectedAgencies, setSelectedAgencies] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'Historic' | 'Predicted'>('Historic');
  const [probabilityThreshold, setProbabilityThreshold] = useState(DEFAULT_PROBABILITY_THRESHOLD);
  const [viewport, setViewport] = useState<ViewportBounds | null>(null);
  const [allYears, setAllYears] = useState<number[]>([]);
  const [allCauses, setAllCauses] = useState<number[]>([]);
  const [allAgencies, setAllAgencies] = useState<string[]>([]);
  const predictedAbortController = useRef<AbortController | null>(null);

  // load metadata for filters
  const loadMetadata = useCallback(async () => {
    try {
      const res = await fetch("/api/historical", { method: "POST" });
      const data = await res.json();

      const agencies = new Set<string>();
      const causes = new Set<number>();
      const years = new Set<number>();

      data.forEach((inc: FireIncident) => {
        if (inc.AGENCY) agencies.add(inc.AGENCY);
        if (inc.CAUSE) causes.add(inc.CAUSE);
        if (inc.YEAR_) years.add(inc.YEAR_);
      });

      setIncidents(data);
      setAllAgencies(Array.from(agencies).sort());
      setAllCauses(Array.from(causes).sort((a, b) => a - b));
      setAllYears(Array.from(years).sort((a, b) => b - a));
    } catch (e: any) {
      console.error('Failed to load metadata:', e);
    }
  }, []);

  useEffect(() => {
    loadMetadata();
  }, [loadMetadata]);

  // fetch predicted data
  const fetchPredictedData = useCallback(async (bounds: ViewportBounds) => {
    if (predictedAbortController.current) {
      predictedAbortController.current.abort();
    }

    predictedAbortController.current = new AbortController();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/predicted', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: predictedAbortController.current.signal,
        body: JSON.stringify({
          min_lat: bounds.minLat,
          max_lat: bounds.maxLat,
          min_lon: bounds.minLon,
          max_lon: bounds.maxLon,
          min_probability: probabilityThreshold,
          zoom: bounds.zoom,
        }),
      });

      const data = await res.json();
      setPredicted(data);
    } catch (e: any) {
      if (e.name !== 'AbortError') {
        setError(e?.message ?? 'Failed to load predicted data');
      }
    } finally {
      setLoading(false);
    }
  }, [probabilityThreshold]);

  const debouncedFetchData = useMemo(
    () => debounce((bounds: ViewportBounds) => {
      fetchPredictedData(bounds);
    }, 500),
    [fetchPredictedData]
  );

  const handleViewportChange = useCallback((bounds: ViewportBounds) => {
    setViewport(bounds);
    debouncedFetchData(bounds);
  }, [debouncedFetchData]);

  useEffect(() => {
    if (viewport && viewMode === 'Predicted') {
      debouncedFetchData.cancel();
      fetchPredictedData(viewport);
    }
  }, [probabilityThreshold, viewport, viewMode, fetchPredictedData]);

  useEffect(() => {
    if (viewport) {
      if (viewMode === 'Predicted') {
        fetchPredictedData(viewport);
      }
    }
  }, [viewMode, viewport, fetchPredictedData]);

  // filtered incidents
  const filtered = useMemo(() => {
    return incidents.filter(f => {
      if (selectedAgencies.length > 0 && !selectedAgencies.includes(f.AGENCY)) return false;
      if (selectedCauses.length > 0 && !selectedCauses.includes(f.CAUSE)) return false;
      if (selectedYears.length > 0 && !selectedYears.includes(f.YEAR_)) return false;
      if (nameFilter && !f.FIRE_NAME.toLowerCase().includes(nameFilter.toLowerCase())) return false;
      return true;
    });
  }, [incidents, selectedAgencies, selectedCauses, selectedYears, nameFilter]);

  // totals
  const totals = useMemo(() => {
    const t: Record<FilterKey, number> = {
      'Minor (<100 ac)': 0,
      'Small (100-999 ac)': 0,
      'Medium (1k-9,999 ac)': 0,
      'Large (10k-99k ac)': 0,
      'Mega (100k+ ac)': 0,
    };
    let totalAcres = 0;

    for (const f of filtered) {
      t[toFilterKey(f.GIS_ACRES)]++;
      totalAcres += f.GIS_ACRES;
    }

    return { t, total: filtered.length, totalAcres };
  }, [filtered]);

  // timeline
  const timeline = useMemo(() => {
    const map = new Map<string, Record<string, any>>();

    for (const f of filtered) {
      const week = startOfWeekISO(parseAlarmDate(f.ALARM_DATE));
      if (!map.has(week)) {
        map.set(week, {
          week,
          'Minor (<100 ac)': 0,
          'Small (100-999 ac)': 0,
          'Medium (1k-9,999 ac)': 0,
          'Large (10k-99k ac)': 0,
          'Mega (100k+ ac)': 0,
        });
      }
      const row = map.get(week)!;
      row[toFilterKey(f.GIS_ACRES)]++;
    }

    return Array.from(map.values()).sort((a, b) => (a.week < b.week ? -1 : 1));
  }, [filtered]);

  return {
    loading,
    error,
    incidents,
    predicted,
    filtered,
    activeFilters,
    nameFilter,
    setNameFilter,
    selectedYears,
    setSelectedYears,
    selectedCauses,
    setSelectedCauses,
    selectedAgencies,
    setSelectedAgencies,
    viewMode,
    setViewMode,
    probabilityThreshold,
    setProbabilityThreshold,
    allYears,
    allCauses,
    allAgencies,
    totals,
    timeline,
    handleViewportChange,
  };
};
