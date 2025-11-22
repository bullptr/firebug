import os
import sqlite3
from pathlib import Path

import json
import pandas as pd
from tqdm import tqdm


def main():
    db_path = os.getenv("DB_PATH", "./database/firebug.db")

    config = [
        {"path": "./data/historical_fires.geojson", "table_name": "historical"},
        {
            "path": "./data/random_10000_rows.csv",
            "table_name": "predicted",
            "columns": [
                {"Census2020_INTPTLAT20": "LAT"},
                {"Census2020_INTPTLON20": "LON"},
                {"FirePredicted_Prob": "PROBABILITY"},
            ],
        },
    ]

    seed_db(config, db_path)
    create_indexes(db_path)


def seed_db(config: list, db_path: str):
    for config in tqdm(config, desc="Seeding tables", unit="table"):
        path = config["path"]
        table_name = config["table_name"]
        if_exists = config.get("if_exists", "replace")
        columns = config.get("columns", None)

        if not Path(path).exists():
            tqdm.write(f"✗ Skipping {path} (file not found)")
            continue

        if path.endswith(".csv"):
            seed_csv_table(path, table_name, db_path, if_exists, columns)
        elif path.endswith(".geojson"):
            seed_geojson_table(path, table_name, db_path, if_exists, columns)

    print(f"\n✓ All files loaded into {db_path}")


def process_columns(df: pd.DataFrame, columns: list) -> pd.DataFrame:
    """
    Select and rename columns based on config.

    columns format: [{"old_name": "new_name"}, ...]
    """
    if columns is None:
        return df

    rename_map = {}
    cols_to_keep = []

    for col_mapping in columns:
        for old_name, new_name in col_mapping.items():
            if old_name not in df.columns:
                tqdm.write(f"⚠ Warning: Column '{old_name}' not found in data")
                continue
            rename_map[old_name] = new_name
            cols_to_keep.append(old_name)

    df = df[cols_to_keep].copy()
    df = df.rename(columns=rename_map)

    return df


def seed_csv_table(
    path: str,
    table_name: str,
    db_path: str,
    if_exists: str = "replace",
    columns: list = None,
):
    df = pd.read_csv(path)
    df = process_columns(df, columns)
    conn = sqlite3.connect(db_path)
    chunk_size = 1000

    with tqdm(
        total=len(df), desc=f"Loading {table_name}", unit="rows", leave=False
    ) as pbar:
        for i, chunk_start in enumerate(range(0, len(df), chunk_size)):
            chunk = df.iloc[chunk_start : chunk_start + chunk_size]
            chunk.to_sql(
                table_name,
                conn,
                if_exists=if_exists if i == 0 else "append",
                index=False,
            )
            pbar.update(len(chunk))

    conn.close()
    tqdm.write(
        f"✓ Loaded {path} into table '{table_name}' ({len(df)} rows, {len(df.columns)} columns)"
    )


def seed_geojson_table(
    path: str,
    table_name: str,
    db_path: str,
    if_exists: str = "replace",
    columns: list = None,
):
    with open(path, "r") as f:
        geojson_data = json.load(f)

    features = geojson_data.get("features", [])

    if not features:
        tqdm.write(f"✗ No features found in {path}")
        return

    records = []
    for feature in features:
        properties = feature.get("properties", {})
        geometry = feature.get("geometry", {})
        record = properties.copy()
        record["geometry"] = json.dumps(geometry)

        records.append(record)

    df = pd.DataFrame(records)
    df = process_columns(df, columns)
    conn = sqlite3.connect(db_path)
    chunk_size = 1000

    with tqdm(
        total=len(df), desc=f"Loading {table_name}", unit="rows", leave=False
    ) as pbar:
        for i, chunk_start in enumerate(range(0, len(df), chunk_size)):
            chunk = df.iloc[chunk_start : chunk_start + chunk_size]
            chunk.to_sql(
                table_name,
                conn,
                if_exists=if_exists if i == 0 else "append",
                index=False,
            )
            pbar.update(len(chunk))

    conn.close()
    tqdm.write(
        f"✓ Loaded {path} into table '{table_name}' ({len(df)} rows, {len(df.columns)} columns)"
    )


def create_indexes(db_path: str):
    """Spatial indexes for better query performance"""
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()

    # indexes on predicted table
    try:
        cur.execute("""
            CREATE INDEX IF NOT EXISTS idx_predicted_lat_lon 
            ON predicted(LAT, LON)
        """)
        cur.execute("""
            CREATE INDEX IF NOT EXISTS idx_predicted_probability 
            ON predicted(PROBABILITY)
        """)
    except sqlite3.OperationalError:
        pass

    # indexes on historical table
    try:
        cur.execute("""
            CREATE INDEX IF NOT EXISTS idx_historical_year 
            ON historical(YEAR_)
        """)
        cur.execute("""
            CREATE INDEX IF NOT EXISTS idx_historical_cause 
            ON historical(CAUSE)
        """)
        cur.execute("""
            CREATE INDEX IF NOT EXISTS idx_historical_agency 
            ON historical(AGENCY)
        """)
        cur.execute("""
            CREATE INDEX IF NOT EXISTS idx_historical_acres 
            ON historical(GIS_ACRES)
        """)
    except sqlite3.OperationalError:
        pass

    conn.commit()
    conn.close()


if __name__ == "__main__":
    main()
