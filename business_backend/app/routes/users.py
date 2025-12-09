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

@users_bp.route("/role/<email>", methods=["GET"])
def get_user_role(email):
    db = get_db()
    cursor = db.cursor()

    try:
        # Check Help_Desk first
        cursor.execute("SELECT * FROM Help_Desk WHERE HelpDeskEmail = ?", (email,))
        if cursor.fetchone():
            return jsonify({"role": "helpdesk"})

        # Check Seller
        cursor.execute("SELECT * FROM Seller WHERE UserEmail = ?", (email,))
        if cursor.fetchone():
            return jsonify({"role": "seller"})

        # Check Buyer
        cursor.execute("SELECT * FROM Buyer WHERE BuyerEmail = ?", (email,))
        if cursor.fetchone():
            return jsonify({"role": "buyer"})

        # Default if not found
        return jsonify({"role": "unknown"})

    except Exception as e:
        print("Error fetching role:", e)
        return jsonify({"role": "error"}), 500

@users_bp.route("/upgradeToSeller", methods=["POST"])
def upgrade_to_seller():
    data = request.get_json()
    email = data.get("email")
    business_name = data.get("businessName")
    customer_service_number = data.get("customerServiceNumber")

    if not email or not business_name or not customer_service_number:
        return jsonify({"success": False, "error": "Missing required fields"}), 400

    try:
        db = get_db()
        cursor = db.cursor()

        # check if business exists and matches phone
        cursor.execute(
            "SELECT BusinessID FROM Business WHERE BusinessName = ? AND Phone = ?",
            (business_name, customer_service_number),
        )
        business = cursor.fetchone()

        if not business:
            return jsonify({
                "success": False,
                "error": "Business name and number do not match any registered business."
            }), 400

        business_id = business["BusinessID"]

        # insert seller if not already exists
        cursor.execute("SELECT * FROM Seller WHERE UserEmail = ?", (email,))
        if cursor.fetchone():
            return jsonify({"success": False, "error": "User is already a seller."}), 400

        cursor.execute(
            "INSERT INTO Seller (BusinessID, UserEmail) VALUES (?, ?)",
            (business_id, email),
        )
        db.commit()

        return jsonify({"success": True}), 200

    except Exception as e:
        print("Upgrade to seller error:", e)
        return jsonify({"success": False, "error": "Server error."}), 500
