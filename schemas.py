from marshmallow import Schema, fields


class PlainDigestaBookSchema(Schema):
    id = fields.Int(dump_only=True)
    book_latin_name = fields.Str(dump_only=True)
    book_polish_name = fields.Str(dump_only=True)


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


class DigestaBookSchema(PlainDigestaBookSchema):
    tituli = fields.List(fields.Nested(PlainDigestaTitulusSchema()), dump_only=True)


class DigestaTitulusSchema(PlainDigestaTitulusSchema):
    book = fields.Nested(PlainDigestaBookSchema())
    leges = fields.List(fields.Nested(PlainDigestaLexSchema()))


class DigestaLexSchema(PlainDigestaLexSchema):
    titulus = fields.Nested(PlainDigestaTitulusSchema())
    author = fields.Nested(PlainAuthorSchema())
    opus = fields.Nested(PlainOperaSchema())


class OperaSchema(PlainOperaSchema):
    leges = fields.List(fields.Nested(PlainDigestaLexSchema()))
    author = fields.Nested(PlainAuthorSchema())


class AuthorSchema(PlainAuthorSchema):
    leges = fields.List(fields.Nested(PlainDigestaLexSchema()))
    opera = fields.List(fields.Nested(PlainOperaSchema()))
