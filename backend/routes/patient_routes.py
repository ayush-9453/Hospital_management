from flask import Blueprint, request, jsonify
from models import db, Patient

patient_bp = Blueprint('patients', __name__)

@patient_bp.route('/patients', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    return jsonify([p.serialize() for p in patients])

@patient_bp.route('/patients', methods=['POST'])
def add_patient():
    data = request.json
    new_patient = Patient(
        name=data.get('name'),
        age=data.get('age'),
        gender=data.get('gender'),
        phone=data.get('phone'),
        email=data.get('email'),
        address=data.get('address'),
        diseases=data.get('diseases'),
        image=data.get('image')
    )
    db.session.add(new_patient)
    db.session.commit()
    return jsonify(new_patient.serialize()), 201

@patient_bp.route('/patients/<int:id>', methods=['DELETE'])
def delete_patient(id):
    patient = Patient.query.get_or_404(id)
    db.session.delete(patient)
    db.session.commit()
    return jsonify({'message': 'Patient deleted successfully'}), 200