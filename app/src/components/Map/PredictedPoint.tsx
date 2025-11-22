import { memo, useMemo } from 'react';
import { CircleMarker, Tooltip } from 'react-leaflet';

interface PredictedPointProps {
  point: {
    lat: number;
    lon: number;
    prob: number;
    color: string;
    radius: number;
  };
  idx: number;
}

// @ts-ignore
export const PredictedPoint = memo(({ point, idx }: PredictedPointProps) => {
  const pathOptions = useMemo(() => ({
    fillColor: point.color,
    fillOpacity: 0.9,
    color: "var(--joy-palette-neutral-600, #555E68)",
    weight: 1,
    opacity: 0.9,
    radius: point.radius,
  }), [point.color, point.radius]);

  return (
    <CircleMarker
      center={[point.lat, point.lon]}
      pathOptions={pathOptions}
    >
      {/* @ts-ignore */}
      <Tooltip direction="top">
        <div>
          <div><strong>Predicted Fire Risk</strong></div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>
            Probability: {(point.prob * 100).toFixed(1)}%
          </div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>
            Location: {point.lat.toFixed(4)}, {point.lon.toFixed(4)}
          </div>
        </div>
      </Tooltip>
    </CircleMarker>
  );
}, (prev, next) => prev.idx === next.idx && prev.point.prob === next.point.prob);
