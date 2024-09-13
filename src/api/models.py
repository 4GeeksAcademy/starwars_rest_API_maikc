import os
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine
from eralchemy2 import render_er

Base = declarative_base()

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    username = Column(String(250), nullable=False, unique=True)
    firstname = Column(String(250), nullable=False)
    lastname = Column(String(250), nullable=False)
    email = Column(String(250), nullable=False, unique=True)
    favorites = relationship('Favorites', back_populates='user')

class Favorites(Base):
    __tablename__ = 'favorites'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    people_id = Column(Integer, ForeignKey('people.id'), nullable=True)
    planets_id = Column(Integer, ForeignKey('planets.id'), nullable=True)
    starship_id = Column(Integer, ForeignKey('starships.id'), nullable=True)
    user = relationship('User', back_populates='favorites')
    people = relationship('People', back_populates='favorites')
    planets = relationship('Planets', back_populates='favorites')
    starship = relationship('Starship', back_populates='favorites')

class People(Base):
    __tablename__ = 'people'
    id = Column(Integer, primary_key=True)
    birth_year = Column(String(250))
    name = Column(String(250))
    gender = Column(String(250), nullable=False)
    favorites = relationship('Favorites', back_populates='people')

class Planets(Base):
    __tablename__ = 'planets'
    id = Column(Integer, primary_key=True)
    climate = Column(String(250))
    diameter = Column(String(250))
    name = Column(String(250), nullable=False)
    favorites = relationship('Favorites', back_populates='planets')

class Starship(Base):
    __tablename__ = 'starships'
    id = Column(Integer, primary_key=True)
    mglt = Column(String(250))
    consumables = Column(String(250))
    created = Column(String(250), nullable=False)
    favorites = relationship('Favorites', back_populates='starship')

# Create an engine that stores data in the local directory's database file.
engine = create_engine('sqlite:///starwars.db')

# Create all tables in the engine.
Base.metadata.create_all(engine)

# Generate the ER diagram
render_er(Base, 'diagram.png')
