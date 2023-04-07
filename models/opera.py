from db import db
from sqlalchemy import UniqueConstraint

class OperaModel(db.Model):
    # works of jurists that were used in Digesta
    __tablename__ = "opera"
    id = db.Column(db.Integer, primary_key=True)
    title_lat = db.Column(db.String(256), nullable=False)
    title_pl = db.Column(db.String(256), nullable=False)

    # most of the excerpted works consisted of many books and for the most part the number of book is given
    # if not given, or the work is singlebook, expected value is zero
    book = db.Column(db.Integer, nullable=False)
    leges = db.relationship("DigestaLexModel", back_populates="opus")
    author_id = db.Column(db.Integer, db.ForeignKey("authors.id"), unique=False, nullable=False)
    author = db.relationship("AuthorModel", back_populates="opera")
    __table_args__ = (UniqueConstraint('title_lat', 'author_id', 'book'),)