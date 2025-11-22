import { memo, useCallback } from 'react';
import { Button } from '@mui/joy';
import { useMap } from 'react-leaflet';

interface ResetViewButtonProps {
  center: [number, number];
  zoom?: number;
}

export const ResetViewButton = memo(({ center, zoom = 6 }: ResetViewButtonProps) => {
  const map = useMap();
  const handleReset = useCallback(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return (
    <Button
      size="sm"
      variant="soft"
      color="neutral"
      onClick={handleReset}
      sx={{ position: 'absolute', left: 10, bottom: 10, zIndex: 500, bgcolor: 'background.body' }}
    >
      Reset Zoom
    </Button>
  );
});
