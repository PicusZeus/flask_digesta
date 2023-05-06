from app import create_app

app = create_app()
app.app_context().push()
from db import db
from models import AuthorModel, OpusModel, CommentModel, DigestaBookModel, DigestaLexModel, DigestaTitulusModel, DigestaParagraphusModel, OpusLibriModel
import pickle
from populate.resources import int_to_roman
from sqlalchemy.exc import IntegrityError
from .Data.jurists import jurists

from sqlalchemy import func
FILE_PICKLE_LIBER_1 = "populate/Data/digestaplikiend/d1.txt_extracted.pickle"
FILE_PICKLE_LIBER_2 = 'populate/Data/digestaplikiend/d2.txt_extracted.pickle'
FILE_PICKLE_LIBER_3 = 'populate/Data/digestaplikiend/d3.txt_extracted.pickle'
FILE_PICKLE_LIBER_4 = 'populate/Data/digestaplikiend/d4.txt_extracted.pickle'
FILE_PICKLE_LIBER_5 = 'populate/Data/digestaplikiend/d5.txt_extracted.pickle'
FILE_PICKLE_LIBER_6 = 'populate/Data/digestaplikiend/d6.txt_extracted.pickle'
FILE_PICKLE_LIBER_7 = 'populate/Data/digestaplikiend/d7.txt_extracted.pickle'
FILE_PICKLE_LIBER_8 = 'populate/Data/digestaplikiend/d8.txt_extracted.pickle'
FILE_PICKLE_LIBER_9 = 'populate/Data/digestaplikiend/d9.txt_extracted.pickle'
FILE_PICKLE_LIBER_10 = 'populate/Data/digestaplikiend/d10.txt_extracted.pickle'
FILE_PICKLE_LIBER_11 = 'populate/Data/digestaplikiend/d11.txt_extracted.pickle'
FILE_PICKLE_LIBER_12 = 'populate/Data/digestaplikiend/d12.txt_extracted.pickle'
FILE_PICKLE_LIBER_13 = 'populate/Data/digestaplikiend/d13.txt_extracted.pickle'
FILE_PICKLE_LIBER_14 = 'populate/Data/digestaplikiend/d14.txt_extracted.pickle'
FILE_PICKLE_LIBER_15 = 'populate/Data/digestaplikiend/d15.txt_extracted.pickle'
FILE_PICKLE_LIBER_16 = 'populate/Data/digestaplikiend/d16.txt_extracted.pickle'
FILE_PICKLE_LIBER_17 = 'populate/Data/digestaplikiend/d17.txt_extracted.pickle'
FILE_PICKLE_LIBER_18 = 'populate/Data/digestaplikiend/d18.txt_extracted.pickle'
FILE_PICKLE_LIBER_19 = 'populate/Data/digestaplikiend/d19.txt_extracted.pickle'
FILE_PICKLE_LIBER_20 = 'populate/Data/digestaplikiend/d20.txt_extracted.pickle'
FILE_PICKLE_LIBER_21 = 'populate/Data/digestaplikiend/d21.txt_extracted.pickle'
FILE_PICKLE_LIBER_22 = 'populate/Data/digestaplikiend/d22.txt_extracted.pickle'
def insert_books(lat, pl, nr):
    # lat = 'LIBER PRIMUS'
    # pl = "KSIĘGA PIERWSZA"
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
            print(titulus_nr, lex_nr, lex)
            opus_title_pl = lex['opus']['title_pl']
            opus_book_nr = lex['opus']['liber']

            opus = OpusModel(title_lat=opus_title_lat,
                             title_pl=opus_title_pl,
                             # book=opus_book_nr,
                             author_id=author_id)
            db.session.add(opus)
            try:
                db.session.commit()
            except IntegrityError:
                print('opus Integrity error')
                db.session.rollback()

def insert_opera_books(file_name):
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

            opus = OpusModel.query.filter(OpusModel.title_lat == opus_title_lat, OpusModel.author_id == author_id).one()

            opus_liber = OpusLibriModel(opus_id=opus.id, liber=opus_book_nr)
            db.session.add(opus_liber)
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
            liber = lex['opus']['liber']
            opus = OpusModel.query.filter_by(title_lat=lex['opus']['title_lat'], author_id=author_id).one()
            opus_id = opus.id
            opus_liber = OpusLibriModel.query.filter(OpusLibriModel.opus_id == opus_id, OpusLibriModel.liber == liber).one()

            lex = DigestaLexModel(address_lat=address_lat,
                                  address_pl=address_pl,
                                  # text_lat=text_lat,
                                  # text_pl=text_pl,
                                  lex_nr=lex_nr,
                                  titulus_id=titulus_id,
                                  author_id=author_id,
                                  opus_id=opus_liber.id)

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
                print(book_data[titulus_nr]['leges'][lex_nr]['content_lat'])
                print(book_data[titulus_nr]['leges'][lex_nr]['content_pl'])
                content_pl = book_data[titulus_nr]['leges'][lex_nr]['content_pl'][paragraph_nr]
                print(content_pl)
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


def insert_digesta_book(liber, ksiega, number, file_name):
    insert_books(lat=liber, pl=ksiega, nr=number)
    insert_tituli(liber, file_name)
    insert_authors(file_name)
    insert_opera(file_name)
    insert_opera_books(file_name)
    insert_leges(file_name, liber)
    insert_paragraphi(file_name, liber)

if __name__ == "__main__":

    # insert_digesta_book(liber="LIBER PRIMUS", ksiega="KSIĘGA PIERWSZA", number=1, file_name=FILE_PICKLE_LIBER_1)
    # addBio(jurists)
    # insert_digesta_book(liber="LIBER SECUNDUS", ksiega="KSIĘGA DRUGA", number=2, file_name=FILE_PICKLE_LIBER_2)

    # insert_digesta_book(liber="LIBER TERTIUS", ksiega="KSIĘGA TRZECIA", number=3, file_name=FILE_PICKLE_LIBER_3)
    # insert_digesta_book(liber="LIBER QUARTUS", ksiega="KSIĘGA CZWARTA", number=4, file_name=FILE_PICKLE_LIBER_4)
    #
    # insert_digesta_book(liber="LIBER QUINTUS", ksiega="KSIĘGA PIĄTA", number=5, file_name=FILE_PICKLE_LIBER_5)
    # insert_digesta_book(liber="LIBER SEXTUS", ksiega="KSIĘGA SZÓSTA", number=6, file_name=FILE_PICKLE_LIBER_6)
    # insert_digesta_book(liber="LIBER SEPTIMUS", ksiega="KSIĘGA SIÓDMA", number=7, file_name=FILE_PICKLE_LIBER_7)
    # insert_digesta_book(liber="LIBER OCTAVUS", ksiega="KSIĘGA ÓSMA", number=8, file_name=FILE_PICKLE_LIBER_8)
    # insert_digesta_book(liber="LIBER NONUS", ksiega="KSIĘGA DZIEWIĄTA", number=9, file_name=FILE_PICKLE_LIBER_9)
    # insert_digesta_book(liber="LIBER DECIMUS", ksiega="KSIĘGA DZIESIĄTA", number=10, file_name=FILE_PICKLE_LIBER_10)
    # insert_digesta_book(liber="LIBER UNDECIMUS", ksiega="KSIĘGA JEDENASTA", number=11, file_name=FILE_PICKLE_LIBER_11)
    # insert_digesta_book(liber="LIBER DUODECIMUS", ksiega="KSIĘGA DWUNASTA", number=12, file_name=FILE_PICKLE_LIBER_12)
    # insert_digesta_book(liber="LIBER TRITUS DECIMUS", ksiega="KSIĘGA TRZYNASTA", number=13, file_name=FILE_PICKLE_LIBER_13)

    # insert_digesta_book(liber="LIBER QUARTUS DECIMUS", ksiega="KSIĘGA CZTERNASTA", number=14, file_name=FILE_PICKLE_LIBER_14)
    # insert_digesta_book(liber="LIBER QUINTUS DECIMUS", ksiega="KSIĘGA PIĘTNASTA", number=15, file_name=FILE_PICKLE_LIBER_15)
    # insert_digesta_book(liber="LIBER SEXTUS DECIMUS", ksiega="KSIĘGA SZESNASTA", number=16, file_name=FILE_PICKLE_LIBER_16)
    # insert_digesta_book(liber="LIBER SEPTIMUS DECIMUS", ksiega="KSIĘGA SIEDEMNASTA", number=17, file_name=FILE_PICKLE_LIBER_17)
    # insert_digesta_book(liber="LIBER OCTAVUS DECIMUS", ksiega="KSIĘGA OSIEMNASTA", number=18, file_name=FILE_PICKLE_LIBER_18)
    # insert_digesta_book(liber="LIBER NONUS DECIMUS", ksiega="KSIĘGA DZIEWIĘTNASTA", number=19, file_name=FILE_PICKLE_LIBER_19)
    # insert_digesta_book(liber="LIBER VICESIMUS", ksiega="KSIĘGA DWUDZIESTA", number=20, file_name=FILE_PICKLE_LIBER_20)
    # insert_digesta_book(liber="LIBER VICESIMUS PRIMUS", ksiega="KSIĘGA DWUDZIESTA PIERWSZA", number=21, file_name=FILE_PICKLE_LIBER_21)
    insert_digesta_book(liber="LIBER VICESIMUS SECUNDUS", ksiega="KSIĘGA DWUDZIESTA DRUGA", number=22, file_name=FILE_PICKLE_LIBER_22)








