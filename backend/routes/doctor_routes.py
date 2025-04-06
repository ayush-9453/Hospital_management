from flask import Blueprint, request, jsonify
from models import db, Doctor

doctor_bp = Blueprint('doctor_bp', __name__)

@doctor_bp.route('/doctors', methods=['GET'])
def get_doctors():
    doctors = Doctor.query.all()
    return jsonify([d.serialize() for d in doctors])

@doctor_bp.route('/doctors', methods=['POST'])
def add_doctor():
    data = request.json
    new_doc = Doctor(
        name=data['name'],
        specialization=data['specialization'],
        phone=data.get('phone'),
        email=data.get('email'),
        availability=data.get('availability', 'Available')
    )
    db.session.add(new_doc)
    db.session.commit()
    return jsonify(new_doc.serialize())

@doctor_bp.route('/doctors/<int:id>', methods=['PUT'])
def update_doctor(id):
    doc = Doctor.query.get_or_404(id)
    data = request.json
    doc.name = data.get('name', doc.name)
    doc.specialization = data.get('specialization', doc.specialization)
    doc.phone = data.get('phone', doc.phone)
    doc.email = data.get('email', doc.email)
    doc.availability = data.get('availability', doc.availability)
    db.session.commit()
    return jsonify(doc.serialize())

@doctor_bp.route('/doctors/<int:id>', methods=['DELETE'])
def delete_doctor(id):
    doc = Doctor.query.get_or_404(id)
    db.session.delete(doc)
    db.session.commit()
    return jsonify({'message': 'Doctor deleted'})
