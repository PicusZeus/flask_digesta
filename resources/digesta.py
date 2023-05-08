from flask.views import MethodView
from flask_cors import cross_origin, CORS
from flask_smorest import Blueprint

from models import DigestaBookModel, DigestaLexModel, DigestaTitulusModel, DigestaParagraphusModel
from schemas import DigestaLexSchema, DigestaTitulusSchema, SearchTermSchema, ParagraphusSchema, BookTocSchema, TitulusTocSchema, FullLexSchema, BookTocAuthorSchema, PlainBookSchema, PlainTitulusSchema, LexTocSchema
blp = Blueprint("digesta", __name__, description="Operations on digesta")
from db import db
from sqlalchemy.sql.expression import join
@blp.route("/digesta/leges/<int:lex_id>")
class DigestaLex(MethodView):

    @blp.response(200, FullLexSchema())
    # @blp.response(200, CommentSchema(many=True))
    # @jwt_required(optional=True)
    def get(self, lex_id):

        lex_data = DigestaLexModel.query.get_or_404(lex_id)

        return lex_data





@blp.route("/digesta/paragraphi/<int:paragraphus_id>")
class DigestaParagraphus(MethodView):
    @blp.response(200, ParagraphusSchema())
    def get(self, paragraphus_id):
        paragraphus_data = DigestaParagraphusModel.query.get_or_404(paragraphus_id)
        return paragraphus_data

@blp.route("/digesta/titulus/leges/<int:titulus_id>")
class DigestaTitulus(MethodView):
    @blp.response(200, LexTocSchema(many=True))
    def get(self, titulus_id):
        leges = DigestaLexModel.query.filter(DigestaLexModel.titulus_id == titulus_id).all()
        return leges


@blp.route("/digesta/books")
class DigestaBooksToc(MethodView):

    @cross_origin()
    @blp.response(200, BookTocSchema(many=True))
    def get(self):
        books_data = DigestaBookModel.query.order_by(DigestaBookModel.id).all()
        return books_data


@blp.route("/digesta/books/author/<int:author_id>")
class DigestaBooksAuthorToc(MethodView):

    @blp.response(200, PlainBookSchema(many=True))
    def get(self, author_id):


        data = db.session.query(DigestaBookModel).join(DigestaTitulusModel).filter(DigestaTitulusModel.leges.any(author_id=author_id)).all()
        return data

@blp.route("/digesta/tituli/author/<int:book_id>/<int:author_id>")
class DigestaTituliAuthorToc(MethodView):

    @blp.response(200, PlainTitulusSchema(many=True))
    def get(self, book_id, author_id):
        data = DigestaTitulusModel.query.filter(DigestaTitulusModel.book_id == book_id).filter(DigestaTitulusModel.leges.any(author_id=author_id)).all()
        return data

@blp.route("/digesta/titulus/leges/author/<int:titulus_id>/<int:author_id>")
class DigestaTitulusLegesAuthorToc(MethodView):

    @blp.response(200, LexTocSchema(many=True))
    def get(self, titulus_id, author_id):
        data = DigestaLexModel.query.filter(DigestaLexModel.titulus_id == titulus_id, DigestaLexModel.author_id == author_id).all()
        return data
# @blp.route("/digesta/books/<int:book_nr>")
# class DigestaBookToc(MethodView):
#
#     @cross_origin()
#     @blp.response(200, BookTocSchema())
#     def get(self, book_nr):
#         book_data = DigestaBookModel.query.filter(DigestaBookModel.book_nr == book_nr).first()
#         return book_data


@blp.route("/digesta/lat")
class DigestaLatinSearch(MethodView):
    @cross_origin()
    @blp.arguments(SearchTermSchema)
    @blp.response(200, ParagraphusSchema(many=True))
    def post(self, data):
        searched_term = data["searched_term"]
        searched_term = f"%{searched_term}%"
        paragraphi = DigestaParagraphusModel.query.filter(DigestaParagraphusModel.text_lat.like(searched_term)).all()
        return paragraphi


@blp.route("/digesta/pl")
class DigestaLatinSearch(MethodView):

    @cross_origin()
    @blp.arguments(SearchTermSchema)
    @blp.response(200, ParagraphusSchema(many=True))
    def post(self, data):
        searched_term = data["searched_term"]
        searched_term = f"%{searched_term}%"
        paragraphi = DigestaParagraphusModel.query.filter(DigestaParagraphusModel.text_pl.like(searched_term)).all()
        return paragraphi
