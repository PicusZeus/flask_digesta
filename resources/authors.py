from flask.views import MethodView
from flask_smorest import Blueprint, abort

from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from db import db
from models import AuthorModel, OperaModel
from schemas import AuthorSchema


blp = Blueprint("digesta", __name__, description="Operations on authors")


@blp.route("/authors")
class AuthorsAll(MethodView):
    @blp.response(200, AuthorSchema(many=True))
    def get(self):
        return AuthorModel.query.all()


@blp.route("/authors/<str:author_name>")
class Author(MethodView):
    @blp.response(200, AuthorSchema())
    def get(self, author_name):
        author = AuthorModel.query.filter_by(name=author_name).first_or_404()
        return author


@blp.route("/authors/<int:start>/<int:end>")
class AuthorByAge(MethodView):
    @blp.response(200, AuthorSchema(many=True))
    def get(self, start, end):
        authors = AuthorModel.query.filter(db.authors.flourished_start >= start, db.authors.flourished_end <= end).all()
        return authors
