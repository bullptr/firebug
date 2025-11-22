// ==============================
// Dummy data (California fires)
// Super large synthetic generator
// ==============================

export type FireIncident = {
  id: string;
  name: string;
  county: string;
  lat: number;
  lon: number;
  start_date: string; // YYYY-MM-DD
  acres: number;
  containment: number; // 0..100
  structures: number;
  status: 'Active' | 'Contained' | 'Controlled' | 'Out';
};

// ---------------------------------
// Original seed data you provided
// ---------------------------------
export const SEED_FIRES: FireIncident[] = [
  // Mega (100k+)
  { id: 'fx001', name: 'Delta Ridge', county: 'Shasta', lat: 40.65, lon: -122.41, start_date: '2024-07-12', acres: 214500, containment: 98, structures: 230, status: 'Controlled' },
  { id: 'fx002', name: 'Cima Complex', county: 'San Bernardino', lat: 35.25, lon: -115.60, start_date: '2024-08-03', acres: 132800, containment: 87, structures: 95, status: 'Contained' },
  { id: 'fx003', name: 'Sierra Crest', county: 'Fresno', lat: 36.98, lon: -119.16, start_date: '2024-09-08', acres: 308900, containment: 100, structures: 410, status: 'Out' },
  { id: 'fx004', name: 'North Fork', county: 'Plumas', lat: 40.10, lon: -121.15, start_date: '2025-06-05', acres: 154200, containment: 62, structures: 55, status: 'Active' },
  { id: 'fx005', name: 'Coast Range', county: 'Sonoma', lat: 38.58, lon: -122.80, start_date: '2025-07-02', acres: 189300, containment: 45, structures: 320, status: 'Active' },

  // Large (10k–99,999)
  { id: 'fx101', name: 'Canyon', county: 'Los Angeles', lat: 34.35, lon: -118.50, start_date: '2024-05-19', acres: 45200, containment: 100, structures: 18, status: 'Out' },
  { id: 'fx102', name: 'Kern Plateau', county: 'Kern', lat: 35.65, lon: -118.45, start_date: '2024-06-30', acres: 63100, containment: 92, structures: 40, status: 'Controlled' },
  { id: 'fx103', name: 'Trabuco', county: 'Orange', lat: 33.70, lon: -117.50, start_date: '2024-10-15', acres: 25750, containment: 100, structures: 6, status: 'Out' },
  { id: 'fx104', name: 'Sutter Buttes', county: 'Sutter', lat: 39.23, lon: -121.78, start_date: '2025-04-28', acres: 18100, containment: 88, structures: 2, status: 'Contained' },
  { id: 'fx105', name: 'Trinity Lakes', county: 'Trinity', lat: 40.90, lon: -123.00, start_date: '2025-05-10', acres: 98500, containment: 54, structures: 33, status: 'Active' },
  { id: 'fx106', name: 'Kings River', county: 'Tulare', lat: 36.55, lon: -118.90, start_date: '2025-07-12', acres: 28500, containment: 31, structures: 15, status: 'Active' },

  // Medium (1k–9,999)
  { id: 'fx201', name: 'Laguna', county: 'San Diego', lat: 32.87, lon: -116.45, start_date: '2024-11-09', acres: 6800, containment: 100, structures: 1, status: 'Out' },
  { id: 'fx202', name: 'Napa Ridge', county: 'Napa', lat: 38.50, lon: -122.40, start_date: '2024-04-21', acres: 3250, containment: 100, structures: 3, status: 'Out' },
  { id: 'fx203', name: 'Yosemite South', county: 'Mariposa', lat: 37.58, lon: -119.85, start_date: '2024-08-27', acres: 7600, containment: 93, structures: 0, status: 'Controlled' },
  { id: 'fx204', name: 'Nevada Ridge', county: 'Nevada', lat: 39.35, lon: -120.95, start_date: '2025-03-18', acres: 2800, containment: 100, structures: 0, status: 'Out' },
  { id: 'fx205', name: 'San Luis Peak', county: 'San Luis Obispo', lat: 35.31, lon: -120.70, start_date: '2025-05-30', acres: 5900, containment: 70, structures: 1, status: 'Contained' },
  { id: 'fx206', name: 'Santa Cruz Hills', county: 'Santa Cruz', lat: 37.05, lon: -122.02, start_date: '2025-06-18', acres: 4100, containment: 52, structures: 4, status: 'Active' },
  { id: 'fx207', name: 'Bishop Creek', county: 'Inyo', lat: 37.33, lon: -118.49, start_date: '2025-06-25', acres: 9200, containment: 44, structures: 0, status: 'Active' },
  { id: 'fx208', name: 'Grass Valley', county: 'Butte', lat: 39.73, lon: -121.62, start_date: '2025-07-01', acres: 2600, containment: 33, structures: 1, status: 'Active' },

  // Small (100–999)
  { id: 'fx301', name: 'Mission', county: 'San Diego', lat: 32.80, lon: -117.06, start_date: '2024-12-02', acres: 210, containment: 100, structures: 0, status: 'Out' },
  { id: 'fx302', name: 'Paso Flats', county: 'San Luis Obispo', lat: 35.62, lon: -120.69, start_date: '2025-01-14', acres: 680, containment: 100, structures: 0, status: 'Out' },
  { id: 'fx303', name: 'Tehachapi West', county: 'Kern', lat: 35.13, lon: -118.52, start_date: '2025-02-26', acres: 310, containment: 100, structures: 0, status: 'Out' },
  { id: 'fx304', name: 'Mt. Diablo', county: 'Contra Costa', lat: 37.87, lon: -121.94, start_date: '2025-03-12', acres: 420, containment: 98, structures: 0, status: 'Controlled' },
  { id: 'fx305', name: 'Lakeview', county: 'Riverside', lat: 33.79, lon: -117.06, start_date: '2025-04-05', acres: 890, containment: 91, structures: 0, status: 'Contained' },
  { id: 'fx306', name: 'Carmel Highlands', county: 'Monterey', lat: 36.52, lon: -121.90, start_date: '2025-06-22', acres: 610, containment: 46, structures: 0, status: 'Active' },
  { id: 'fx307', name: 'Redding East', county: 'Shasta', lat: 40.60, lon: -122.20, start_date: '2025-07-05', acres: 740, containment: 18, structures: 0, status: 'Active' },

  // Minor (<100)
  { id: 'fx401', name: 'Marina', county: 'Monterey', lat: 36.67, lon: -121.80, start_date: '2024-09-03', acres: 65, containment: 100, structures: 0, status: 'Out' },
  { id: 'fx402', name: 'Folsom Bluffs', county: 'Sacramento', lat: 38.67, lon: -121.12, start_date: '2025-03-03', acres: 35, containment: 100, structures: 0, status: 'Out' },
  { id: 'fx403', name: 'Goleta Creek', county: 'Santa Barbara', lat: 34.44, lon: -119.84, start_date: '2025-04-17', acres: 72, containment: 100, structures: 0, status: 'Out' },
  { id: 'fx404', name: 'Palm Springs Wash', county: 'Riverside', lat: 33.83, lon: -116.55, start_date: '2025-05-21', acres: 24, containment: 100, structures: 0, status: 'Out' },
  { id: 'fx405', name: 'Davis Fields', county: 'Yolo', lat: 38.55, lon: -121.74, start_date: '2025-06-10', acres: 58, containment: 90, structures: 0, status: 'Contained' },
  { id: 'fx406', name: 'Ukiah North', county: 'Mendocino', lat: 39.20, lon: -123.20, start_date: '2025-06-19', acres: 12, containment: 100, structures: 0, status: 'Out' },
  { id: 'fx407', name: 'Tahoe Meadows', county: 'El Dorado', lat: 38.90, lon: -120.05, start_date: '2025-07-07', acres: 95, containment: 55, structures: 0, status: 'Active' },
];

// ---------------------------------
// Super large generator
// ---------------------------------

type CountyInfo = {
  name: string;
  lat: number;  // approx centroid
  lon: number;  // approx centroid
  urban: number; // structures density factor
};

// Approximate county centroids and an "urban-ness" factor for structures
const CA_COUNTIES: CountyInfo[] = [
  { name: 'Los Angeles', lat: 34.3, lon: -118.2, urban: 1.8 },
  { name: 'San Diego', lat: 32.9, lon: -116.9, urban: 1.4 },
  { name: 'Orange', lat: 33.7, lon: -117.8, urban: 1.7 },
  { name: 'Riverside', lat: 33.8, lon: -116.5, urban: 1.1 },
  { name: 'San Bernardino', lat: 34.9, lon: -116.9, urban: 0.9 },
  { name: 'Ventura', lat: 34.4, lon: -119.0, urban: 1.2 },
  { name: 'Santa Barbara', lat: 34.6, lon: -120.0, urban: 1.0 },
  { name: 'Kern', lat: 35.4, lon: -118.7, urban: 0.8 },
  { name: 'Fresno', lat: 36.7, lon: -119.7, urban: 0.9 },
  { name: 'Tulare', lat: 36.2, lon: -118.8, urban: 0.7 },
  { name: 'Kings', lat: 36.0, lon: -119.8, urban: 0.7 },
  { name: 'Madera', lat: 37.2, lon: -119.7, urban: 0.7 },
  { name: 'Mariposa', lat: 37.6, lon: -119.9, urban: 0.5 },
  { name: 'Merced', lat: 37.3, lon: -120.7, urban: 0.8 },
  { name: 'Stanislaus', lat: 37.6, lon: -120.9, urban: 0.9 },
  { name: 'San Joaquin', lat: 37.9, lon: -121.2, urban: 1.0 },
  { name: 'Sacramento', lat: 38.5, lon: -121.3, urban: 1.3 },
  { name: 'Placer', lat: 39.0, lon: -121.2, urban: 0.9 },
  { name: 'El Dorado', lat: 38.8, lon: -120.5, urban: 0.7 },
  { name: 'Yolo', lat: 38.7, lon: -121.9, urban: 0.9 },
  { name: 'Solano', lat: 38.3, lon: -122.0, urban: 1.0 },
  { name: 'Napa', lat: 38.5, lon: -122.4, urban: 0.9 },
  { name: 'Sonoma', lat: 38.5, lon: -122.9, urban: 1.0 },
  { name: 'Marin', lat: 38.1, lon: -122.8, urban: 1.0 },
  { name: 'San Francisco', lat: 37.77, lon: -122.45, urban: 1.6 },
  { name: 'San Mateo', lat: 37.4, lon: -122.3, urban: 1.4 },
  { name: 'Santa Clara', lat: 37.2, lon: -121.7, urban: 1.5 },
  { name: 'Alameda', lat: 37.7, lon: -122.1, urban: 1.5 },
  { name: 'Contra Costa', lat: 37.9, lon: -122.0, urban: 1.2 },
  { name: 'Santa Cruz', lat: 37.0, lon: -122.0, urban: 1.0 },
  { name: 'Monterey', lat: 36.4, lon: -121.3, urban: 0.9 },
  { name: 'San Benito', lat: 36.6, lon: -121.0, urban: 0.7 },
  { name: 'San Luis Obispo', lat: 35.3, lon: -120.7, urban: 0.8 },
  { name: 'Mendocino', lat: 39.3, lon: -123.5, urban: 0.6 },
  { name: 'Lake', lat: 39.1, lon: -122.8, urban: 0.6 },
  { name: 'Humboldt', lat: 40.7, lon: -124.0, urban: 0.5 },
  { name: 'Trinity', lat: 40.6, lon: -123.1, urban: 0.4 },
  { name: 'Shasta', lat: 40.7, lon: -122.3, urban: 0.7 },
  { name: 'Tehama', lat: 40.1, lon: -122.2, urban: 0.6 },
  { name: 'Butte', lat: 39.6, lon: -121.6, urban: 0.8 },
  { name: 'Glenn', lat: 39.6, lon: -122.4, urban: 0.6 },
  { name: 'Colusa', lat: 39.2, lon: -122.1, urban: 0.6 },
  { name: 'Sutter', lat: 39.1, lon: -121.7, urban: 0.7 },
  { name: 'Yuba', lat: 39.3, lon: -121.3, urban: 0.7 },
  { name: 'Nevada', lat: 39.3, lon: -120.8, urban: 0.7 },
  { name: 'Plumas', lat: 40.0, lon: -120.8, urban: 0.4 },
  { name: 'Sierra', lat: 39.6, lon: -120.5, urban: 0.3 },
  { name: 'Lassen', lat: 40.7, lon: -120.7, urban: 0.3 },
  { name: 'Modoc', lat: 41.6, lon: -120.7, urban: 0.2 },
  { name: 'Siskiyou', lat: 41.6, lon: -122.5, urban: 0.3 },
  { name: 'Del Norte', lat: 41.7, lon: -124.0, urban: 0.3 },
  { name: 'Amador', lat: 38.4, lon: -120.7, urban: 0.7 },
  { name: 'Calaveras', lat: 38.2, lon: -120.5, urban: 0.6 },
  { name: 'Tuolumne', lat: 38.0, lon: -120.0, urban: 0.6 },
  { name: 'Mono', lat: 38.0, lon: -119.0, urban: 0.3 },
  { name: 'Inyo', lat: 36.6, lon: -118.0, urban: 0.3 },
  { name: 'Imperial', lat: 33.0, lon: -115.5, urban: 0.6 },
];

// Fire name parts for variety
const NAME_ADJ = [
  'Silver', 'Bear', 'Eagle', 'Sage', 'Windy', 'Copper', 'Red', 'Blue', 'Golden', 'Shadow',
  'Pine', 'Oak', 'Cedar', 'Maple', 'Sierra', 'Klamath', 'Trinity', 'Coastal', 'Desert', 'Canyon',
  'Highland', 'Valley', 'Summit', 'Butte', 'Diablo', 'Shasta', 'Tahoe', 'Yosemite', 'Kings', 'Sequoia',
];
const NAME_FEAT = [
  'Ridge', 'Peak', 'Canyon', 'Creek', 'Gulch', 'Fork', 'Flats', 'Hills', 'Bluffs', 'Meadow',
  'Lakes', 'Point', 'Brush', 'Springs', 'Basin', 'Knoll', 'Slope', 'Divide', 'Wash', 'Mesa',
];

// RNG (deterministic for reproducibility)
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return function rand() {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rand: () => number, mean = 0, std = 1) {
  // Box-Muller
  let u = 0, v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + z * std;
}

function choice<T>(rand: () => number, arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function weighted<T>(rand: () => number, items: T[], weights: number[]): T {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = rand() * total;
  for (let i = 0; i < items.length; i++) {
    if ((r -= weights[i]) <= 0) return items[i];
  }
  return items[items.length - 1];
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function toDateString(d: Date) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function randomDate(rand: () => number, start: Date, end: Date) {
  const t = start.getTime() + rand() * (end.getTime() - start.getTime());
  return new Date(t);
}

// Acres distributions (heavy-tailed)
type SizeClass = 'Minor' | 'Small' | 'Medium' | 'Large' | 'Mega';
const SIZE_CLASSES: SizeClass[] = ['Minor', 'Small', 'Medium', 'Large', 'Mega'];
const SIZE_WEIGHTS = [0.50, 0.30, 0.15, 0.04, 0.01]; // sums to 1

function sampleAcres(rand: () => number): number {
  const cls = weighted(rand, SIZE_CLASSES, SIZE_WEIGHTS);
  let min = 1, max = 50;
  switch (cls) {
    case 'Minor': min = 1; max = 99; break;
    case 'Small': min = 100; max = 999; break;
    case 'Medium': min = 1000; max = 9999; break;
    case 'Large': min = 10000; max = 99999; break;
    case 'Mega': min = 100000; max = 600000; break;
  }
  // Sample more densely near the lower bound within each band using an exponential-ish curve
  const r = rand();
  const t = 1 - Math.pow(1 - r, 2.2); // bias low-to-mid
  return Math.round(min + t * (max - min));
}

function sampleStatusAndContainment(rand: () => number, startDate: Date): { status: FireIncident['status'], containment: number } {
  // Slightly bias recent fires to be Active/Contained
  const now = new Date();
  const daysOld = clamp((+now - +startDate) / (1000 * 3600 * 24), 0, 2000);
  const recentBias = daysOld < 45 ? 1.25 : 1.0;

  const statuses: FireIncident['status'][] = ['Active', 'Contained', 'Controlled', 'Out'];
  const weights = [0.10 * recentBias, 0.22 * recentBias, 0.20, 0.48 / recentBias]; // normalize below
  const sum = weights.reduce((a, b) => a + b, 0);
  const norm = weights.map(w => w / sum);
  const status = weighted(rand, statuses, norm);

  let containment = 0;
  switch (status) {
    case 'Active': containment = clamp(Math.round(gaussian(rand, 35, 18)), 0, 75); break;
    case 'Contained': containment = clamp(Math.round(gaussian(rand, 80, 10)), 60, 95); break;
    case 'Controlled': containment = clamp(Math.round(gaussian(rand, 95, 5)), 85, 100); break;
    case 'Out': containment = 100; break;
  }
  return { status, containment };
}

function sampleStructures(rand: () => number, acres: number, urbanFactor: number): number {
  // Not linear with acres; use sublinear power + noise. Most fires damage few structures.
  const base = Math.pow(acres, 0.6) * 0.02 * urbanFactor; // tuned for plausible ranges
  const noisy = Math.max(0, gaussian(rand, base, Math.max(1, base * 0.35)));
  return Math.floor(clamp(noisy, 0, 2000));
}

function jitterCoord(rand: () => number, lat: number, lon: number): { lat: number, lon: number } {
  // Jitter up to ~0.6 deg lat/lon
  const jLat = lat + gaussian(rand, 0, 0.25);
  const jLon = lon + gaussian(rand, 0, 0.35);
  // Clamp to California-ish bounds
  const clampedLat = clamp(jLat, 32.4, 42.1);
  const clampedLon = clamp(jLon, -124.5, -114.1);
  return { lat: Number(clampedLat.toFixed(4)), lon: Number(clampedLon.toFixed(4)) };
}

function makeName(rand: () => number, existing: Set<string>, county: string): string {
  // Combine adjective + feature; ensure uniqueness by adding county/suffix if needed
  let attempt = 0;
  while (attempt < 5) {
    const name = `${choice(rand, NAME_ADJ)} ${choice(rand, NAME_FEAT)}`;
    if (!existing.has(name)) {
      existing.add(name);
      return name;
    }
    attempt++;
  }
  // Fallback with county tag or roman-like suffix
  const suffix = Math.floor(rand() * 999);
  const name = `${choice(rand, NAME_ADJ)} ${choice(rand, NAME_FEAT)} ${county.split(' ')[0]} ${suffix}`;
  existing.add(name);
  return name;
}

function padId(n: number): string {
  return n.toString().padStart(5, '0');
}

export type GenerateOptions = {
  // Number of synthetic incidents to generate
  count: number;
  // Seed for deterministic output; change for a different dataset
  seed?: number;
  // Date range for start_date
  startDate?: Date; // default: new Date('2022-01-01')
  endDate?: Date;   // default: new Date()
  // If true, include the SEED_FIRES at the front of the array
  includeSeed?: boolean;
};

export function generateFireIncidents(opts: GenerateOptions): FireIncident[] {
  const {
    count,
    seed = 42,
    startDate = new Date('2022-01-01T00:00:00Z'),
    endDate = new Date(),
    includeSeed = true,
  } = opts;

  const rand = mulberry32(seed);
  const out: FireIncident[] = includeSeed ? [...SEED_FIRES] : [];
  const nameSet = new Set<string>(SEED_FIRES.map(f => f.name));

  // If you want to bias counties, adjust these weights accordingly (same length as CA_COUNTIES)
  const countyWeights = CA_COUNTIES.map(c => {
    // Slightly upweight big-pop counties
    const boost = c.urban > 1.2 ? 1.3 : (c.urban > 1.0 ? 1.1 : 1.0);
    // Modest boost for southern/central where more incidents frequently occur
    const southBoost = c.lat < 36 ? 1.15 : 1.0;
    return boost * southBoost;
  });

  for (let i = 0; i < count; i++) {
    const county = weighted(rand, CA_COUNTIES, countyWeights);
    const when = randomDate(rand, startDate, endDate);
    const acres = sampleAcres(rand);

    const { status, containment } = sampleStatusAndContainment(rand, when);
    const { lat, lon } = jitterCoord(rand, county.lat, county.lon);
    const structures = sampleStructures(rand, acres, county.urban);

    const name = makeName(rand, nameSet, county.name);
    // Generate a unique id; offset after seed block
    const idNum = 10000 + i; // change offset as desired to avoid clashing with your fx001... ids
    const id = `fx${padId(idNum)}`;

    out.push({
      id,
      name,
      county: county.name,
      lat,
      lon,
      start_date: toDateString(when),
      acres,
      containment,
      structures,
      status,
    });
  }

  return out;
}

// ---------------------------------
// Usage examples
// ---------------------------------

// 1) Create a super-large dataset (e.g., +100,000 incidents), including your original seeds:
export const FIRES: FireIncident[] = generateFireIncidents({
  count: 1000,     // make it huge
  seed: 20250714,     // deterministic dataset; change to reshuffle
  startDate: new Date('2020-01-01T00:00:00Z'),
  endDate: new Date(), // through today
  includeSeed: true,
});

// 2) If you only want generated data without the seed list, set includeSeed: false
// export const FIRES: FireIncident[] = generateFireIncidents({ count: 200_000, includeSeed: false });

// 3) If you want fewer for local dev, change count accordingly
// export const FIRES: FireIncident[] = generateFireIncidents({ count: 10_000 });