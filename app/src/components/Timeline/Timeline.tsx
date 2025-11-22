import { memo, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { ticks as d3ticks, tickStep } from 'd3-array';
import { Box, Divider, Sheet } from '@mui/joy';
import { useColorScheme } from '@mui/joy/styles';
import { FILTER_KEYS, COLORS } from '../../constants';

interface TimelineProps {
  timeline: Array<Record<string, any>>;
  height?: number;
}

export const Timeline = memo(({ timeline, height = 140 }: TimelineProps) => {
  const { mode, systemMode } = useColorScheme();
  const chartOption = useMemo(() => {
    const max = Math.max(
      0,
      ...timeline.map(t =>
        FILTER_KEYS.reduce((s, k) => s + (t as any)[k], 0)
      )
    );

    const step = max > 0 ? tickStep(0, max, 6) : 1;
    const upper = max > 0 ? Math.ceil(max / step) * step : 1;
    const ticks = d3ticks(0, upper, Math.round(upper / step));

    const hideXAxisLabels = timeline.length > 60;
    const weekLabels = timeline.map(t => t.week);

    const formatWeek = (v: string) => {
      const d = new Date(v + 'T00:00:00Z');
      const mm = d.getUTCMonth() + 1;
      const dd = d.getUTCDate();
      const yy = String(d.getUTCFullYear()).slice(2);
      return `${mm}/${String(dd).padStart(2, '0')}/${yy}`;
    };

    const option: EChartsOption = {
      animation: true,
      tooltip: { trigger: 'axis' },
      legend: {
        top: 8,
        left: 8,
        itemWidth: 12,
        itemHeight: 8,
        data: FILTER_KEYS,
      },
      grid: { left: 40, right: 16, top: 36, bottom: 24 },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: weekLabels,
        axisLabel: {
          show: !hideXAxisLabels,
          interval: hideXAxisLabels ? 'auto' : (idx: number) => idx % 2 === 0,
          formatter: formatWeek,
        },
        axisTick: { alignWithLabel: true },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: upper,
        axisLabel: {
          formatter: (val: number) => `${val}`,
        },
        splitNumber: Math.max(1, ticks.length - 1),
        splitLine: { show: true },
      },
      series: FILTER_KEYS.map(k => ({
        name: k,
        type: 'bar',
        stack: 'total',
        emphasis: { focus: 'series' },
        itemStyle: { color: COLORS[k] },
        data: timeline.map(row => (row as any)[k] ?? 0),
      })),
    };

    return option;
  }, [timeline]);

  return (
    <Sheet>
      <Box sx={{ width: '100%', height }}>
        <ReactECharts
          theme={mode == "system" ? systemMode : mode}
          option={chartOption}
          style={{ width: '100%', height: '100%' }}
          notMerge
          lazyUpdate
        />
        <Divider sx={{ zIndex: 999 }} />
      </Box>
    </Sheet>
  );
});
