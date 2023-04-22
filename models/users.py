from db import db


class UserModel(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    comments = db.relationship("CommentModel", back_populates='user', order_by="CommentModel.date")
    # paragraphi = db.relationship("DigestaParagraphusModel", back_populates='user', lazy="dynamic")