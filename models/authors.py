from db import db


class AuthorModel(db.Model):
    __tablename__ = "authors"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String)
    flourished_start = db.Column(db.Integer)
    flourished_end = db.Column(db.Integer)
    leges = db.relationship("DigestaLexModel", back_populates="author", lazy="dynamic")
    opera = db.relationship("OpusModel", back_populates="author", lazy="dynamic")

