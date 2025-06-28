from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String, nullable=True)
    last_name =  db.Column(db.String, nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'first_name': self.first_name,
                'last_name': self.last_name}
    

class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    body = db.Column(db.String)
    date = db.Column(db.Date, nullable=False)
    image_url = db.Column(db.String)


class Media(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    media_type = db.Column(db.Enum('image', 'video', 'audio', name='media_type'), nullable=False)
    url = db.Column(db.String)
