import os
import sqlite3
from typing import Optional


class FirebugDatabase:
    def __init__(self, db_path=os.getenv("DB_PATH", "./database/firebug.db")):
        self.db_path = db_path

    def get_predicted_filtered(
        self,
        min_lat: Optional[float] = None,
        max_lat: Optional[float] = None,
        min_lon: Optional[float] = None,
        max_lon: Optional[float] = None,
        min_probability: float = 0.2,
        zoom: Optional[int] = None,
    ):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()

        conditions = ["PROBABILITY >= ?"]
        params = [min_probability]

        if min_lat is not None and max_lat is not None:
            conditions.append("LAT BETWEEN ? AND ?")
            params.extend([min_lat, max_lat])

        if min_lon is not None and max_lon is not None:
            conditions.append("LON BETWEEN ? AND ?")
            params.extend([min_lon, max_lon])

        where_clause = " AND ".join(conditions)
        sample_rate = self._get_sample_rate(zoom)

        if sample_rate < 1.0:
            query = f"""
                SELECT * FROM predicted 
                WHERE {where_clause}
                AND (ABS(CAST((LAT * 1000000 + LON * 1000000) AS INTEGER)) % 100) < ?
                ORDER BY PROBABILITY DESC
                LIMIT 5000
            """
            params.append(int(sample_rate * 100))
        else:
            query = f"""
                SELECT * FROM predicted 
                WHERE {where_clause}
                ORDER BY PROBABILITY DESC
                LIMIT 10000
            """

        cur.execute(query, params)
        rows = cur.fetchall()
        data = [dict(row) for row in rows]
        conn.close()

        return data

    def _get_sample_rate(self, zoom: Optional[int]) -> float:
        # adaptive sampling based on zoom level
        # higher zoom = more detail = higher sample rate
        if zoom is None:
            return 1.0

        # zoom => sample rate
        zoom_rates = {
            4: 0.1,  # state level - show 10% of points
            5: 0.15,
            6: 0.25,  # default California view
            7: 0.4,
            8: 0.6,
            9: 0.8,
            10: 1.0,  # full detail from zoom 10+
        }

        return zoom_rates.get(zoom, 1.0 if zoom >= 10 else 0.1)

    def get_historical(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM historical")
        rows = cur.fetchall()
        data = [dict(row) for row in rows]
        conn.close()
        return data
