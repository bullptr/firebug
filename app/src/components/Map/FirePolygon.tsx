import { memo, useMemo } from 'react';
import { Polygon, Tooltip } from 'react-leaflet';
import type { FireIncident } from '../../types';
import { toFilterKey } from '../../utils';
import { COLORS, FIRE_CAUSES } from '../../constants';

interface FirePolygonProps {
  incident: FireIncident;
}

export const FirePolygon = memo(({ incident }: FirePolygonProps) => {
  const acres = incident.GIS_ACRES;
  const filterKey = toFilterKey(acres);
  const fillColor = COLORS[filterKey];

  const positions = useMemo(() => {
    const geometry = typeof incident.geometry === 'string'
      ? JSON.parse(incident.geometry)
      : incident.geometry;
    return geometry.coordinates.map(
      // @ts-ignore
      ring => ring.map(([lon, lat]) => [lat, lon] as [number, number])
    );
  }, [incident.geometry]);

  const pathOptions = useMemo(() => ({
    color: fillColor,
    fillColor,
    fillOpacity: 0.4,
    weight: 1.5,
  }), [fillColor]);

  return (
    <Polygon
      positions={positions}
      pathOptions={pathOptions}
    >
      {/* @ts-ignore */}
      <Tooltip direction="top">
        <div>
          <div><strong>{incident.FIRE_NAME || 'Unknown Fire'}</strong></div>
          {incident.COMPLEX_NAME && (
            <div style={{ fontSize: 11, opacity: 0.75, fontStyle: 'italic' }}>
              Complex: {incident.COMPLEX_NAME}
            </div>
          )}
          <div style={{ fontSize: 12, opacity: 0.85 }}>
            {incident.AGENCY} · {incident.UNIT_ID}
          </div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>
            Acres: {incident.GIS_ACRES.toLocaleString()}
          </div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>
            Alarm: {new Date(incident.ALARM_DATE).toLocaleDateString()}
          </div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>
            Cause: {FIRE_CAUSES[incident.CAUSE] || 'Unknown'}
          </div>
        </div>
      </Tooltip>
    </Polygon>
  );
}, (prev, next) => prev.incident.OBJECTID === next.incident.OBJECTID);
