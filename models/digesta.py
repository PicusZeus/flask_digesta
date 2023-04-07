from sqlalchemy import ForeignKey
from db import db


class DigestaBookModel(db.Model):
    __tablename__ = "digesta_books"
    id = db.Column(db.Integer, primary_key=True)
    book_latin_name = db.Column(db.String(256), unique=True, nullable=False)
    book_polish_name = db.Column(db.String(256), unique=True, nullable=False)
    tituli = db.relationship("DigestaTitulusModel", back_populates="book", lazy="dynamic")


class DigestaTitulusModel(db.Model):
    __tablename__ = "digesta_tituli"
    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer, unique=False, nullable=False)
    title_lat = db.Column(db.String(256), nullable=False)
    title_pl = db.Column(db.String(256), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey("digesta_books.id"), unique=False, nullable=False)
    book = db.relationship("DigestaBookModel", back_populates="tituli")
    leges = db.relationship("DigestaLexModel", back_populates="titlus", lazy="dynamic")


class DigestaLexModel(db.Model):
    __tablename__ = "digesta_leges"

    id = db.Column(db.Integer, primary_key=True)
    address_lat = db.Column(db.Text, nullable=False)
    address_pl = db.Column(db.Text, nullable=False)
    text_lat = db.Column(db.Text, nullable=False)
    text_pl = db.Column(db.Text, nullable=False)
    lex_nr = db.Column(db.Ingeger, nullable=False)
    titulus_id = db.Column(db.Integer, db.ForeignKey("digesta_tituli.id"), unique=False, nullable=False)
    titulus = db.relationship("DigestaTitulusModel", back_populates="leges")
    author_id = db.Column(db.Integer, db.ForeignKey("authors.id"), unique=False, nullable=False)
    author = db.relationship("AuthorModel", back_populates="leges")
    opus_id = db.Column(db.Integer, db.ForeignKey("opera.id"), unique=False, nullable=False)
    opus = db.relationship("OperaModel", back_populates="leges")

