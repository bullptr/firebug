import { memo, useMemo } from 'react';
import { Box, Slider } from '@mui/joy';

interface PredictedLegendProps {
  gradientColors?: [string, string];
}

export const PredictedLegend = memo(({ gradientColors = ['#ffffff', '#ff0000'] }: PredictedLegendProps) => {
  const marks = useMemo(() => [
    { value: 0, label: '0%' },
    { value: 20, label: '20%' },
    { value: 40, label: '40%' },
    { value: 60, label: '60%' },
    { value: 80, label: '80%' },
    { value: 100, label: '100%' },
  ], []);

  return (
    <Box sx={{ m: "10px 8px", mt: 0 }}>
      <Slider
        aria-label="Predicted Probability Legend"
        getAriaValueText={(value: number) => `${value}%`}
        step={10}
        marks={marks}
        valueLabelDisplay="on"
        sx={{
          '.MuiSlider-thumb, .MuiSlider-track': { display: 'none' },
          '.MuiSlider-rail': {
            background: `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`,
            height: 12,
            borderRadius: 0,
            border: '1px solid var(--joy-palette-neutral-600, #555E68)',
            ml: 0.2,
            mr: 0.3,
          },
          '.MuiSlider-mark': {
            top: 32,
            height: 9,
            width: "1px",
            borderRadius: 0,
            bgcolor: 'var(--joy-palette-neutral-600, #555E68)'
          },
          '.MuiSlider-markLabel': { fontSize: '10px', top: 40 },
        }}
      />
    </Box>
  );
});
