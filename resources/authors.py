from flask.views import MethodView
from flask_smorest import Blueprint, abort

from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from db import db
from models import AuthorModel, OperaModel
from schemas import AuthorSchema


blp = Blueprint("authors", __name__, description="Operations on authors")


@blp.route("/authors")
class AuthorsAll(MethodView):
    @blp.response(200, AuthorSchema(many=True))
    def get(self):
        return AuthorModel.query.order_by(AuthorModel.name).all()


@blp.route("/authors/<int:author_id>")
class Author(MethodView):
    @blp.response(200, AuthorSchema())
    def get(self, author_id):
        author = AuthorModel.query.get_or_404(author_id)
        return author


@blp.route("/authors/<int:start>/<int:end>")
class AuthorByAge(MethodView):
    @blp.response(200, AuthorSchema(many=True))
    def get(self, start, end):
        authors = AuthorModel.query.filter(db.authors.flourished_start >= start, db.authors.flourished_end <= end).all()
        return authors
