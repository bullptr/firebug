import { useEffect } from 'react';
import { useColorScheme } from '@mui/joy/styles';
import 'leaflet/dist/leaflet.css';
import { TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';

import {
  MAP_DARK_TILE_URL,
  MAP_LIGHT_TILE_URL,
  MAP_TILE_ATTRIBUTION
} from '../../constants';

export default function DynamicTileLayer() {
  const map = useMap();
  const { mode } = useColorScheme();
  const tileUrl = mode === 'light' ? MAP_LIGHT_TILE_URL : MAP_DARK_TILE_URL;

  console.log('App rendered with mode:', mode);

  useEffect(() => {
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        layer.redraw();
      }
    });
  }, [tileUrl, map]);

  return (
    <TileLayer
      key={mode} // forces unmount/remount on mode change
      attribution={MAP_TILE_ATTRIBUTION}
      url={tileUrl}
    />
  );
}
