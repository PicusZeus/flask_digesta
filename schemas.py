from marshmallow import Schema, fields


class PlainAuthorSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(dump_only=True)
    description = fields.Str(dump_only=True)
    flourished_start = fields.Int(dump_only=True)
    flourished_end = fields.Int(dump_only=True)


class PlainOperaSchema(Schema):
    id = fields.Int(dump_only=True)
    title_lat = fields.Str(dump_only=True)
    title_pl = fields.Str(dump_only=True)
    book = fields.Int(dump_only=True)


class PlainDigestaTOCLexSchema(Schema):
    id = fields.Int(dump_only=True)
    address_lat = fields.Str()
    address_pl = fields.Str()
    lex_nr = fields.Int()
    author_id = fields.Int()


class AuthorSchema(PlainAuthorSchema):
    leges = fields.List(fields.Nested(PlainDigestaTOCLexSchema()))
    opera = fields.List(fields.Nested(PlainOperaSchema()))



class PlainCommentSchema(Schema):
    id = fields.Int(dump_only=True)
    comment = fields.Str()
    private = fields.Bool()
    date = fields.DateTime(dump_only=True)


class AuthorOperaSchema(PlainAuthorSchema):
    opera = fields.List(fields.Nested(PlainOperaSchema()))


class PlainDigestaBookSchema(Schema):
    id = fields.Int(dump_only=True)
    book_latin_name = fields.Str(dump_only=True)
    book_polish_name = fields.Str(dump_only=True)
    book_nr = fields.Int()


class PlainDigestaTitulusSchema(Schema):
    id = fields.Int(dump_only=True)
    number = fields.Int(dump_only=True)
    title_lat = fields.Str()
    title_pl = fields.Str()




class PlainDigestaLexSchema(Schema):
    id = fields.Int(dump_only=True)
    address_lat = fields.Str()
    address_pl = fields.Str()
    text_lat = fields.Str()
    text_pl = fields.Str()
    lex_nr = fields.Int()


class DigestaBookSchema(PlainDigestaBookSchema):
    tituli = fields.List(fields.Nested(PlainDigestaTitulusSchema()), dump_only=True)


class DigestaTitulusSchema(PlainDigestaTitulusSchema):
    book = fields.Nested(PlainDigestaBookSchema())
    leges = fields.List(fields.Nested(PlainDigestaTOCLexSchema()))


class DigestaBookTOCSchema(PlainDigestaBookSchema):
    tituli = fields.List(fields.Nested(DigestaTitulusSchema()), dump_only=True)


class DigestaLexSchema(PlainDigestaLexSchema):
    titulus = fields.Nested(PlainDigestaTitulusSchema())
    author = fields.Nested(PlainAuthorSchema())
    opus = fields.Nested(PlainOperaSchema())
    book = fields.Nested(PlainDigestaBookSchema())


class DigestaLexSimpleSchema(Schema):
    id = fields.Int(dump_only=True)
    lex_nr = fields.Int()


class DigestaTocLexExtendedSchema(PlainDigestaTOCLexSchema):
    book = fields.Nested(PlainDigestaBookSchema())
    titulus = fields.Nested(PlainDigestaTitulusSchema())


class SearchTermSchema(Schema):
    searched_term = fields.Str(required=True)


class OperaSchema(PlainOperaSchema):
    leges = fields.List(fields.Nested(DigestaTocLexExtendedSchema()))
    author = fields.Nested(PlainAuthorSchema())


class CommentSaveSchema(PlainCommentSchema):
    reply_to_comment_id = fields.Int(allow_none=True)


class CommentUpdateSchema(PlainCommentSchema):
    comment_id = fields.Int()


class UserDataSchema(Schema):
    id = fields.Int()
    username = fields.Str()


class CommentSchema(PlainCommentSchema):
    user = fields.Nested(UserDataSchema())
    reply_to_comment = fields.Nested(PlainCommentSchema())


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True)


class UserRegisterSchema(UserSchema):
    email = fields.Str(required=True)