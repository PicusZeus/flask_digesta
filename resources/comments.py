from flask import abort
from flask.views import MethodView
from flask_smorest import Blueprint
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import CommentModel
from db import db
from schemas import CommentSaveSchema, CommentSchema, CommentUpdateSchema
from datetime import datetime
from sqlalchemy import or_
from sqlalchemy.sql.expression import false
blp = Blueprint("Comments", "comments", description="Operations on comments")


@blp.route("/comments")
class AllCommentsByUser(MethodView):
    @jwt_required()
    @blp.response(200, CommentSchema(many=True))
    def get(self):
        user_id = get_jwt_identity()
        comments = CommentModel.query.filter(CommentModel.user_id == user_id).all()
        return comments


@blp.route("/comment/<int:comment_id>")
class Comment(MethodView):

    @jwt_required()
    @blp.response(200, CommentSchema())
    def get(self, comment_id):
        user_id = get_jwt_identity()
        comment = CommentModel.query.filter(CommentModel.id == comment_id, CommentModel.user_id == user_id).first()
        return comment

    @jwt_required()
    @blp.arguments(CommentUpdateSchema())
    def put(self, data, comment_id):
        comment = CommentModel.query.filter(CommentModel.id == comment_id, CommentModel.user_id == user_id).first()

        if comment:
            comment_content = data["comment"]

            private = data["private"]
            date = datetime.now()
            comment.comment = comment_content
            comment.private = private
            comment.date = date
            db.session.commit()

            return {"message": "Comment updated successfully"}, 200

    @jwt_required()
    def delete(self, comment_id):
        comment = CommentModel.query.filter(CommentModel.id == comment_id, CommentModel.user_id == user_id).first()

        if comment:
            db.session.delete(comment)
            db.session.save()
            return {"message": "Item deleted."}

        abort(401, message="User privilege required.")


@blp.route("/comment/lex/<int:lex_id>")
class CommentByLex(MethodView):

    @jwt_required(optional=True)
    @blp.response(200, CommentSchema(many=True))
    def get(self, lex_id):
        user_id = get_jwt_identity()
        # if not user_id:
        #     user_id = 1
        comments = CommentModel.query.filter(CommentModel.lex_id == lex_id).filter(or_(CommentModel.private == false(), CommentModel.user_id == user_id)).all()

        return comments

    @jwt_required()
    @blp.arguments(CommentSaveSchema())
    def post(self, data, lex_id):
        user_id = get_jwt_identity()
        comment_content = data["comment"]
        # lex_id = data["lex_id"]
        private = data["private"]
        reply_to_comment_id = data["reply_to_comment_id"]
        date = datetime.now()

        comment = CommentModel(comment=comment_content,
                                user_id=user_id,
                                private=private,
                                date=date,
                                lex_id=lex_id,
                                reply_to_comment_id=reply_to_comment_id)

        db.session.add(comment)
        db.session.commit()

        return {"message": "Comment created successfully"}, 200

    # @jwt_required()
    # @blp.arguments(CommentUpdateSchema())
    # def put(self, data, lex_id):
    #
    #     comment_content = data["comment"]
    #
    #     private = data["private"]
    #     comment_id = data["comment_id"]
    #     date = datetime.now()
    #
    #     comment = db.session.query(CommentModel).filter(CommentModel.id == comment_id).first()
    #
    #     comment.comment = comment_content
    #     # db.session.commit()
    #     comment.private = private
    #     # db.session.commit()
    #     comment.date = date
    #     # db.session.save(comment)
    #     db.session.commit()
    #
    #     return {"message": "Comment updated successfully"}, 200
    #

