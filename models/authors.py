from db import db
from sqlalchemy import UniqueConstraint


class AuthorModel(db.Model):
    __tablename__ = "authors"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String)
    flourished_start = db.Column(db.Integer)
    flourished_end = db.Column(db.Integer)
    leges = db.relationship("DigestaLexModel", back_populates="author", lazy="dynamic")
    opera = db.relationship("OpusModel", back_populates="author", lazy="dynamic")
    authorship = db.Column(db.Float(4))
    books_authorship = db.relationship("BookAuthorshipModel", passive_deletes=True, back_populates="author")
    tituli_authorship = db.relationship("TitulusAuthorshipModel", passive_deletes=True, back_populates="author")


class BookAuthorshipModel(db.Model):
    __tablename__ = "authorships"
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey("authors.id", ondelete="CASCADE"))
    author = db.relationship("AuthorModel", back_populates="books_authorship")

    book_id = db.Column(db.Integer, db.ForeignKey("digesta_books.id", ondelete="CASCADE"))
    book = db.relationship("DigestaBookModel", back_populates="jurists_authorship")

    authorship = db.Column(db.Float(4))
    __table_args__ = (UniqueConstraint('author_id', 'book_id'),)


class TitulusAuthorshipModel(db.Model):
    __tablename__ = "titulus_authorships"

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey("authors.id", ondelete="CASCADE"))
    author = db.relationship("AuthorModel", back_populates="tituli_authorship")

    titulus_id = db.Column(db.Integer, db.ForeignKey("digesta_tituli.id", ondelete="CASCADE"))
    titulus = db.relationship("DigestaTitulusModel", back_populates="jurists_authorship")

    authorship = db.Column(db.Float(4))
    __table_args__ = (UniqueConstraint('author_id', 'titulus_id'),)
