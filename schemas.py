from marshmallow import Schema, fields


class PlainAuthorSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(dump_only=True)
    # description = fields.Str(dump_only=True)
    # flourished_start = fields.Int(dump_only=True)
    # flourished_end = fields.Int(dump_only=True)






class PlainOperaSchema(Schema):
    id = fields.Int(dump_only=True)
    title_lat = fields.Str(dump_only=True)
    title_pl = fields.Str(dump_only=True)



class PlainParagraphusTocSchema(Schema):
    id = fields.Int(dump_only=True)
    key = fields.Str()


class UserDataSchema(Schema):
    id = fields.Int()
    username = fields.Str()


class PlainLikeSchema(Schema):
    id = fields.Int()
    user_id = fields.Int()


class PlainCommentSchema(Schema):
    id = fields.Int(dump_only=True)
    comment = fields.Str()
    private = fields.Bool()
    date = fields.DateTime(dump_only=True)
    user = fields.Nested(UserDataSchema())
    # reply_to_comment = fields.List(fields.Nested('self'))
    replies = fields.List(fields.Nested('self'))
    likes = fields.List(fields.Nested(PlainLikeSchema()))


class PlainCommentsSchemaWithToken(Schema):
    comments = fields.List(fields.Nested(PlainCommentSchema()))
    access_token = fields.Str()


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
    book = fields.Nested(PlainDigestaBookSchema())


class PlainDigestaLexSchema(Schema):
    id = fields.Int(dump_only=True)
    address_lat = fields.Str()
    address_pl = fields.Str()
    lex_nr = fields.Int()



class PlainDigestaParagraphusSchema(Schema):
    id = fields.Int(dump_only=True)
    key = fields.Str()
    text_lat = fields.Str()
    text_pl = fields.Str()


class DigestaBookSchema(PlainDigestaBookSchema):
    tituli = fields.List(fields.Nested(PlainDigestaTitulusSchema()), dump_only=True)


class DigestaLexSimpleSchema(Schema):
    id = fields.Int(dump_only=True)
    lex_nr = fields.Int()


class DigestaTocLex(DigestaLexSimpleSchema):
    titulus = fields.Nested(PlainDigestaTitulusSchema())

class PlainOpusLiberSchema(Schema):
    id = fields.Int()
    liber = fields.Int()
    leges = fields.List(fields.Nested(DigestaTocLex()))

class OpusLiberSchema(PlainOpusLiberSchema):
    opus = fields.Nested(PlainOperaSchema())
    leges = fields.List(fields.Nested(DigestaTocLex()))


class DigestaParagraphusSchema(PlainDigestaParagraphusSchema):
    lex = fields.Nested(DigestaTocLex())
    comments = fields.List(fields.Nested(PlainCommentSchema()))



class DigestaLexSchema(PlainDigestaLexSchema):
    titulus = fields.Nested(PlainDigestaTitulusSchema())
    author = fields.Nested(PlainAuthorSchema())
    opus = fields.Nested(OpusLiberSchema())
    book = fields.Nested(PlainDigestaBookSchema())
    paragraphi = fields.List(fields.Nested(DigestaParagraphusSchema()))



class SearchTermSchema(Schema):
    searched_term = fields.Str(required=True)


class CommentSaveSchema(PlainCommentSchema):
    reply_to_comment_id = fields.Int(allow_none=True)



class CommentUpdateSchema(PlainCommentSchema):
    comment_id = fields.Int()





class CommentSchema(PlainCommentSchema):
    user = fields.Nested(UserDataSchema())
    reply_to_comment = fields.Nested(PlainCommentSchema())


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True)


class UserRegisterSchema(UserSchema):
    email = fields.Str(required=True)


class PlainDigestaTOCLexSchema(Schema):
    id = fields.Int(dump_only=True)
    # address_lat = fields.Str()
    # address_pl = fields.Str()
    lex_nr = fields.Int()
    author = fields.Nested(PlainAuthorSchema())
    author_id = fields.Int()
    titulus = fields.Nested(PlainDigestaTitulusSchema())
    opus_id = fields.Int()
    opus = fields.Nested(PlainOperaSchema())
    paragraphi = fields.List(fields.Nested(PlainParagraphusTocSchema()))


class OperaSchema(PlainOperaSchema):

    author = fields.Nested(PlainAuthorSchema())
    # libri = fields.List(PlainOpusLiberSchema())
    libri = fields.List(fields.Nested(PlainOpusLiberSchema()))

class DigestaTitulusSchema(PlainDigestaTitulusSchema):
    book = fields.Nested(PlainDigestaBookSchema())
    leges = fields.List(fields.Nested(PlainDigestaTOCLexSchema()))




class DigestaBookTOCSchema(PlainDigestaBookSchema):
    tituli = fields.List(fields.Nested(DigestaTitulusSchema()), dump_only=True)


class AuthorSchema(PlainAuthorSchema):
    leges = fields.List(fields.Nested(PlainDigestaTOCLexSchema()))
    opera = fields.List(fields.Nested(PlainOperaSchema()))


# class PlainDigestaTocLexSchema(PlainDigestaTOCLexSchema):
#     book = fields.Nested(PlainDigestaBookSchema())
#     titulus = fields.Nested(PlainDigestaTitulusSchema())

class CommentedParagraphiSchema(PlainParagraphusTocSchema):
    lex = fields.Nested(PlainDigestaTOCLexSchema())


class CommentedParagraphiWithToken(Schema):
    paragraphi = fields.List(fields.Nested(CommentedParagraphiSchema()))
    access_token = fields.Str()


class UserLoginSchema(Schema):
    access_token = fields.Str()
    refresh_token = fields.Str()
    user_id = fields.Int()
    username = fields.Str()
    paragraphi = fields.List(fields.Nested(CommentedParagraphiSchema()))


class DeleteResponseSchema(Schema):
    status = fields.Int()
    message = fields.Str()
    commentedParagraphi = fields.List(fields.Nested(CommentedParagraphiSchema()))


class LikeSaveSchema(Schema):

    comment_id = fields.Int()