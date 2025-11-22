import { memo, useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';
import type { ViewportBounds } from '../../types';

interface MapViewportTrackerProps {
  onViewportChange: (bounds: ViewportBounds) => void;
}

export const MapViewportTracker = memo(({ onViewportChange }: MapViewportTrackerProps) => {
  const map = useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();
      const zoom = map.getZoom();

      onViewportChange({
        minLat: bounds.getSouth(),
        maxLat: bounds.getNorth(),
        minLon: bounds.getWest(),
        maxLon: bounds.getEast(),
        zoom
      });
    },
    zoomend: () => {
      const bounds = map.getBounds();
      const zoom = map.getZoom();

      onViewportChange({
        minLat: bounds.getSouth(),
        maxLat: bounds.getNorth(),
        minLon: bounds.getWest(),
        maxLon: bounds.getEast(),
        zoom
      });
    }
  });

  useEffect(() => {
    const bounds = map.getBounds();
    const zoom = map.getZoom();

    onViewportChange({
      minLat: bounds.getSouth(),
      maxLat: bounds.getNorth(),
      minLon: bounds.getWest(),
      maxLon: bounds.getEast(),
      zoom
    });
  }, [map, onViewportChange]);

  return null;
});
