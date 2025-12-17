"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Products
from api.utils import generate_sitemap, APIException
from flask_cors import CORS


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {"message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"}
    return response_body, 200


@api.route('/products', methods=['GET', 'POST'])
def products():
    response_body = {}
    if request.method == 'GET':
        # Obtener todos los registos de la tabla Products
        rows = db.session.execute(db.select(Products)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Listado de Productos'
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Products(name=data.get('name', None), 
                       description=data.get('description', 'Sin descripción'), 
                       price=data.get('price', None))
        db.session.add(row)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = 'Respondiendo desde el POST'
        return response_body, 201
    return response_body, 404


@api.route('/products/<int:product_id>', methods=['GET', 'PUT', 'DELETE'])
def product(product_id):
    response_body = {}
    row = db.session.execute(db.select(Products).where(Products.id==product_id)).scalar()
    print('valor de row:', row)
    if not row:
        response_body['message'] = 'Producto no encontrado'
        return response_body, 404
    if request.method == 'GET':
        response_body['results'] = row.serialize()
        response_body['message'] = f'Detalles del producto {product_id}'
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.name = data.get('name', row.name)
        row.decription = data.get('description', row.name)
        row.price = data.get('price', row.price)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = f'Detalles del producto {product_id} modificado'
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Producto {product_id} eliminado'
        return response_body, 200
