from sqlalchemy import ForeignKey
from db import db


class DigestaBookModel(db.Model):
    __tablename__ = "digesta_books"
    id = db.Column(db.Integer, primary_key=True)
    book_latin_name = db.Column(db.String(256), unique=True, nullable=False)
    book_polish_name = db.Column(db.String(256), unique=True, nullable=False)
    sections = db.relationship("DigestaSectionModel", back_populates="book", lazy="dynamic")


class DigestaSectionModel(db.Model):
    __tablename__ = "digesta_sections"
    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer, unique=False, nullable=False)
    title_lat = db.Column(db.String(256), nullable=False)
    title_pl = db.Column(db.String(256), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey("digesta_books.id"), unique=False, nullable=False)
    book = db.relationship("DigestaBookModel", back_populates="sections")

    paragraphs = db.relationship("DigestaParagraphModel", back_populates="section", lazy="dynamic")


class DigestaParagraphModel(db.Model):
    __tablename__ = "digesta_paragraphs"

    id = db.Column(db.Integer, primary_key=True)
    text_lat = db.Column(db.Text, nullable=False)
    text_pl = db.Column(db.Text, nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey("digesta_sections.id"), unique=False, nullable=False)
    section = db.relationship("DigestaSectionModel", back_populates="paragraphs")
    author_id = db.Column(db.Integer, db.ForeignKey("authors.id"), unique=False, nullable=False)
    author = db.relationship("AuthorModel", back_populates="paragraphs")
    opus_id = db.Column(db.Integer, db.ForeignKey("opera.id"), unique=False, nullable=False)
    opus = db.relationship("OperaModel", back_populates="paragraphs")

