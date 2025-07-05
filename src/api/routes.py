"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Followers
import requests


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {"message": "Hello! I'm a message that came from the backend"}
    return response_body, 200


@api.route('/users', methods=['GET', 'POST'])
def users():
    response_body = {}
    if request.method == 'GET':
        response_body['message'] = 'Respuesta del GET'
        # ejecuando ( SELECT * FROM users )  -- scalars devuelve un iterable (similar a una lista)
        rows = db.session.execute(db.select(Users).where(Users.is_active)).scalars()
        # result = [row.serialize() for row in rows]
        response_body['results'] = [row.serialize() for row in rows]  # list comprehension
        return response_body, 200
    if request.method == 'POST': 
        data = request.json
        print(data)
        user = Users()
        user.email = data.get('email', 'user@email.com').to_lower()
        user.password = data.get('password', '1')
        user.is_active = True
        user.is_admin = data.get('is_admin', False)
        user.first_name = data.get('first_name', None)
        user.last_name = data.get('last_name', None)
        db.session.add(user)
        db.session.commit()
        response_body['results'] = user.serialize()
        response_body['message'] = 'Respuesta del Post de Users'
        return response_body, 201


@api.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def user(id):
    response_body = {}
    user = db.session.execute(db.select(Users).where(Users.id == id)).scalar()
    if not user:
        response_body['message'] = f'Usuario {id} no encontrado'
        response_body['results'] = None
        return response_body, 403         
    if request.method == 'GET':
        response_body['message'] = f'Usuario {id} encontrado'
        response_body['results'] = user.serialize()
        print(user)
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        user.email = data.get('email', user.email)
        user.password = data.get('password', user.password)
        # user.is_active = True
        user.is_admin = data.get('is_admin', user.is_admin)
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        db.session.commit()
        response_body['message'] = f'Usuario {id} modificado'
        response_body['results'] = user.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        user.is_active = False
        db.session.commit()
        response_body['message'] = f'Usuario {id} eliminado'
        response_body['results'] = None
        return response_body, 200


@api.route('/followers', methods=['GET', 'POST'])
def follower():
    # Voy a recibir el token del usuario del que sigue (follower)
    follower_id = 9
    response_body = {}
    if request.method == 'GET':
        followers = db.session.execute(db.select(Followers).where(Followers.follower_id == follower_id)).scalars()
        response_body['results'] = [row.serialize() for row in followers]
        response_body['message'] = f'Listado de followes del usurio {follower_id}'
        for row in followers:
            print(row)
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        following_id = data.get('following_id', None)
        following = db.session.execute(db.select(Followers).
                                    where((Followers.follower_id == follower_id) & (Followers.following_id == following_id))).scalar()
        if following:
            response_body['message'] = f'El usuario {follower_id} ya es seguidor del usuario {following_id}'
            response_body['results'] = None
            return response_body, 403
        follow = Followers()
        follow.follower_id = follower_id
        follow.following_id = following_id
        db.session.add(follow)
        db.session.commit()
        response_body['message'] = f'El usuario {follower_id} ahora segue al usuario {following_id}'
        response_body['results'] = follow.serialize()
        return response_body, 200


@api.route('/cohorts/<int:cohort_id>/students', methods=['GET', 'POST'])
def cohorts_students(cohort_id):
    response_body = {}
    response_body['message'] = f'Todos los estudiantes de la cohorte {cohort_id}'
    return response_body, 200

# students/<int:id>/subject
# authors/<int:id>/books
# directors/<int:id>/movies
# brands/<int:id>/models
# category/<int:id>/products
# posts/<int:id>/comments
# users//<int:id>/posts

@api.route('/job-users')
def job_users():
    response_body = {}
    # Deseo consumir la api JSONPlaceHoOlder : users
    url = 'https://jsonplaceholder.typicode.com/users'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        for row in data:
            print(row['name'], row['email'])
            user = Users(first_name=row['name'],
                         last_name=row['username'],
                         email=row['email'].lower(),
                         password='1234',
                         is_active=True,
                         is_admin=False)
            db.session.add(user)
        db.session.commit()
        response_body['message'] = 'Todo ok con JSPH'
        response_body['results'] = data
        return response_body, 200
    return response_body, 400
