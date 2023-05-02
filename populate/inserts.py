from app import create_app

app = create_app()
app.app_context().push()
from db import db
from models import AuthorModel, OperaModel, CommentModel, DigestaBookModel, DigestaLexModel, DigestaTitulusModel, DigestaParagraphusModel
import pickle
from populate.resources import int_to_roman
from sqlalchemy.exc import IntegrityError
from .Data.jurists import jurists

from sqlalchemy import func
FILE_PICKLE_LIBER_1 = "populate/Data/digestaplikiend/d1.txt_extracted.pickle"




def insert_books(lat, pl, nr):
    lat = 'LIBER PRIMUS'
    pl = "KSIĘGA PIERWSZA"
    liber = DigestaBookModel(book_latin_name=lat, book_polish_name=pl, book_nr=nr)
    db.session.add(liber)
    try:
        db.session.commit()
    except IntegrityError:
        print('integrity error')
        db.session.rollback()


def insert_tituli(book, file_name):
    liber = DigestaBookModel.query.filter_by(book_latin_name=book).one()
    liber_id = liber.id
    with open(file_name, 'rb') as file:
        book_data = pickle.load(file)

    for title_nr in book_data:
        title_lat = book_data[title_nr]['title_lat']
        title_pl = book_data[title_nr]['title_pl']
        titulus = DigestaTitulusModel(number=title_nr,
                                      title_lat=title_lat,
                                      title_pl=title_pl,
                                      book_id=liber_id)
        db.session.add(titulus)
        try:
            db.session.commit()
        except IntegrityError:
            print('integrity error')
            db.session.rollback()


def insert_authors(file_name):
    with open(file_name, 'rb') as file:
        book_data = pickle.load(file)
    description = 'add description'
    flourished_start = 0
    flourished_end = 0
    for titulus_nr in book_data:
        for lex_nr in book_data[titulus_nr]['leges']:
            author_name = book_data[titulus_nr]['leges'][lex_nr]['jurist']
            author = AuthorModel(name=author_name, description=description, flourished_start=flourished_start,
                                 flourished_end=flourished_end)
            db.session.add(author)
            try:
                db.session.commit()
            except IntegrityError:
                print('integrity error')
                db.session.rollback()


def insert_opera(file_name):
    with open(file_name, 'rb') as file:
        book_data = pickle.load(file)

    for titulus_nr in book_data:
        for lex_nr in book_data[titulus_nr]['leges']:
            lex = book_data[titulus_nr]['leges'][lex_nr]
            opus_title_lat = lex['opus']['title_lat']
            jurist_name = lex['jurist']
            author = AuthorModel.query.filter_by(name=jurist_name).one()
            author_id = author.id
            opus_title_pl = lex['opus']['title_pl']
            opus_book_nr = lex['opus']['liber']

            opus = OperaModel(title_lat=opus_title_lat,
                              title_pl=opus_title_pl,
                              book=opus_book_nr,
                              author_id=author_id)
            db.session.add(opus)
            try:
                db.session.commit()
            except IntegrityError:
                print('opus Integrity error')
                db.session.rollback()


def insert_leges(file_name, book):
    liber = DigestaBookModel.query.filter_by(book_latin_name=book).one()
    liber_id = liber.id
    with open(file_name, 'rb') as file:
        book_data = pickle.load(file)

    for titulus_nr in book_data:
        titulus = DigestaTitulusModel.query.filter_by(number=titulus_nr, book_id=liber_id).one()
        titulus_id = titulus.id
        for lex_nr in book_data[titulus_nr]['leges']:
            lex = book_data[titulus_nr]['leges'][lex_nr]
            address_lat = lex["address_lat"]
            address_pl = lex["address_pl"]
            # text_lat = lex["content_lat"]
            # text_pl = lex["content_pl"]
            author = AuthorModel.query.filter_by(name=lex['jurist']).one()
            author_id = author.id

            opus = OperaModel.query.filter_by(title_lat=lex['opus']['title_lat'],
                                              author_id=author_id,
                                              book=lex['opus']['liber']).one()
            opus_id = opus.id

            lex = DigestaLexModel(address_lat=address_lat,
                                  address_pl=address_pl,
                                  # text_lat=text_lat,
                                  # text_pl=text_pl,
                                  lex_nr=lex_nr,
                                  titulus_id=titulus_id,
                                  author_id=author_id,
                                  opus_id=opus_id,)

            db.session.add(lex)
            try:
                db.session.commit()
            except IntegrityError:
                print('lex integrity error')
                db.session.rollback()


def insert_paragraphi(file_name, book):
    liber = DigestaBookModel.query.filter_by(book_latin_name=book).one()
    liber_id = liber.id
    with open(file_name, 'rb') as file:
        book_data = pickle.load(file)

    for titulus_nr in book_data:
        titulus = DigestaTitulusModel.query.filter_by(number=titulus_nr, book_id=liber_id).one()
        titulus_id = titulus.id
        for lex_nr in book_data[titulus_nr]['leges']:

            lex = DigestaLexModel.query.filter(DigestaLexModel.lex_nr == lex_nr,
                                               DigestaLexModel.titulus_id == titulus_id).first()

            for paragraph_nr, content_lat in book_data[titulus_nr]['leges'][lex_nr]['content_lat'].items():
                # print(content_lat, paragraph_nr, book_data[titulus_nr]['leges'][lex_nr]['content_pl'])
                content_pl = book_data[titulus_nr]['leges'][lex_nr]['content_pl'][paragraph_nr]

                paragraph = DigestaParagraphusModel(key=paragraph_nr, text_lat=content_lat, text_pl=content_pl, lex_id=lex.id)

                db.session.add(paragraph)
                try:
                    db.session.commit()
                except IntegrityError:
                    print('paragraph integrity error')
                    db.session.rollback()


            db.session.add(lex)
            try:
                db.session.commit()
            except IntegrityError:
                print('lex integrity error')
                db.session.rollback()


def addBio(jurists_bio):
    for jurist, data in jurists_bio.items():
        print(jurist, data)
        jur = AuthorModel.query.filter(func.lower(AuthorModel.name) == func.lower(jurist)).all()[0]
        if not jur:
            raise Exception
        else:
            print(jur.name)
            jur.description = data["bio"]
            jur.flourished_start = data["start"]
            jur.flourished_end = data["end"]

            db.session.commit()



if __name__ == "__main__":
    # insert_books(lat='LIBER PRIMUS', pl="KSIĘGA PIERWSZA", nr=1)
    # insert_tituli("LIBER PRIMUS", "populate/Data/digestaplikiend/d1.txt_extracted.pickle")
    # insert_authors(FILE_PICKLE_LIBER_1)
    # insert_opera(FILE_PICKLE_LIBER_1)
    # insert_leges(FILE_PICKLE_LIBER_1, 'LIBER PRIMUS')
    # insert_paragraphi(FILE_PICKLE_LIBER_1, 'LIBER PRIMUS')
    addBio(jurists)



