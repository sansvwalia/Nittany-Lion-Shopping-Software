from flask import Flask, request, jsonify
import sqlite3
import bcrypt

app = Flask(__name__)

def get_db():
    conn = sqlite3.connect("CSVDataset/NLionBusiness.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.post("/login")
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    conn = get_db()
    cur = conn.cursor()
    user = cur.execute(
        "SELECT Email, Password FROM Registered_User WHERE Email=?",
        (email,),
    ).fetchone()
    conn.close()

    if not user:
        return jsonify({"success": False, "message": "User not found"})

    stored_hash = user["Password"]
    if bcrypt.checkpw(password.encode(), stored_hash.encode()):
        # You can also include role logic here once the tables are linked
        return jsonify({"success": True, "role": "Buyer"})
    return jsonify({"success": False, "message": "Invalid password"})

if __name__ == "__main__":
    app.run(debug=True)
