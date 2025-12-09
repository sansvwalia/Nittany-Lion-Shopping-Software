from flask import Blueprint, jsonify
from app.db import get_db

users_bp = Blueprint("user", __name__)

@users_bp.get("/")
def list_users():
    db = get_db()
    users = db.execute("SELECT * FROM Registered_User").fetchall()
    return jsonify([dict(u) for u in users])

from flask import Blueprint, request, jsonify
from app.db import get_db

users_bp = Blueprint("users_bp", __name__)

@users_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Missing fields"}), 400

    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            "SELECT * FROM Registered_User WHERE Email = ? AND Password = ?",
            (email, password),
        )
        user = cursor.fetchone()

        if not user:
            return jsonify({"success": False, "message": "Invalid credentials"}), 401

        cursor.execute("SELECT * FROM Help_Desk WHERE HelpDeskEmail = ?", (email,))
        if cursor.fetchone():
            role = "helpdesk"
        else:
            cursor.execute("SELECT * FROM Seller WHERE UserEmail = ?", (email,))
            seller = cursor.fetchone()
            if seller:
                role = "seller"
            else:
                cursor.execute("SELECT * FROM Buyer WHERE BuyerEmail = ?", (email,))
                if cursor.fetchone():
                    role = "buyer"
                else:
                    role = "unknown"

        return jsonify({"success": True, "role": role}), 200

    except Exception as e:
        print("Login error:", e)
        return jsonify({"success": False, "message": "Server error"}), 500
