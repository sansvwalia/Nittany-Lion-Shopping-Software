from flask import Blueprint, jsonify, request
from app.db import get_row, update_row

generic_bp = Blueprint("generic", __name__, url_prefix="/")

 # GET one row by primary key
@generic_bp.get("/<table>/<pk>/")
def get_record(table, pk):
    pk_name = request.args.get("pk_name", "id")

    row = get_row(table, pk_name, pk)
    if not row:
        return jsonify({"error": "Row not found"}), 404

    return jsonify(row)


# UPDATE row by primary key
@generic_bp.put("/<table>/<pk>")
def update_record(table, pk):
    pk_name = request.args.get("pk_name", "id")
    updated_data = request.json

    success = update_row(table, pk_name, pk, updated_data)

    if not success:
        return jsonify({"error": "Update failed"}), 400

    return jsonify({"success": True, "updated": updated_data})
