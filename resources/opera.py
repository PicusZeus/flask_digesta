from flask.views import MethodView
from flask_smorest import Blueprint
from models import OpusModel
from schemas import OpusTocSchema

blp = Blueprint("opera", __name__, description="operations on opera jurisprudentiorum")


@blp.route("/opera/<int:opus_id>")
class Opus(MethodView):
    @blp.response(200, OpusTocSchema)
    def get(self, opus_id):
        opera_data = OpusModel.query.get_or_404(opus_id)
        return opera_data


@blp.route("/opera")
class Opera(MethodView):
    @blp.response(200, OpusTocSchema(many=True))
    def get(self):
        opera_data = OpusModel.query.order_by(OpusModel.title_lat, OpusModel.author_id).all()
        return opera_data


@blp.route("/opera/jurist/<int:jurist_id>")
class OperaByJurist(MethodView):
    @blp.response(200, OpusTocSchema(many=True))
    def get(self, jurist_id):
        opera_data = OpusModel.query.filter(OpusModel.author_id == jurist_id).order_by(OpusModel.title_lat).all()
        return opera_data
