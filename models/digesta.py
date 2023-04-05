from sqlalchemy import ForeignKey
from db import db


class DigestaModel(db.Model):
    __tablename__ = "digesta"

    id = db.Column(db.Integer, primary_key=True)
    # the introductory constitutions under "Constitutions"
    book = db.Column(db.String(124), unique=False, nullable=False)
    section = db.Column(db.String(124), unique=False, nullable=False)
    paragraph = db.Column(db.String(62), unique=False, nullable=False)
    # gr or lat
    language = db.Column(db.String(10), unique=False, nullable=False)
    text = db.Column(db.Text, unique=False, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey("authors.id"), unique=False, nullable=False)
    author = db.relationship("AuthorModel", back_populates="digesta")
