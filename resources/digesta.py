import uuid
from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort

from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from db import db
from models import DigestaBookModel, DigestaParagraphModel, DigestaSectionModel, AuthorModel
from schemas import DigestaBookSchema, DigestaParagraphSchema, DigestaSectionSchema


blp = Blueprint("digesta", __name__, description="Operations on digesta")


@blp.route("/digesta/paragraph/<int:paragraph_id>")
class DigestaParagraph(MethodView):
    @blp.response(200, DigestaParagraphSchema())
    def get(self, paragraph_id):
        paragraph_data = DigestaParagraphModel.query.get_or_404(paragraph_id)
        return paragraph_data


@blp.route("/digesta/section/<int:section_id>")
class DigestaSection(MethodView):
    @blp.response(200, DigestaSectionSchema())
    def get(self, section_id):
        section_data = DigestaSectionModel.query.get_or_404(section_id)
        return section_data

