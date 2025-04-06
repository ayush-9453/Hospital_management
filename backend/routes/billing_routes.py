from flask import Blueprint, request, jsonify
from models import db, Billing

billing_bp = Blueprint('billing', __name__)

@billing_bp.route("/api/billings", methods=["POST"])
def create_billing():
    data = request.json
    billing = Billing(
        name=data.get("name"),
        amount=data.get("amount"),
        date=data.get("date"),
        image=data.get("image")
    )
    db.session.add(billing)
    db.session.commit()
    return jsonify(billing.serialize()), 201

@billing_bp.route("/api/billings", methods=["GET"])
def get_billings():
    name = request.args.get("name")
    date = request.args.get("date")

    query = Billing.query
    if name:
        query = query.filter(Billing.name.contains(name))
    if date:
        query = query.filter(Billing.date.contains(date))

    billings = query.all()
    return jsonify([b.serialize() for b in billings])

@billing_bp.route("/api/billings/<int:id>", methods=["DELETE"])
def delete_billing(id):
    billing = Billing.query.get_or_404(id)
    db.session.delete(billing)
    db.session.commit()
    return jsonify({"message": "Billing entry deleted"}), 200
