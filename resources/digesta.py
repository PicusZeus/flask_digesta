import uuid
from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort

from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from db import db
from models import DigestaModel, AuthorModel
from schemas import DigestaSchema


blp = Blueprint("digesta", __name__, description="Operations on digesta")


@blp.route("/digesta/<str:book>/<str:section>/<str:paragraph>")
class Digesta(MethodView):
    @blp.response(200, DigestaSchema)
    def get(self, book, section, paragraph):
        paragraph_data = DigestaModel.query.filter_by(book=book, section=section, paragraph=paragraph).first_or_404()
        return paragraph_data


@blp.route("/digesta/<str:author>")
class DigestaByAuthor(MethodView):
    @blp.response(200, DigestaSchema(many=True))
    def get(self, author):
        author_m = AuthorModel.query.filter_by(name=author).first_or_404()
        return author_m.digesta
