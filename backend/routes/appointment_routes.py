from flask import Blueprint, request, jsonify
from models import db, Appointment

appointment_bp = Blueprint('appointment', __name__)

@appointment_bp.route('/appointments', methods=['GET'])
def get_appointments():
    appointments = Appointment.query.all()
    return jsonify([a.serialize() for a in appointments])

@appointment_bp.route('/appointments', methods=['POST'])
def create_appointment():
    data = request.json
    new_appt = Appointment(
        name=data['name'],
        date=data['date'],
        reason=data['reason']
    )
    db.session.add(new_appt)
    db.session.commit()
    return jsonify(new_appt.serialize())

@appointment_bp.route('/appointments/<int:id>', methods=['PUT'])
def update_appointment(id):
    appt = Appointment.query.get_or_404(id)
    data = request.json
    appt.name = data.get('name', appt.name)
    appt.date = data.get('date', appt.date)
    appt.reason = data.get('reason', appt.reason)
    db.session.commit()
    return jsonify(appt.serialize())

@appointment_bp.route('/appointments/<int:id>', methods=['DELETE'])
def delete_appointment(id):
    appt = Appointment.query.get_or_404(id)
    db.session.delete(appt)
    db.session.commit()
    return jsonify({'message': 'Appointment deleted'})
