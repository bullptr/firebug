import type { FilterKey } from '../types';

export const FIRE_CAUSES: Record<number, string> = {
  1: 'Lightning',
  2: 'Equipment Use',
  3: 'Smoking',
  4: 'Campfire',
  5: 'Debris Burning',
  6: 'Railroad',
  7: 'Arson',
  8: 'Playing with Fire',
  9: 'Miscellaneous',
  10: 'Vehicle',
  11: 'Power Line',
  12: 'Firefighter Training',
  13: 'Non-Firefighter Training',
  14: 'Unknown/Unidentified',
  15: 'Structure',
  16: 'Aircraft',
  17: 'Volcanic',
  18: 'Escaped Prescribed Burn',
  19: 'Illegal Alien Campfire',
};

export const FILTER_KEYS: FilterKey[] = [
  'Minor (<100 ac)',
  'Small (100-999 ac)',
  'Medium (1k-9,999 ac)',
  'Large (10k-99k ac)',
  'Mega (100k+ ac)',
];

export const COLORS: Record<FilterKey, string> = {
  'Minor (<100 ac)': '#10b981',
  'Small (100-999 ac)': '#84cc16',
  'Medium (1k-9,999 ac)': '#f59e0b',
  'Large (10k-99k ac)': '#ef4444',
  'Mega (100k+ ac)': '#7f1d1d',
};

export const CALIFORNIA_CENTER: [number, number] = [37.25, -119.5];
