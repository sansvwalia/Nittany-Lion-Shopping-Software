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