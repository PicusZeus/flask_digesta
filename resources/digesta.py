import uuid
from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort

from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from db import db
from models import DigestaBookModel, DigestaLexModel, DigestaTitulusModel, AuthorModel
from schemas import DigestaBookSchema, DigestaLexSchema, DigestaTitulusSchema, DigestaBookTOCSchema


blp = Blueprint("digesta", __name__, description="Operations on digesta")


@blp.route("/digesta/leges/<int:lex_id>")
class DigestaParagraph(MethodView):
    @blp.response(200, DigestaLexSchema())
    def get(self, lex_id):
        paragraph_data = DigestaLexModel.query.get_or_404(lex_id)
        return paragraph_data


@blp.route("/digesta/tituli/<int:titulus_id>")
class DigestaSection(MethodView):
    @blp.response(200, DigestaTitulusSchema())
    def get(self, titulus_id):
        section_data = DigestaTitulusModel.query.get_or_404(titulus_id)
        return section_data

@blp.route("/digesta/book/<int:book_id>")
class DigestaBookTOC(MethodView):
    @blp.response(200, DigestaBookTOCSchema())
    def get(self, book_id):
        book_data = DigestaBookModel.query.filter(DigestaBookModel.id == book_id).order_by(DigestaBookModel.id).first()

        return book_data
