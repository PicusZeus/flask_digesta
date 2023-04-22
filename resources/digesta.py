from flask.views import MethodView
from flask_cors import cross_origin, CORS
from flask_smorest import Blueprint

from models import DigestaBookModel, DigestaLexModel, DigestaTitulusModel, DigestaParagraphusModel
from schemas import DigestaLexSchema, DigestaTitulusSchema, DigestaBookTOCSchema, SearchTermSchema, DigestaParagraphusSchema
blp = Blueprint("digesta", __name__, description="Operations on digesta")


@blp.route("/digesta/leges/<int:lex_id>")
class DigestaParagraph(MethodView):

    @blp.response(200, DigestaLexSchema())
    # @blp.response(200, CommentSchema(many=True))
    # @jwt_required(optional=True)
    def get(self, lex_id):

        lex_data = DigestaLexModel.query.get_or_404(lex_id)

        return lex_data

@blp.route("/digesta/tituli/<int:titulus_id>")
class DigestaSection(MethodView):
    @blp.response(200, DigestaTitulusSchema())
    def get(self, titulus_id):
        titulus_data = DigestaTitulusModel.query.get_or_404(titulus_id)
        return titulus_data


@blp.route("/digesta/books")
class DigestaBooksToc(MethodView):

    @cross_origin()
    @blp.response(200, DigestaBookTOCSchema(many=True))
    def get(self):
        books_data = DigestaBookModel.query.order_by(DigestaBookModel.id).all()
        return books_data




@blp.route("/digesta/lat")
class DigestaLatinSearch(MethodView):
    @cross_origin()
    @blp.arguments(SearchTermSchema)
    @blp.response(200, DigestaParagraphusSchema(many=True))
    def post(self, data):
        searched_term = data["searched_term"]
        searched_term = f"%{searched_term}%"
        paragraphi = DigestaParagraphusModel.query.filter(DigestaParagraphusModel.text_lat.like(searched_term)).all()
        return paragraphi


@blp.route("/digesta/pl")
class DigestaLatinSearch(MethodView):

    @cross_origin()
    @blp.arguments(SearchTermSchema)
    @blp.response(200, DigestaParagraphusSchema(many=True))
    def post(self, data):
        searched_term = data["searched_term"]
        searched_term = f"%{searched_term}%"
        paragraphi = DigestaParagraphusModel.query.filter(DigestaParagraphusModel.text_pl.like(searched_term)).all()
        return paragraphi
