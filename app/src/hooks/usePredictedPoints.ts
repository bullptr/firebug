import { useMemo } from 'react';
import { scaleLinear, scaleSqrt } from 'd3-scale';
import type { PredictedFire } from '../types';

export const usePredictedPoints = (predicted: PredictedFire[]) => {
  return useMemo(() => {
    if (predicted.length === 0) return [];

    const colorScale = scaleLinear<string>()
      .domain([0, 1])
      .range(['#ffffff', '#ff0000']);

    const rScale = scaleSqrt()
      .domain([0, 1])
      .range([2, 9]);

    return predicted.map(p => ({
      lat: p.LAT,
      lon: p.LON,
      prob: p.PROBABILITY,
      color: colorScale(p.PROBABILITY),
      radius: rScale(p.PROBABILITY),
    }));
  }, [predicted]);
};
