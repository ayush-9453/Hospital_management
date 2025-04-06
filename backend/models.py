from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    date = db.Column(db.String(50))
    reason = db.Column(db.String(200))

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'date': self.date,
            'reason': self.reason
        }
    
class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    age = db.Column(db.String(10))
    gender = db.Column(db.String(10))
    phone = db.Column(db.String(15))
    email = db.Column(db.String(100))
    address = db.Column(db.String(200))
    diseases = db.Column(db.String(300))
    image = db.Column(db.Text) 

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "age": self.age,
            "gender": self.gender,
            "phone": self.phone,
            "email": self.email,
            "address": self.address,
            "diseases": self.diseases,
            "image": self.image
        }
    
class Billing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    amount = db.Column(db.Float)
    date = db.Column(db.String(20))
    image = db.Column(db.Text)  # Stores base64 image string

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'amount': self.amount,
            'date': self.date,
            'image': self.image
        }
class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    specialization = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    availability = db.Column(db.String(10))  # "Available" or "Busy"

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'specialization': self.specialization,
            'phone': self.phone,
            'email': self.email,
            'availability': self.availability
        }