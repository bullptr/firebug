import React, { memo, useCallback, useMemo } from 'react';
import { Box, Chip } from '@mui/joy';

export interface SegmentedControlProps {
  options: string[];
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  sx?: any;
}

export const SegmentedControl = memo(({
  options,
  value,
  defaultValue,
  onChange,
  orientation = 'horizontal',
  sx,
}: SegmentedControlProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string>(defaultValue ?? options[0] ?? '');
  const selected = isControlled ? (value as string) : internalValue;

  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const selectAt = useCallback((index: number) => {
    const next = options[index];
    if (next == null) return;
    if (!isControlled) setInternalValue(next);
    onChange(next);
    itemRefs.current[index]?.focus();
  }, [options, isControlled, onChange]);

  const currentIndex = useMemo(() => Math.max(0, options.indexOf(selected)), [options, selected]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!options.length) return;
    const isVertical = orientation === 'vertical';
    if (e.key === 'ArrowRight' || (e.key === 'ArrowDown' && isVertical)) {
      e.preventDefault();
      selectAt((currentIndex + 1) % options.length);
    } else if (e.key === 'ArrowLeft' || (e.key === 'ArrowUp' && isVertical)) {
      e.preventDefault();
      selectAt((currentIndex - 1 + options.length) % options.length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      selectAt(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      selectAt(options.length - 1);
    }
  }, [options, orientation, currentIndex, selectAt]);

  return (
    <Box
      role="radiogroup"
      onKeyDown={handleKeyDown}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        ...sx,
      }}
    >
      {options.map((option, index) => {
        const checked = selected === option;
        return (
          <Chip
            key={option}
            component="button"
            type="button"
            onClick={() => selectAt(index)}
            ref={(el: HTMLButtonElement | null) => {
              itemRefs.current[index] = el;
            }}
            tabIndex={checked ? 0 : -1}
            role="radio"
            aria-checked={checked}
            color={checked ? 'primary' : 'neutral'}
            variant={checked ? 'solid' : 'soft'}
            sx={{
              px: 2,
              alignItems: 'center',
              border: 'none',
            }}
          >
            {option}
          </Chip>
        );
      })}
    </Box>
  );
});
