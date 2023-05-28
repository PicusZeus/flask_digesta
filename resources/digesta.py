from flask.views import MethodView
from flask_cors import cross_origin, CORS
from flask_smorest import Blueprint
from db import db
from models import DigestaBookModel, DigestaLexModel, DigestaTitulusModel, DigestaParagraphusModel
from schemas import SearchTermSchema, ParagraphusSchema, BookTocSchema, FullLexSchema, PlainBookSchema,\
    PlainTitulusSchema, LexTocSchema, ParagraphusSearchSchema, LexOpusSchema
blp = Blueprint("digesta", __name__, description="Operations on digesta")




# @blp.route("/authorship")
# class AuthorshipDigesta(MethodView):
#     @blp.response(200, BookAuthorshipSchema(many=True))
#     def get(self):
#         books = DigestaBookModel.query.all()
#         return books


@blp.route("/api/digesta/leges/<int:lex_id>")
class DigestaLex(MethodView):

    @blp.response(200, FullLexSchema())
    def get(self, lex_id):

        lex_data = DigestaLexModel.query.get_or_404(lex_id)

        return lex_data


@blp.route("/api/digesta/paragraphi/<int:paragraphus_id>")
class DigestaParagraphus(MethodView):
    @blp.response(200, ParagraphusSchema())
    def get(self, paragraphus_id):
        paragraphus_data = DigestaParagraphusModel.query.get_or_404(paragraphus_id)
        return paragraphus_data


@blp.route("/api/digesta/titulus/leges/<int:titulus_id>")
class DigestaTitulus(MethodView):
    @blp.response(200, LexTocSchema(many=True))
    def get(self, titulus_id):
        leges = DigestaLexModel.query.filter(DigestaLexModel.titulus_id == titulus_id).all()
        return leges


@blp.route("/api/digesta/opus/leges/<int:liber_id>")
class DigestaOpusLiber(MethodView):
    @blp.response(200, LexOpusSchema(many=True))
    def get(self, liber_id):
        leges = DigestaLexModel.query.filter(DigestaLexModel.opus_id == liber_id).all()
        return leges


@blp.route("/api/digesta/books")
class DigestaBooksToc(MethodView):

    @cross_origin()
    @blp.response(200, BookTocSchema(many=True))
    def get(self):
        books_data = DigestaBookModel.query.order_by(DigestaBookModel.id).all()
        return books_data


@blp.route("/api/digesta/books/author/<int:author_id>")
class DigestaBooksAuthorToc(MethodView):

    @blp.response(200, PlainBookSchema(many=True))
    def get(self, author_id):

        data = db.session.query(DigestaBookModel).join(DigestaTitulusModel).filter(DigestaTitulusModel.leges.any(author_id=author_id)).all()
        return data


@blp.route("/api/digesta/tituli/author/<int:book_id>/<int:author_id>")
class DigestaTituliAuthorToc(MethodView):

    @blp.response(200, PlainTitulusSchema(many=True))
    def get(self, book_id, author_id):
        data = DigestaTitulusModel.query.filter(DigestaTitulusModel.book_id == book_id).filter(DigestaTitulusModel.leges.any(author_id=author_id)).all()
        return data


@blp.route("/api/digesta/titulus/leges/author/<int:titulus_id>/<int:author_id>")
class DigestaTitulusLegesAuthorToc(MethodView):

    @blp.response(200, LexTocSchema(many=True))
    def get(self, titulus_id, author_id):
        data = DigestaLexModel.query.filter(DigestaLexModel.titulus_id == titulus_id, DigestaLexModel.author_id == author_id).all()
        return data


@blp.route("/api/digesta/lat")
class DigestaLatinSearch(MethodView):
    @cross_origin()
    @blp.arguments(SearchTermSchema)
    @blp.response(200, ParagraphusSearchSchema(many=True))
    def post(self, data):
        searched_term = data["searched_term"]
        searched_term = f"%{searched_term}%"
        paragraphi = DigestaParagraphusModel.query.filter(DigestaParagraphusModel.text_lat.like(searched_term)).all()
        return paragraphi


@blp.route("/api/digesta/pl")
class DigestaLatinSearch(MethodView):

    @cross_origin()
    @blp.arguments(SearchTermSchema)
    @blp.response(200, ParagraphusSearchSchema(many=True))
    def post(self, data):
        searched_term = data["searched_term"]
        searched_term = f"%{searched_term}%"
        paragraphi = DigestaParagraphusModel.query.filter(DigestaParagraphusModel.text_pl.like(searched_term)).all()
        return paragraphi
