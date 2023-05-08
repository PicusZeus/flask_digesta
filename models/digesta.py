from sqlalchemy import ForeignKey, UniqueConstraint
from db import db


class DigestaBookModel(db.Model):
    __tablename__ = "digesta_books"
    id = db.Column(db.Integer, primary_key=True)
    book_nr = db.Column(db.Integer, unique=True, nullable=False)
    book_latin_name = db.Column(db.String(256), unique=True, nullable=False)
    book_polish_name = db.Column(db.String(256), unique=True, nullable=False)
    tituli = db.relationship("DigestaTitulusModel", back_populates="book")
    # leges = db.relationship("DigestaLexModel", back_populates="book")


class DigestaTitulusModel(db.Model):
    __tablename__ = "digesta_tituli"
    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer, unique=False, nullable=False)
    title_lat = db.Column(db.String(256), nullable=False)
    title_pl = db.Column(db.String(256), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey("digesta_books.id"), unique=False, nullable=False)
    book = db.relationship("DigestaBookModel", back_populates="tituli",  order_by="DigestaBookModel.id")
    leges = db.relationship("DigestaLexModel", back_populates="titulus",  order_by="DigestaLexModel.lex_nr")
    __table_args__ = (UniqueConstraint('number', 'book_id'),)


class DigestaLexModel(db.Model):
    __tablename__ = "digesta_leges"
    id = db.Column(db.Integer, primary_key=True)
    address_lat = db.Column(db.Text, nullable=False)
    address_pl = db.Column(db.Text, nullable=False)
    lex_nr = db.Column(db.String, nullable=False)
    titulus_id = db.Column(db.Integer, db.ForeignKey("digesta_tituli.id"), unique=False, nullable=False)
    titulus = db.relationship("DigestaTitulusModel", back_populates="leges")
    author_id = db.Column(db.Integer, db.ForeignKey("authors.id"), unique=False, nullable=False)
    author = db.relationship("AuthorModel", back_populates="leges")
    opus_id = db.Column(db.Integer, db.ForeignKey("libri.id"), unique=False, nullable=False)
    opus = db.relationship("OpusLibriModel", back_populates="leges")
    paragraphi = db.relationship("DigestaParagraphusModel", back_populates='lex', order_by="DigestaParagraphusModel.key")
    __table_args__ = (UniqueConstraint('lex_nr', 'titulus_id'),)


class DigestaParagraphusModel(db.Model):
    __tablename__ = "digesta_paragraphi"
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(56), nullable=False)
    text_lat = db.Column(db.Text, nullable=False)
    text_pl = db.Column(db.Text, nullable=False)
    lex_id = db.Column(db.Integer, db.ForeignKey("digesta_leges.id"), unique=False, nullable=False)
    lex = db.relationship("DigestaLexModel", back_populates='paragraphi')
    comments = db.relationship("CommentModel", back_populates='paragraphus', lazy="dynamic")

    __table_args__ = (UniqueConstraint('key', 'lex_id'),)


