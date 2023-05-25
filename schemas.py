from marshmallow import Schema, fields


# Digesta


class PlainBookSchema(Schema):
    id = fields.Int()
    book_nr = fields.Int()
    book_latin_name = fields.Str()
    book_polish_name = fields.Str()


class PlainTitulusSchema(Schema):
    id = fields.Int()
    number = fields.Int()
    title_lat = fields.Str()
    title_pl = fields.Str()


class PlainLexSchema(Schema):
    id = fields.Int()
    lex_nr = fields.Str()


class PlainParagraphusSchema(Schema):
    id = fields.Int()
    key = fields.Str()

# Digesta Toc


class LexTocSchema(PlainLexSchema):
    paragraphi = fields.List(fields.Nested(PlainParagraphusSchema()))


class TitulusTocSchema(PlainTitulusSchema):
    leges = fields.List(fields.Nested(LexTocSchema()))


class BookTocSchema(PlainBookSchema):
    tituli = fields.List(fields.Nested(PlainTitulusSchema()))


class TitulusSchema(PlainTitulusSchema):
    book = fields.Nested(PlainBookSchema())


class LexOpusSchema(LexTocSchema):
    titulus = fields.Nested(TitulusSchema())

# authorship



# class AuthorshipBookSchema(Schema):
#     book = fields.Nested(PlainBookSchema())
#     authorship = fields.Float()
#
#
# class AuthorshipTitulusSchema(Schema):
#     titulus = fields.Nested(PlainTitulusSchema())
#     authorship = fields.Float()




# jurist





class BookTocAuthorSchema(PlainBookSchema):
    tituli = fields.List(fields.Nested(TitulusTocSchema()))


class PlainJuristSchema(Schema):
    id = fields.Int()
    name = fields.Str()


class JuristInfoSchema(PlainJuristSchema):
    description = fields.Str()
    flourished_start = fields.Int()
    flourished_end = fields.Int()
    authorship = fields.Float()
    # books_authorship = fields.List(fields.Nested(AuthorshipBookSchema()))
    # tituli_authorship = fields.List(fields.Nested(AuthorshipTitulusSchema()))





# opus


class PlainOpusSchema(Schema):
    id = fields.Int()
    title_lat = fields.Str()
    title_pl = fields.Str()


class PlainOpusLiberSchema(Schema):
    id = fields.Int()
    liber = fields.Str()


class OpusLiberTocSchema(PlainOpusLiberSchema):
    leges = fields.List(fields.Nested(PlainLexSchema()))


class OpusLiberSchema(PlainOpusLiberSchema):
    opus = fields.Nested(PlainOpusSchema())


class OpusTocSchema(PlainOpusSchema):
    libri = fields.List(fields.Nested((PlainOpusLiberSchema())))
    author = fields.Nested(PlainJuristSchema())


class OpusLexSchema(PlainLexSchema):
    titulus = fields.Nested(TitulusSchema())


class LexSearchSchema(PlainLexSchema):
    titulus = fields.Nested(TitulusSchema())
    author = fields.Nested(PlainJuristSchema())
    address_pl = fields.Str()
    address_lat = fields.Str()
    # opus = fields.Nested(OpusLiberSchema())
# full lex


class ParagraphusSchema(PlainParagraphusSchema):
    text_lat = fields.Str()
    text_pl = fields.Str()


class ParagraphusSearchSchema(ParagraphusSchema):
    lex = fields.Nested(LexSearchSchema())


class FullLexSchema(PlainLexSchema):
    address_lat = fields.Str()
    address_pl = fields.Str()
    author = fields.Nested(PlainJuristSchema())
    opus = fields.Nested(OpusLiberSchema())
    paragraphi = fields.List(fields.Nested(ParagraphusSchema()))
    titulus = fields.Nested(TitulusSchema())


# comments


class CommentedLexSchema(PlainLexSchema):
    titulus = fields.Nested(TitulusSchema())


class CommentedParagraphusSchema(PlainParagraphusSchema):
    lex = fields.Nested(CommentedLexSchema())


# authentication

class UserLoginSchema(Schema):
    access_token = fields.Str()
    refresh_token = fields.Str()
    user_id = fields.Int()
    username = fields.Str()
    paragraphi = fields.List(fields.Nested(CommentedParagraphusSchema()))


class UserDataSchema(Schema):
    id = fields.Int()
    username = fields.Str()


class PlainAuthorSchema(Schema):
    id = fields.Int()
    name = fields.Str()


class PlainLikeSchema(Schema):
    id = fields.Int()
    user_id = fields.Int()


class PlainOperaSchema(Schema):
    id = fields.Int()
    title_lat = fields.Str()
    title_pl = fields.Str()


class PlainCommentSchema(Schema):
    id = fields.Int(dump_only=True)
    comment = fields.Str()
    private = fields.Bool()
    date = fields.DateTime(dump_only=True)
    user = fields.Nested(UserDataSchema())
    # replies = fields.List(fields.Nested('self'))
    likes = fields.List(fields.Nested(PlainLikeSchema()))


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
    lex_nr = fields.Str()


class DigestaLexSchema(PlainDigestaLexSchema):
    titulus = fields.Nested(PlainDigestaTitulusSchema())
    author = fields.Nested(PlainAuthorSchema())
    opus = fields.Nested(OpusLiberSchema())
    book = fields.Nested(PlainDigestaBookSchema())
    paragraphi = fields.List(fields.Nested(ParagraphusSchema()))


class SearchTermSchema(Schema):
    searched_term = fields.Str(required=True)


class CommentSaveSchema(PlainCommentSchema):
    reply_to_comment_id = fields.Int(allow_none=True)


class CommentUpdateSchema(PlainCommentSchema):
    comment_id = fields.Int()


class CommentSchema(PlainCommentSchema):
    user = fields.Nested(UserDataSchema())
    reply_to_comment = fields.Nested(PlainCommentSchema())
    paragraphus = fields.Nested(CommentedParagraphusSchema())


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True)


class UserRegisterSchema(UserSchema):
    email = fields.Str(required=True)


class PlainDigestaTOCLexSchema(Schema):
    id = fields.Int(dump_only=True)
    lex_nr = fields.Str()
    author = fields.Nested(PlainAuthorSchema())
    author_id = fields.Int()
    titulus = fields.Nested(PlainDigestaTitulusSchema())
    opus_id = fields.Int()
    opus = fields.Nested(PlainOperaSchema())


class CommentedParagraphiSchema(Schema):
    id = fields.Str()


class AuthorSchema(PlainAuthorSchema):
    leges = fields.List(fields.Nested(PlainDigestaTOCLexSchema()))
    opera = fields.List(fields.Nested(PlainOperaSchema()))


class DeleteResponseSchema(Schema):
    status = fields.Int()
    message = fields.Str()


class LikeSaveSchema(Schema):

    comment_id = fields.Int()


# authorship, coverage

# class AuthorshipBooksSchema(Schema):
#     id = fields.Int()
#     author = fields.Nested(PlainAuthorSchema())
#     authorship = fields.Float()

# class AuthorshipTituliSchema(Schema):
#     id = fields.Int()
#     author = fields.Nested(PlainAuthorSchema())
#     authorship = fields.Float()


# class OpusBookCoverageSchema(Schema):
#     id = fields.Int()
#     coverage = fields.Float()
#     opus = fields.Nested(PlainOpusSchema())

# class OpusTitulusCoverageSchema(Schema):
#     id = fields.Int()
#     coverage = fields.Float()
#     opus = fields.Nested(PlainOpusSchema())

# class TitulusAuthorshipSchema(PlainTitulusSchema):
#     jurists_authorship = fields.List(fields.Nested(AuthorshipTituliSchema()))
#     opera_coverage = fields.List(fields.Nested(OpusTitulusCoverageSchema()))
#

# class BookAuthorshipSchema(PlainBookSchema):
#     # tituli = fields.List(fields.Nested(TitulusAuthorshipSchema()))
#     jurists_authorship = fields.List(fields.Nested(AuthorshipBookSchema()))
#     opera_coverage = fields.List(fields.Nested(OpusBookCoverageSchema()))

# stats

class JuristAuthorshipSchema(PlainJuristSchema):
    authorship = fields.Float()

class OpusCoverageSchema(PlainOpusSchema):
    coverage = fields.Float()

class BookShareSchema(PlainBookSchema):
    share = fields.Float()

class TituliShareSchema(PlainTitulusSchema):
    share = fields.Float()


class DigestaStatsSchema(Schema):
    # jurists_authorship = fields.List(fields.Nested(JuristAuthorshipSchema()))
    # opera_coverage = fields.List(fields.Nested(OpusCoverageSchema()))
    books_share = fields.List(fields.Nested(BookShareSchema()))

class JuristAuthorshipSchemaJurist(JuristAuthorshipSchema):
    author = fields.Nested(PlainJuristSchema())


class OpusSchema(PlainOpusSchema):
    author = fields.Nested(PlainJuristSchema())

class OpusCoverageSchemaOpus(OpusCoverageSchema):
    opus = fields.Nested(OpusSchema())

class TitulusBookShareSchema(PlainTitulusSchema):
    book_share = fields.Float()


class DigestaBookStatsSchema(Schema):
    jurists_authorship = fields.List(fields.Nested(JuristAuthorshipSchemaJurist()))
    opera_coverage = fields.List(fields.Nested(OpusCoverageSchemaOpus()))
    tituli_book_share = fields.List(fields.Nested(TitulusBookShareSchema()))
    book = fields.Nested(PlainBookSchema())


class DigestaTitulusStatsSchema(Schema):
    jurists_authorship = fields.List(fields.Nested(JuristAuthorshipSchemaJurist()))
    opera_coverage = fields.List(fields.Nested(OpusCoverageSchemaOpus()))
    titulus = fields.Nested(TitulusSchema())

class JuristBookAuthorshipSchema(Schema):
    book = fields.Nested(PlainBookSchema())
    authorship = fields.Float()
    # author = fields.Nested(PlainAuthorSchema())

# class OpusCoverageSchema(PlainOpusSchema):
#     coverage = fields.Float()

class JuristStatsMainSchema(Schema):
    books = fields.List(fields.Nested(JuristBookAuthorshipSchema()))
    opera = fields.List(fields.Nested(OpusCoverageSchema()))
    jurist = fields.Nested(PlainJuristSchema())

class TitulusAuthorshipSchema(Schema):
    titulus = fields.Nested(TitulusSchema())
    authorship = fields.Float()


class OpusBookCoverageSchema(Schema):
    opus = fields.Nested(PlainOpusSchema())
    coverage = fields.Float()


class JuristStatsBookSchema(Schema):
    tituli = fields.List(fields.Nested(TitulusAuthorshipSchema()))
    book = fields.Nested(PlainBookSchema())
    author = fields.Nested(PlainAuthorSchema())
    opera = fields.List(fields.Nested(OpusBookCoverageSchema()))


class JuristStatsTitulusSchema(Schema):
    titulus = fields.Nested(TitulusAuthorshipSchema())
    author = fields.Nested(PlainAuthorSchema())
    opera = fields.List(fields.Nested(OpusBookCoverageSchema()))


class OpusAuthorCoverageSchema(OpusCoverageSchema):
    author = fields.Nested(PlainAuthorSchema())

class OpusBookCoverageBookSchema(Schema):
    book = fields.Nested(PlainBookSchema())
    coverage = fields.Float()

class OpusTitulusCoverageSchema(Schema):
    titulus = fields.Nested(PlainTitulusSchema())
    coverage = fields.Float()

class OpusBooksStatsSchema(Schema):
    books = fields.List(fields.Nested(OpusBookCoverageBookSchema()))
    opus = fields.Nested(OpusSchema())

class OpusBookStatsSchema(Schema):
    tituli = fields.List(fields.Nested(OpusTitulusCoverageSchema()))
    opus = fields.Nested(OpusSchema())
    book = fields.Nested(PlainBookSchema())