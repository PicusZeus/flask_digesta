from db import db
from sqlalchemy import UniqueConstraint


class OpusModel(db.Model):
    # works of jurists that were used in Digesta
    __tablename__ = "opera"
    id = db.Column(db.Integer, primary_key=True)
    title_lat = db.Column(db.String(256), nullable=False)
    title_pl = db.Column(db.String(256), nullable=False)
    # most of the excerpted works consisted of many books and for the most part the number of book is given
    # if not given, or the work is singlebook, expected value is zero
    author_id = db.Column(db.Integer, db.ForeignKey("authors.id"), unique=False, nullable=False)
    author = db.relationship("AuthorModel", back_populates="opera")
    libri = db.relationship("OpusLibriModel", back_populates="opus")
    coverage = db.Column(db.Float(4))

    books_coverage = db.relationship("OpusBookCoverageModel")
    tituli_coverage = db.relationship("OpusTitulusCoverageModel")
    __table_args__ = (UniqueConstraint('title_lat', 'author_id'),)


class OpusBookCoverageModel(db.Model):
    __tablename__ = "opera_book_coverage"
    id = db.Column(db.Integer, primary_key=True)
    opus_id = db.Column(db.Integer, db.ForeignKey("opera.id"))
    book_id = db.Column(db.Integer, db.ForeignKey("digesta_books.id"))
    opus = db.relationship("OpusModel", back_populates="books_coverage")
    coverage = db.Column(db.Float(4))
    book = db.relationship("DigestaBookModel", back_populates='opera_coverage')
    __table_args__ = (UniqueConstraint('opus_id', 'book_id'),)


class OpusTitulusCoverageModel(db.Model):
    __tablename__ = "opera_titulus_coverage"
    id = db.Column(db.Integer, primary_key=True)
    opus_id = db.Column(db.Integer, db.ForeignKey("opera.id"))
    titulus_id = db.Column(db.Integer, db.ForeignKey("digesta_tituli.id"))
    coverage = db.Column(db.Float(4))
    opus = db.relationship("OpusModel", back_populates="tituli_coverage")
    titulus = db.relationship("DigestaTitulusModel", back_populates="opera_coverage")
    __table_args__ = (UniqueConstraint('opus_id', 'titulus_id'),)



class OpusLibriModel(db.Model):
    __tablename__ = "libri"
    id = db.Column(db.Integer, primary_key=True)
    opus_id = db.Column(db.Integer, db.ForeignKey("opera.id"), unique=False, nullable=False)
    opus = db.relationship("OpusModel", back_populates="libri")
    liber = db.Column(db.Integer, nullable=False)
    leges = db.relationship("DigestaLexModel", back_populates="opus")
    __table_args__ = (UniqueConstraint('opus_id', 'liber'),)
