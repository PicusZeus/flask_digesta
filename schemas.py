from marshmallow import Schema, fields


class PlainDigestaBookSchema(Schema):
    id = fields.Int(dump_only=True)
    book_latin_name = fields.Str(dump_only=True)
    book_polish_name = fields.Str(dump_only=True)


class PlainDigestaSectionSchema(Schema):
    id = fields.Int(dump_only=True)
    number = fields.Int(dump_only=True)
    title_lat = fields.Str()
    title_pl = fields.Str()


class PlainDigestaParagraphSchema(Schema):
    id = fields.Int(dump_only=True)
    text_lat = fields.Str()
    text_pl = fields.Str()


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
    sections = fields.List(fields.Nested(PlainDigestaSectionSchema()), dump_only=True)


class DigestaSectionSchema(PlainDigestaSectionSchema):
    book = fields.Nested(PlainDigestaBookSchema())


class DigestaParagraphSchema(PlainDigestaParagraphSchema):
    section = fields.Nested(PlainDigestaSectionSchema())
    author = fields.Nested(PlainAuthorSchema())
    opus = fields.Nested(PlainOperaSchema())


class OperaSchema(PlainOperaSchema):
    paragraph = fields.List(fields.Nested(PlainDigestaParagraphSchema()))
    author = fields.Nested(PlainAuthorSchema())


class AuthorSchema(PlainAuthorSchema):
    paragraphs = fields.List(fields.Nested(PlainDigestaParagraphSchema()))
    opera = fields.List(fields.Nested(PlainOperaSchema()))
