from marshmallow import Schema, fields


class PlainDigestaSchema(Schema):
    id = fields.Int(dump_only=True)
    book = fields.Str(dump_only=True)
    section = fields.Str(dump_only=True)
    paragraph = fields.Str(dump_only=True)
    language = fields.Str(dump_only=True)
    text = fields.Str(dump_only=True)


class PlainAuthorSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(dump_only=True)
    description = fields.Str(dump_only=True)
    flourished_start = fields.Int(dump_only=True)
    flourished_end = fields.Int(dump_only=True)


class DigestaSchema(PlainDigestaSchema):
    author_id = fields.Int(required=True, load_only=True)
    author = fields.Nested(PlainAuthorSchema(), dump_only=True)


class AuthorSchema(PlainAuthorSchema):
    digesta = fields.List(fields.Nested(PlainDigestaSchema()), dump_only=True)
