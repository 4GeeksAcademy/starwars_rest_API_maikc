from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from models import Base, User, People, Planets, Favorites
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

app = Flask(__name__)

# Configuración de la base de datos
engine = create_engine('sqlite:///starwars.db')
Session = sessionmaker(bind=engine)



# [GET] /people - Obtiene una lista de todas las personas en la base de datos
@app.route('/api/people', methods=['GET'])
def get_people():
    people = request.session.query(People).all()
    return jsonify([{
        'id': person.id,
        'name': person.name,
        'birth_year': person.birth_year,
        'gender': person.gender
    } for person in people])

# [GET] /people/<int:people_id> - Obtiene la información de una persona específica
@app.route('/api/people/<int:people_id>', methods=['GET'])
def get_person(people_id):
    person = request.session.query(People).get(people_id)
    if person:
        return jsonify({
            'id': person.id,
            'name': person.name,
            'birth_year': person.birth_year,
            'gender': person.gender
        })
    else:
        return jsonify({'error': 'Person not found'}), 404

# [GET] /planets - Obtiene una lista de todos los planetas en la base de datos
@app.route('/api/planets', methods=['GET'])
def get_planets():
    planets = request.session.query(Planets).all()
    return jsonify([{
        'id': planet.id,
        'name': planet.name,
        'climate': planet.climate,
        'diameter': planet.diameter
    } for planet in planets])

# [GET] /planets/<int:planet_id> - Obtiene la información de un planeta específico
@app.route('/api/planets/<int:planet_id>', methods=['GET'])
def get_planet(planet_id):
    planet = request.session.query(Planets).get(planet_id)
    if planet:
        return jsonify({
            'id': planet.id,
            'name': planet.name,
            'climate': planet.climate,
            'diameter': planet.diameter
        })
    else:
        return jsonify({'error': 'Planet not found'}), 404

# [GET] /users/favorites - Obtiene todos los favoritos que pertenecen al usuario actual (simulando user_id=1)
@app.route('/api/users/favorites', methods=['GET'])
def get_user_favorites(user_id):
    favorites = request.session.query(Favorites).filter_by(user_id=user_id).all()
    return jsonify([{
        'id': favorite.id,
        'people_id': favorite.people_id,
        'planets_id': favorite.planets_id,
        'starship_id': favorite.starship_id
    } for favorite in favorites])

# [POST] /favorite/planet/<int:planet_id> - Añade un nuevo planeta favorito al usuario actual
@app.route('/api/favorite/planet/<int:planet_id>', methods=['POST'])
def add_favorite_planet(planet_id,user_id):
    new_favorite = Favorites(user_id=user_id, planets_id=planet_id)
    request.session.add(new_favorite)
    request.session.commit()
    return jsonify({'message': 'Favorite planet added'}), 201

# [POST] /favorite/people/<int:people_id> - Añade una nueva persona favorita al usuario actual
@app.route('/api/favorite/people/<int:people_id>', methods=['POST'])
def add_favorite_person(people_id, user_id):
    new_favorite = Favorites(user_id=user_id, people_id=people_id)
    request.session.add(new_favorite)
    request.session.commit()
    return jsonify({'message': 'Favorite person added'}), 201

# [DELETE] /favorite/planet/<int:planet_id> - Elimina un planeta favorito del usuario actual
@app.route('/api/favorite/planet/<int:planet_id>', methods=['DELETE'])
def delete_favorite_planet(planet_id, user_id):
    favorite = request.session.query(Favorites).filter_by(user_id=user_id, planets_id=planet_id).first()
    if favorite:
        request.session.delete(favorite)
        request.session.commit()
        return jsonify({'message': 'Favorite planet deleted'}), 200
    else:
        return jsonify({'error': 'Favorite planet not found'}), 404

# [DELETE] /favorite/people/<int:people_id> - Elimina una persona favorita del usuario actual
@app.route('/api/favorite/people/<int:people_id>', methods=['DELETE'])
def delete_favorite_person(people_id,user_id):
    favorite = request.session.query(Favorites).filter_by(user_id=user_id, people_id=people_id).first()
    if favorite:
        request.session.delete(favorite)
        request.session.commit()
        return jsonify({'message': 'Favorite person deleted'}), 200
    else:
        return jsonify({'error': 'Favorite person not found'}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3245, debug=True)
