from flask.views import MethodView
from flask_smorest import Blueprint
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import CommentModel
from db import db
from schemas import CommentsSchema

blp = Blueprint("Comments", "comments", description="Operations on comments")

@blp.route("/comments")
class Comments(MethodView):

    @jwt_required()
    @blp.arguments(CommentsSchema)
    def post(self, data):
        user_id = get_jwt_identity()
        comment_content = data["comment"]
        lex_id = data["lex_id"]
        private = data["private"]
        comment = CommentModel(comment=comment_content, user_id=user_id, private=private, lex_id=lex_id)

        db.session.add(comment)
        db.session.commit()

        return {"message": "Comment created successfully"}, 200


