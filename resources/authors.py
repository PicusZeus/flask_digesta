from flask.views import MethodView
from flask_cors import cross_origin
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from db import db
from models import AuthorModel, OperaModel, DigestaBookModel, DigestaLexModel, DigestaTitulusModel
from schemas import AuthorSchema, AuthorOperaSchema, DigestaBookTOCSchema, DigestaLexSchema, \
    DigestaLexSimpleSchema

blp = Blueprint("authors", __name__, description="Operations on authors")


@blp.route("/authors")
class AuthorsAll(MethodView):
    @blp.response(200, AuthorSchema(many=True))
    def get(self):
        return AuthorModel.query.order_by(AuthorModel.name).all()


@blp.route("/authors/<int:author_id>")
class Author(MethodView):
    @blp.response(200, AuthorOperaSchema())
    def get(self, author_id):
        author = AuthorModel.query.get_or_404(author_id)
        return author

@blp.route("/authors/digesta/<int:author_id>")
class AuthorDigesta(MethodView):
    @cross_origin()
    @blp.response(200, DigestaLexSchema(many=True))
    def get(self, author_id):
        # author_digesta = DigestaBookModel.query.filter(DigestaBookModel.tituli.any(DigestaTitulusModel.number == '1')).all()
        author_digesta = DigestaLexModel.query.filter(DigestaLexModel.author_id == author_id).all()
        return author_digesta

@blp.route("/authors/<int:start>/<int:end>")
class AuthorByAge(MethodView):
    @cross_origin()
    @blp.response(200, AuthorSchema(many=True))
    def get(self, start, end):
        authors = AuthorModel.query.filter(db.authors.flourished_start >= start, db.authors.flourished_end <= end).all()
        return authors
