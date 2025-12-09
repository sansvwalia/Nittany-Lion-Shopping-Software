import sqlite3
from flask import g, current_app

def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(
            current_app.config["DATABASE"],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row  # Makes rows act like dicts
    return g.db

def close_db(e=None):
    db = g.pop("db", None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()
    with current_app.open_resource("schema.sql") as f:
        db.executescript(f.read().decode("utf8"))


# THIS WILL RETURN A ROW OF A TABLE GIVEN THE TABLE NAME + PRIMARY KEY NAME + VALUE
def get_row(table, pk_name, pk_value):
    conn = get_db()
    cur = conn.cursor()
    query = f"SELECT * FROM {table} WHERE {pk_name} = ?"
    cur.execute(query, (pk_value,))
    row = cur.fetchone()
    conn.close()
    return dict(row) if row else None


def update_row(table, pk_name, pk_value, data):
    conn = get_db()
    cur = conn.cursor()

    # Build SET col1=?, col2=?, ...
    columns = ", ".join([f"{key}=?" for key in data.keys()])
    values = list(data.values()) + [pk_value]

    query = f"UPDATE {table} SET {columns} WHERE {pk_name} = ?"
    cur.execute(query, values)

    conn.commit()
    conn.close()

    return cur.rowcount > 0

def insert_row(table, data):
    try:
        conn = sqlite3.connect("your_database.db")
        cursor = conn.cursor()

        columns = ", ".join(data.keys())
        placeholders = ", ".join(["?"] * len(data))
        values = tuple(data.values())

        sql = f"INSERT INTO {table} ({columns}) VALUES ({placeholders})"
        cursor.execute(sql, values)

        conn.commit()
        inserted_id = cursor.lastrowid
        conn.close()

        return inserted_id

    except Exception as e:
        print("Insert error:", e)
        return None
    
def delete_row(table, pk_name, pk_value):
    try:
        conn = get_db()
        cursor = conn.cursor()

        # Validate that the column exists
        cursor.execute(f"PRAGMA table_info({table})")
        columns = [col[1] for col in cursor.fetchall()]
        if pk_name not in columns:
            return False

        cursor.execute(
            f"DELETE FROM {table} WHERE {pk_name} = ?",
            (pk_value,)
        )
        conn.commit()

        return cursor.rowcount > 0  # True only if a row was deleted

    except Exception as e:
        print("Delete error:", e)
        return False
    
def get_table_columns(table):
    """
    Returns a list of dicts describing each column in a table.
    Each dict: { "name": str, "type": str, "pk": int }
    """
    conn = get_db()
    cur = conn.cursor()

    try:
        cur.execute(f"PRAGMA table_info({table})")
        rows = cur.fetchall()

        if not rows:
            return None  # table not found

        columns = []
        for col in rows:
            columns.append({
                "name": col["name"],       # column name
                "type": col["type"],       # SQLite data type
                "pk": col["pk"]            # 1 if primary key
            })

        return columns

    except Exception as e:
        print("Error fetching table columns:", e)
        return None

    finally:
        conn.close()

def get_tables():
    db = get_db()
    rows = db.execute("""
        SELECT name 
        FROM sqlite_master 
        WHERE type='table' AND name NOT LIKE 'sqlite_%'
        ORDER BY name;
    """).fetchall()

    return [row["name"] for row in rows]