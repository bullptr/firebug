export interface FireIncident {
  OBJECTID: number;
  YEAR_: number;
  STATE: string;
  AGENCY: string;
  UNIT_ID: string;
  FIRE_NAME: string;
  INC_NUM: string;
  ALARM_DATE: string;
  CONT_DATE: string;
  CAUSE: number;
  C_METHOD: number;
  OBJECTIVE: number;
  GIS_ACRES: number;
  COMMENTS: string | null;
  COMPLEX_NAME: string | null;
  IRWINID: string;
  FIRE_NUM: string | null;
  COMPLEX_ID: string | null;
  DECADES: string;
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
}

export interface PredictedFire {
  LAT: number;
  LON: number;
  PROBABILITY: number;
}

export interface ViewportBounds {
  minLat: number;
  maxLat: number;
  minLon: number;
  maxLon: number;
  zoom: number;
}

export type FilterKey =
  | 'Minor (<100 ac)'
  | 'Small (100-999 ac)'
  | 'Medium (1k-9,999 ac)'
  | 'Large (10k-99k ac)'
  | 'Mega (100k+ ac)';
