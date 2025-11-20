import pandas as pd
import sqlite3


def main():
    csv_path = "./data/random_10000_rows.dev.csv"
    df = pd.read_csv(csv_path)
    db_path = "./database/firebug.db"
    conn = sqlite3.connect(db_path)

    df.to_sql("predicted", conn, if_exists="replace", index=False)
    conn.close()

    print(f"Data loaded into {db_path} in table 'predicted'.")


if __name__ == "__main__":
    main()
