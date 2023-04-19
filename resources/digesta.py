import uuid
from flask import request
from flask.views import MethodView
from flask_cors import cross_origin, CORS
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from db import db
from models import DigestaBookModel, DigestaLexModel, DigestaTitulusModel, AuthorModel, CommentModel
from schemas import DigestaBookSchema, DigestaLexSchema, DigestaTitulusSchema, DigestaBookTOCSchema, SearchTermSchema, CommentSchema
from sqlalchemy import and_, or_
from sqlalchemy.sql.expression import false, true
blp = Blueprint("digesta", __name__, description="Operations on digesta")


@blp.route("/digesta/leges/<int:lex_id>")
class DigestaParagraph(MethodView):

    @blp.response(200, DigestaLexSchema())
    # @blp.response(200, CommentSchema(many=True))
    # @jwt_required(optional=True)
    def get(self, lex_id):
        # user_id = get_jwt_identity()

        lex_data = DigestaLexModel.query.get_or_404(lex_id)

        # comments = lex_data.comments.filter(or_(CommentModel.private == false(), CommentModel.user_id == user_id)).all()
        # comments = lex_data.comments.filter(CommentModel.user_id == user_id).all()
        # comments = CommentModel.query.filter(CommentModel.lex_id == lex_id, CommentModel.private == false()).all()
        # # comments = CommentModel.query.all()
        # if not comments:
        #     comments = []
        # print(comments)
        # comments
        # lex_data.comments = comments
        # return comments
        return lex_data

@blp.route("/digesta/tituli/<int:titulus_id>")
class DigestaSection(MethodView):
    @blp.response(200, DigestaTitulusSchema())
    def get(self, titulus_id):
        titulus_data = DigestaTitulusModel.query.get_or_404(titulus_id)
        return titulus_data


# @blp.route("/digesta/book/<int:book_id>")
# class DigestaBookTOC(MethodView):
#     @blp.response(200, DigestaBookTOCSchema())
#     def get(self, book_id):
#         book_data = DigestaBookModel.query.filter(DigestaBookModel.id == book_id).order_by(DigestaBookModel.id).first()
#
#         return book_data


@blp.route("/digesta/books")
class DigestaBooksToc(MethodView):
    @blp.response(200, DigestaBookTOCSchema(many=True))
    def get(self):
        books_data = DigestaBookModel.query.order_by(DigestaBookModel.id).all()
        return books_data

#
# @blp.route("/digesta/books/<int:jurysta_id>")
# class DigestaBooksTocJurist(MethodView):
#
#     @blp.response(200, DigestaBookTOCSchema(many=True))
#     def get(self, jurysta_id):
#         new_books_data = []
#         books_data = DigestaBookModel.query.order_by(DigestaBookModel.id).all()
#         for book in books_data:
#             new_tituli = []
#             for titulus in book.tituli:
#
#                 new_leges = titulus.leges.filter(DigestaLexModel.author_id == jurysta_id).all()
#
#                 if len(new_leges) > 0:
#                     titulus.leges = new_leges
#                     new_tituli.append(titulus)
#             if len(new_tituli) > 0:
#                 book.tituli = new_tituli
#                 new_books_data.append(book)
#
#         return new_books_data
#




# @blp.route("/digesta/books/author_id")
# class DigestaBooksTocByAuthor(MethodView):
#
#     @blp.response(200, DigestaBookTOCSchema(many=True))
#     def get(self):
#

@blp.route("/digesta/lat")
class DigestaLatinSearch(MethodView):
    @cross_origin()
    @blp.arguments(SearchTermSchema)
    @blp.response(200, DigestaLexSchema(many=True))
    def post(self, data):
        searched_term = data["searched_term"]
        searched_term = f"%{searched_term}%"
        leges = DigestaLexModel.query.filter(DigestaLexModel.text_lat.like(searched_term)).all()
        return leges


@blp.route("/digesta/pl")
class DigestaLatinSearch(MethodView):
    @cross_origin()
    @blp.arguments(SearchTermSchema)
    @blp.response(200, DigestaLexSchema(many=True))
    def post(self, data):
        searched_term = data["searched_term"]
        searched_term = f"%{searched_term}%"
        leges = DigestaLexModel.query.filter(DigestaLexModel.text_pl.like(searched_term)).all()
        return leges
