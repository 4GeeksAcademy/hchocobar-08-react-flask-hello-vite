from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), nullable=False)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)

    def __repr__(self):
        return f'<User: {self.id} - {self.email}>'

    # do not serialize the password, its a security breach
    def serialize(self):
        return {"id": self.id,
                "email": self.email,
                'is_active': self.is_active,
                'is_admin': self.is_admin,
                'first_name': self.first_name,
                'last_name': self.last_name}
    

class Bills(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    create_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    total_amount = db.Column(db.Float, nullable=False)
    bill_status = db.Column(db.Enum('pending', 
                                    'paid', 
                                    'cancel', name='bill_status'), nullable=False)
    payment_method = db.Column(db.Enum('credit_card', 'cash', 'debit', name='payment_method'))

    def __repr__(self):
        return f'<Bill: {self.id}>'

    # do not serialize the password, its a security breach
    def serialize(self):
        return {"id": self.id,
                "create_at": self.create_at,
                'total_amount': self.total_amount,
                'bill_status': self.bill_status,
                'payment_method': self.payment_method}
    