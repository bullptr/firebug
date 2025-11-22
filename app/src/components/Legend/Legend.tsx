import { memo } from 'react';
import { Card, Stack, Typography, Box, Divider } from '@mui/joy';
import type { FilterKey } from '../../types';
import { FILTER_KEYS, COLORS } from '../../constants';
import { PredictedLegend } from './PredictedLegend';

interface LegendProps {
  viewMode: 'Historic' | 'Predicted';
  totals: {
    t: Record<FilterKey, number>;
    total: number;
    totalAcres: number;
  };
  filteredPredictedCount: number;
  isLoading: boolean;
}

// @ts-ignore
export const Legend = memo(({ viewMode, totals, filteredPredictedCount, isLoading }: LegendProps) => (
  <Card
    sx={{
      position: 'absolute',
      right: 12,
      top: 12,
      zIndex: 500,
      minWidth: 240,
      p: 1,
    }}
  >
    <Stack gap={0.75}>
      {viewMode === 'Predicted' && (
        <>
          <Typography level="title-sm">Predicted Probability</Typography>
          <PredictedLegend />
          <Divider sx={{ my: 0.5 }} />
          <Stack direction="row" justifyContent="space-between">
            <Typography level="body-sm">Visible points</Typography>
            <Typography level="body-sm" fontWeight="lg">
              {filteredPredictedCount.toLocaleString()}
            </Typography>
          </Stack>
        </>
      )}
      {viewMode === 'Historic' && (
        <>
          <Typography level="title-sm">Incidents by size</Typography>
          {FILTER_KEYS.map(k => (
            <Stack key={k} direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" gap={1.25}>
                <Box sx={{ width: 14, height: 14, bgcolor: COLORS[k], borderRadius: '50%' }} />
                <Typography level="body-sm">{k}</Typography>
              </Stack>
              <Typography level="body-sm">{totals.t[k].toLocaleString()}</Typography>
            </Stack>
          ))}
          <Divider sx={{ my: 0.5 }} />
          <Stack direction="row" justifyContent="space-between">
            <Typography level="body-sm">Visible incidents</Typography>
            <Typography level="body-sm" fontWeight="lg">
              {totals.total.toLocaleString()}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography level="body-sm">Total acres</Typography>
            <Typography level="body-sm">{totals.totalAcres.toLocaleString()}</Typography>
          </Stack>
        </>
      )}
    </Stack>
  </Card>
));
