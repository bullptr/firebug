import { useCallback } from 'react';
import { Sheet, Box } from '@mui/joy';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';

import { CALIFORNIA_CENTER } from './constants';
import { useFireData } from './hooks/useFireData';
import { usePredictedPoints } from './hooks/usePredictedPoints';
import { Timeline } from './components/Timeline/Timeline';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Legend } from './components/Legend/Legend';
import { TitleBanner } from './components/TitleBanner/TitleBanner';
import { MapViewportTracker } from './components/Map/MapViewportTracker';
import { ResetViewButton } from './components/Map/ResetViewButton';
import { FirePolygon } from './components/Map/FirePolygon';
import { PredictedPoint } from './components/Map/PredictedPoint';

export default function App() {
  const {
    loading,
    error,
    filtered,
    predicted,
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
  } = useFireData();

  const predictedPoints = usePredictedPoints(predicted);

  const handleResetFilters = useCallback(() => {
    setSelectedAgencies([]);
    setSelectedCauses([]);
    setSelectedYears([]);
    setNameFilter('');
    setProbabilityThreshold(0.2);
  }, [setSelectedAgencies, setSelectedCauses, setSelectedYears, setNameFilter, setProbabilityThreshold]);

  const handleViewModeChange = useCallback((value: string) => {
    setViewMode(value as 'Historic' | 'Predicted');
  }, [setViewMode]);

  const topBarHeight = 140;

  return (
    <Sheet sx={{ minHeight: '100dvh', display: 'grid', gridTemplateRows: `${topBarHeight}px 1fr` }}>
      <Timeline timeline={timeline} height={topBarHeight} />

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr' }}>
        <Box sx={{ position: 'relative' }}>
          <MapContainer
            // @ts-ignore
            center={CALIFORNIA_CENTER}
            zoom={6}
            style={{ height: '100%', width: '100%' }}
            minZoom={4}
            maxZoom={18}
            zoomControl={false}
            preferCanvas={true}
          >
            <TileLayer
              // @ts-ignore
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapViewportTracker onViewportChange={handleViewportChange} />

            {viewMode === 'Historic' && filtered.map((incident) => (
              <FirePolygon key={incident.OBJECTID} incident={incident} />
            ))}

            {viewMode === 'Predicted' && predictedPoints.map((point, idx) => (
              <PredictedPoint key={`predicted-${idx}`} point={point} idx={idx} />
            ))}

            <ResetViewButton center={CALIFORNIA_CENTER} />
          </MapContainer>

          <Sidebar
            loading={loading}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onResetFilters={handleResetFilters}
            nameFilter={nameFilter}
            onNameFilterChange={setNameFilter}
            selectedYears={selectedYears}
            onYearsChange={setSelectedYears}
            allYears={allYears}
            selectedCauses={selectedCauses}
            onCausesChange={setSelectedCauses}
            allCauses={allCauses}
            selectedAgencies={selectedAgencies}
            onAgenciesChange={setSelectedAgencies}
            allAgencies={allAgencies}
            probabilityThreshold={probabilityThreshold}
            onProbabilityThresholdChange={setProbabilityThreshold}
            error={error}
          />

          <Legend
            viewMode={viewMode}
            totals={totals}
            filteredPredictedCount={predicted.length}
            isLoading={loading}
          />

          <TitleBanner viewMode={viewMode} />
        </Box>
      </Box>
    </Sheet>
  );
}
