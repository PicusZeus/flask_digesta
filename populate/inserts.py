from app import create_app
from populate.juristDoublets import doublets_authors
app = create_app()
app.app_context().push()
from db import db
from models import AuthorModel, OpusModel, CommentModel, DigestaBookModel, BookAuthorshipModel, DigestaLexModel, \
    DigestaTitulusModel, DigestaParagraphusModel, OpusLibriModel, TitulusAuthorshipModel, OpusTitulusCoverageModel, \
    OpusBookCoverageModel
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
FILE_PICKLE_LIBER_23 = 'populate/Data/digestaplikiend/d23.txt_extracted.pickle'
FILE_PICKLE_LIBER_24 = 'populate/Data/digestaplikiend/d24.txt_extracted.pickle'
FILE_PICKLE_LIBER_25 = 'populate/Data/digestaplikiend/d25.txt_extracted.pickle'
FILE_PICKLE_LIBER_26 = 'populate/Data/digestaplikiend/d26.txt_extracted.pickle'
FILE_PICKLE_LIBER_27 = 'populate/Data/digestaplikiend/d27.txt_extracted.pickle'
FILE_PICKLE_LIBER_28 = 'populate/Data/digestaplikiend/d28.txt_extracted.pickle'
FILE_PICKLE_LIBER_29 = 'populate/Data/digestaplikiend/d29.txt_extracted.pickle'
FILE_PICKLE_LIBER_30 = 'populate/Data/digestaplikiend/d30.txt_extracted.pickle'
FILE_PICKLE_LIBER_31 = 'populate/Data/digestaplikiend/d31.txt_extracted.pickle'
FILE_PICKLE_LIBER_32 = 'populate/Data/digestaplikiend/d32.txt_extracted.pickle'
FILE_PICKLE_LIBER_33 = 'populate/Data/digestaplikiend/d33.txt_extracted.pickle'
FILE_PICKLE_LIBER_34 = 'populate/Data/digestaplikiend/d34.txt_extracted.pickle'
FILE_PICKLE_LIBER_35 = 'populate/Data/digestaplikiend/d35.txt_extracted.pickle'
FILE_PICKLE_LIBER_36 = 'populate/Data/digestaplikiend/d36.txt_extracted.pickle'
FILE_PICKLE_LIBER_37 = 'populate/Data/digestaplikiend/d37.txt_extracted.pickle'
FILE_PICKLE_LIBER_38 = 'populate/Data/digestaplikiend/d38.txt_extracted.pickle'
FILE_PICKLE_LIBER_39 = 'populate/Data/digestaplikiend/d39.txt_extracted.pickle'
FILE_PICKLE_LIBER_40 = 'populate/Data/digestaplikiend/d40.txt_extracted.pickle'
FILE_PICKLE_LIBER_41 = 'populate/Data/digestaplikiend/d41.txt_extracted.pickle'
FILE_PICKLE_LIBER_42 = 'populate/Data/digestaplikiend/d42.txt_extracted.pickle'
FILE_PICKLE_LIBER_43 = 'populate/Data/digestaplikiend/d43.txt_extracted.pickle'
FILE_PICKLE_LIBER_44 = 'populate/Data/digestaplikiend/d44.txt_extracted.pickle'
FILE_PICKLE_LIBER_45 = 'populate/Data/digestaplikiend/d45.txt_extracted.pickle'
FILE_PICKLE_LIBER_46 = 'populate/Data/digestaplikiend/d46.txt_extracted.pickle'
FILE_PICKLE_LIBER_47 = 'populate/Data/digestaplikiend/d47.txt_extracted.pickle'
FILE_PICKLE_LIBER_48 = 'populate/Data/digestaplikiend/d48.txt_extracted.pickle'
FILE_PICKLE_LIBER_49 = 'populate/Data/digestaplikiend/d49.txt_extracted.pickle'
FILE_PICKLE_LIBER_50 = 'populate/Data/digestaplikiend/d50.txt_extracted.pickle'


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
        print(book_data[title_nr]['title_lat'])
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
            if author_name in doublets_authors:
                author_name = doublets_authors[author_name]
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
            if jurist_name in doublets_authors:
                jurist_name = doublets_authors[jurist_name]
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
            opus_liber = OpusLibriModel.query.filter(OpusLibriModel.opus_id == opus_id,
                                                     OpusLibriModel.liber == liber).one()

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
                paragraph = DigestaParagraphusModel(key=paragraph_nr, text_lat=content_lat, text_pl=content_pl,
                                                    lex_id=lex.id)

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


def authorship():
    all_digesta = sum([len(x.text_lat) for x in DigestaParagraphusModel.query.all()])
    authors = AuthorModel.query.all()
    for author in authors:
        all_for_author = sum([sum([len(p.text_lat) for p in lex.paragraphi]) for lex in author.leges])
        print(author.name, round((all_for_author / all_digesta) * 100, 4))
        author.authorship = round((all_for_author / all_digesta) * 100, 4)
        db.session.commit()


def book_authorship():
    for book in DigestaBookModel.query.all():
        all_paragraphi = DigestaParagraphusModel.query \
            .join(DigestaLexModel, DigestaLexModel.id == DigestaParagraphusModel.lex_id) \
            .join(DigestaTitulusModel, DigestaTitulusModel.id == DigestaLexModel.titulus_id) \
            .filter(DigestaTitulusModel.book_id == book.id).all()
        book_text = sum([len(p.text_lat) for p in all_paragraphi])
        for author in AuthorModel.query.all():
            print(author.name)
            all_paragraphi_book_author = DigestaParagraphusModel.query \
                .join(DigestaLexModel, DigestaParagraphusModel.lex_id == DigestaLexModel.id) \
                .join(DigestaTitulusModel, DigestaTitulusModel.id == DigestaLexModel.titulus_id) \
                .filter(DigestaTitulusModel.book_id == book.id, DigestaLexModel.author_id == author.id).all()
            author_text_for_book = sum([len(p.text_lat) for p in all_paragraphi_book_author])
            if author_text_for_book:
                authorship = BookAuthorshipModel(author_id=author.id, book_id=book.id,
                                                 authorship=round((author_text_for_book / book_text) * 100, 4))
                try:
                    db.session.add(authorship)
                    db.session.commit()
                except:
                    db.session.rollback()
                    print('in')


def tituli_authorship():
    for book in DigestaBookModel.query.all():
        for titulus in book.tituli:
            print(titulus.title_lat, titulus.book.book_nr)
            all_paragraphi = DigestaParagraphusModel.query \
                .join(DigestaLexModel, DigestaLexModel.id == DigestaParagraphusModel.lex_id) \
                .filter(DigestaLexModel.titulus_id == titulus.id).all()
            titulus_text = sum([len(p.text_lat) for p in all_paragraphi])
            print(titulus_text)

            for author in AuthorModel.query.all():
                print(author.name)
                all_paragraphi_titulus_author = DigestaParagraphusModel.query \
                    .join(DigestaLexModel, DigestaLexModel.id == DigestaParagraphusModel.lex_id) \
                    .filter(DigestaLexModel.titulus_id == titulus.id).filter(
                    DigestaLexModel.author_id == author.id).all()

                author_text_for_titulus = sum([len(p.text_lat) for p in all_paragraphi_titulus_author])
                if author_text_for_titulus:
                    print(author_text_for_titulus)

                    tit_authorship = TitulusAuthorshipModel(author_id=author.id,
                                                            titulus_id=titulus.id,
                                                            authorship=round(
                                                                (author_text_for_titulus / titulus_text) * 100,
                                                                4))
                    try:
                        db.session.add(tit_authorship)
                        db.session.commit()
                    except:
                        db.session.rollback()
                        print('in')


def coverage():
    all_digesta = sum([len(x.text_lat) for x in DigestaParagraphusModel.query.all()])

    for opus in OpusModel.query.all():
        all_paragraphi = DigestaParagraphusModel.query \
            .join(DigestaLexModel, DigestaLexModel.id == DigestaParagraphusModel.lex_id) \
            .join(OpusLibriModel, OpusLibriModel.id == DigestaLexModel.opus_id) \
            .filter(OpusLibriModel.opus_id == opus.id).all()
        opus_text = sum([len(p.text_lat) for p in all_paragraphi])

        percentage = round((opus_text / all_digesta) * 100, 4)
        opus.coverage = percentage
        print(opus.title_lat, percentage)
        db.session.commit()


def book_coverage():
    for book in DigestaBookModel.query.all():
        all_paragraphi = DigestaParagraphusModel.query \
            .join(DigestaLexModel, DigestaLexModel.id == DigestaParagraphusModel.lex_id) \
            .join(DigestaTitulusModel, DigestaTitulusModel.id == DigestaLexModel.titulus_id) \
            .filter(DigestaTitulusModel.book_id == book.id).all()
        book_text = sum([len(p.text_lat) for p in all_paragraphi])

        for opus in OpusModel.query.all():
            all_paragraphi_book_opus = DigestaParagraphusModel.query \
                .join(DigestaLexModel, DigestaLexModel.id == DigestaParagraphusModel.lex_id) \
                .join(OpusLibriModel, OpusLibriModel.id == DigestaLexModel.opus_id) \
                .join(DigestaTitulusModel, DigestaTitulusModel.id == DigestaLexModel.titulus_id) \
                .filter(DigestaTitulusModel.book_id == book.id, opus.id == OpusLibriModel.opus_id).all()
            book_opus_text = sum([len(p.text_lat) for p in all_paragraphi_book_opus])
            if book_opus_text:
                percentage = round((book_opus_text / book_text) * 100, 4)
                print(book.book_latin_name, opus.title_lat, percentage)
                book_coverage = OpusBookCoverageModel(opus_id=opus.id, book_id=book.id, coverage=percentage)
                try:
                    db.session.add(book_coverage)
                    db.session.commit()
                except:
                    db.session.rollback()
                    print("in")


def titulus_coverage():
    for titulus in DigestaTitulusModel.query.all():
        all_paragraphi_tituli = DigestaParagraphusModel.query \
            .join(DigestaLexModel, DigestaLexModel.id == DigestaParagraphusModel.lex_id) \
            .filter(DigestaLexModel.titulus_id == titulus.id).all()
        titulus_text = sum([len(p.text_lat) for p in all_paragraphi_tituli])
        for opus in OpusModel.query.all():
            all_paragraphi_tituli_opus = DigestaParagraphusModel.query \
                .join(DigestaLexModel, DigestaLexModel.id == DigestaParagraphusModel.lex_id) \
                .join(OpusLibriModel, OpusLibriModel.id == DigestaLexModel.opus_id) \
                .filter(OpusLibriModel.opus_id == opus.id, DigestaLexModel.titulus_id == titulus.id).all()
            titulus_opus_text = sum([len(p.text_lat) for p in all_paragraphi_tituli_opus])
            if titulus_opus_text:
                percentage = round((titulus_opus_text / titulus_text) * 100, 4)
                print(titulus.title_lat, opus.title_lat, percentage)

                titulus_coverage_m = OpusTitulusCoverageModel(opus_id=opus.id, titulus_id=titulus.id,
                                                              coverage=percentage)
                try:
                    db.session.add(titulus_coverage_m)
                    db.session.commit()
                except:
                    db.session.rollback()
                    print('in')


def boook_and_tituli_share():
    all_digesta = sum([len(x.text_lat) for x in DigestaParagraphusModel.query.all()])

    for book in DigestaBookModel.query.all():
        book_paragraphs = DigestaParagraphusModel.query \
            .join(DigestaLexModel, DigestaLexModel.id == DigestaParagraphusModel.lex_id) \
            .join(DigestaTitulusModel, DigestaTitulusModel.id == DigestaLexModel.titulus_id) \
            .filter(DigestaTitulusModel.book_id == book.id).all()
        book_text = sum([len(p.text_lat) for p in book_paragraphs])

        percentage = round((book_text / all_digesta) * 100, 4)
        print(all_digesta, book_text, percentage)
        book.share = percentage
        db.session.commit()

        for titulus in DigestaTitulusModel.query.filter(DigestaTitulusModel.book_id==book.id).all():
            titulus_paragraphs = DigestaParagraphusModel.query\
                .join(DigestaLexModel, DigestaLexModel.id == DigestaParagraphusModel.lex_id)\
                .filter(DigestaLexModel.titulus_id == titulus.id).all()
            titulus_text = sum([len(p.text_lat) for p in titulus_paragraphs])
            percentage = round((titulus_text / all_digesta) * 100, 4)
            percentage_book = round((titulus_text / book_text) * 100, 4)
            titulus.share = percentage
            titulus.book_share = percentage_book
            print(percentage_book, titulus.title_lat)
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
    #
    # insert_digesta_book(liber="LIBER TERTIUS", ksiega="KSIĘGA TRZECIA", number=3, file_name=FILE_PICKLE_LIBER_3)
    # insert_digesta_book(liber="LIBER QUARTUS", ksiega="KSIĘGA CZWARTA", number=4, file_name=FILE_PICKLE_LIBER_4)

    # insert_digesta_book(liber="LIBER QUINTUS", ksiega="KSIĘGA PIĄTA", number=5, file_name=FILE_PICKLE_LIBER_5)
    # insert_digesta_book(liber="LIBER SEXTUS", ksiega="KSIĘGA SZÓSTA", number=6, file_name=FILE_PICKLE_LIBER_6)
    # insert_digesta_book(liber="LIBER SEPTIMUS", ksiega="KSIĘGA SIÓDMA", number=7, file_name=FILE_PICKLE_LIBER_7)
    # insert_digesta_book(liber="LIBER OCTAVUS", ksiega="KSIĘGA ÓSMA", number=8, file_name=FILE_PICKLE_LIBER_8)
    # insert_digesta_book(liber="LIBER NONUS", ksiega="KSIĘGA DZIEWIĄTA", number=9, file_name=FILE_PICKLE_LIBER_9)
    # insert_digesta_book(liber="LIBER DECIMUS", ksiega="KSIĘGA DZIESIĄTA", number=10, file_name=FILE_PICKLE_LIBER_10)
    # insert_digesta_book(liber="LIBER UNDECIMUS", ksiega="KSIĘGA JEDENASTA", number=11, file_name=FILE_PICKLE_LIBER_11)
    # insert_digesta_book(liber="LIBER DUODECIMUS", ksiega="KSIĘGA DWUNASTA", number=12, file_name=FILE_PICKLE_LIBER_12)
    # insert_digesta_book(liber="LIBER TERTIUS DECIMUS", ksiega="KSIĘGA TRZYNASTA", number=13, file_name=FILE_PICKLE_LIBER_13)
    #
    # insert_digesta_book(liber="LIBER QUARTUS DECIMUS", ksiega="KSIĘGA CZTERNASTA", number=14, file_name=FILE_PICKLE_LIBER_14)
    # insert_digesta_book(liber="LIBER QUINTUS DECIMUS", ksiega="KSIĘGA PIĘTNASTA", number=15, file_name=FILE_PICKLE_LIBER_15)
    # insert_digesta_book(liber="LIBER SEXTUS DECIMUS", ksiega="KSIĘGA SZESNASTA", number=16, file_name=FILE_PICKLE_LIBER_16)
    # insert_digesta_book(liber="LIBER SEPTIMUS DECIMUS", ksiega="KSIĘGA SIEDEMNASTA", number=17, file_name=FILE_PICKLE_LIBER_17)
    # insert_digesta_book(liber="LIBER OCTAVUS DECIMUS", ksiega="KSIĘGA OSIEMNASTA", number=18, file_name=FILE_PICKLE_LIBER_18)
    # insert_digesta_book(liber="LIBER NONUS DECIMUS", ksiega="KSIĘGA DZIEWIĘTNASTA", number=19, file_name=FILE_PICKLE_LIBER_19)
    # insert_digesta_book(liber="LIBER VICESIMUS", ksiega="KSIĘGA DWUDZIESTA", number=20, file_name=FILE_PICKLE_LIBER_20)
    # insert_digesta_book(liber="LIBER VICESIMUS PRIMUS", ksiega="KSIĘGA DWUDZIESTA PIERWSZA", number=21, file_name=FILE_PICKLE_LIBER_21)
    # insert_digesta_book(liber="LIBER VICESIMUS SECUNDUS", ksiega="KSIĘGA DWUDZIESTA DRUGA", number=22, file_name=FILE_PICKLE_LIBER_22)
    # insert_digesta_book(liber="LIBER VICESIMUS TERTIUS", ksiega="KSIĘGA DWUDZIESTA TRZECIA", number=23, file_name=FILE_PICKLE_LIBER_23)
    # insert_digesta_book(liber="LIBER VICESIMUS QUARTUS", ksiega="KSIĘGA DWUDZIESTA CZWARTA", number=24, file_name=FILE_PICKLE_LIBER_24)
    # insert_digesta_book(liber="LIBER VICESIMUS QUINTUS", ksiega="KSIĘGA DWUDZIESTA PIĄTA", number=25, file_name=FILE_PICKLE_LIBER_25)
    # insert_digesta_book(liber="LIBER VICESIMUS SEXTUS", ksiega="KSIĘGA DWUDZIESTA SZÓSTA", number=26, file_name=FILE_PICKLE_LIBER_26)
    # insert_digesta_book(liber="LIBER VICESIMUS SEPTIMUS", ksiega="KSIĘGA DWUDZIESTA SIÓDMA", number=27, file_name=FILE_PICKLE_LIBER_27)
    # insert_digesta_book(liber="LIBER VICESIMUS OCTAVUS", ksiega="KSIĘGA DWUDZIESTA ÓSMA", number=28, file_name=FILE_PICKLE_LIBER_28)
    # insert_digesta_book(liber="LIBER VICESIMUS ENATUS", ksiega="KSIĘGA DWUDZIESTA DZIEWIĄTA", number=29, file_name=FILE_PICKLE_LIBER_29)
    # insert_digesta_book(liber="LIBER TRIGESIMUS", ksiega="KSIĘGA TRZYDZIESTA", number=30, file_name=FILE_PICKLE_LIBER_30)
    # insert_digesta_book(liber="LIBER TRIGESIMUS PRIMUS", ksiega="KSIĘGA TRZYDZIESTA PIERWSZA", number=31, file_name=FILE_PICKLE_LIBER_31)
    # insert_digesta_book(liber="LIBER TRIGESIMUS SECUNDUS", ksiega="KSIĘGA TRZYDZIESTA DRUGA", number=32, file_name=FILE_PICKLE_LIBER_32)
    # insert_digesta_book(liber="LIBER TRIGESIMUS TERTIUS", ksiega="KSIĘGA TRZYDZIESTA TRZECIA", number=33, file_name=FILE_PICKLE_LIBER_33)
    # insert_digesta_book(liber="LIBER TRIGESIMUS QUARTUS", ksiega="KSIĘGA TRZYDZIESTA CZWARTA", number=34, file_name=FILE_PICKLE_LIBER_34)
    # insert_digesta_book(liber="LIBER TRIGESIMUS QUINTUS", ksiega="KSIĘGA TRZYDZIESTA PIĄTA", number=35, file_name=FILE_PICKLE_LIBER_35)
    # insert_digesta_book(liber="LIBER TRIGESIMUS SEXTUS", ksiega="KSIĘGA TRZYDZIESTA SZÓSTA", number=36, file_name=FILE_PICKLE_LIBER_36)
    # insert_digesta_book(liber="LIBER TRIGESIMUS SEPTIMUS", ksiega="KSIĘGA TRZYDZIESTA SIÓDMA", number=37, file_name=FILE_PICKLE_LIBER_37)
    # insert_digesta_book(liber="LIBER TRIGESIMUS OCTAVUS", ksiega="KSIĘGA TRZYDZIESTA ÓSMA", number=38, file_name=FILE_PICKLE_LIBER_38)
    # insert_digesta_book(liber="LIBER TRIGESIMUS ENATUS", ksiega="KSIĘGA TRZYDZIESTA DZIEWIĄTA", number=39, file_name=FILE_PICKLE_LIBER_39)
    # insert_digesta_book(liber="LIBER QUADRAGESIMUS", ksiega="KSIĘGA CZTERDZIESTA", number=40, file_name=FILE_PICKLE_LIBER_40)
    # insert_digesta_book(liber="LIBER QUADRAGESIMUS PRIMUS", ksiega="KSIĘGA CZTERDZIESTA PIERWSZA", number=41, file_name=FILE_PICKLE_LIBER_41)
    # insert_digesta_book(liber="LIBER QUADRAGESIMUS SECUNDUS", ksiega="KSIĘGA CZTERDZIESTA DRUGA", number=42, file_name=FILE_PICKLE_LIBER_42)
    # insert_digesta_book(liber="LIBER QUADRAGESIMUS TERTIUS", ksiega="KSIĘGA CZTERDZIESTA TRZECIA", number=43, file_name=FILE_PICKLE_LIBER_43)
    #
    # insert_digesta_book(liber="LIBER QUADRAGESIMUS QUARTUS", ksiega="KSIĘGA CZTERDZIESTA CZWARTA", number=44, file_name=FILE_PICKLE_LIBER_44)
    # insert_digesta_book(liber="LIBER QUADRAGESIMUS QUINTUS", ksiega="KSIĘGA CZTERDZIESTA PIĄTA", number=45, file_name=FILE_PICKLE_LIBER_45)
    # insert_digesta_book(liber="LIBER QUADRAGESIMUS SEXTUS", ksiega="KSIĘGA CZTERDZIESTA SZÓSTA", number=46, file_name=FILE_PICKLE_LIBER_46)
    # insert_digesta_book(liber="LIBER QUADRAGESIMUS SEPTIMUS", ksiega="KSIĘGA CZTERDZIESTA SIÓDMA", number=47, file_name=FILE_PICKLE_LIBER_47)
    # insert_digesta_book(liber="LIBER QUADRAGESIMUS OCTAVUS", ksiega="KSIĘGA CZTERDZIESTA ÓSMA", number=48, file_name=FILE_PICKLE_LIBER_48)
    # insert_digesta_book(liber="LIBER QUADRAGESIMUS ENATUS", ksiega="KSIĘGA CZTERDZIESTA DZIEWIĄTA", number=49, file_name=FILE_PICKLE_LIBER_49)
    # insert_digesta_book(liber="LIBER QUINQUAGESIMUS", ksiega="KSIĘGA PIĘĆDZIESIĄTA", number=50, file_name=FILE_PICKLE_LIBER_50)
    # book38 = DigestaBookModel.query.filter_by(book_nr=38).first()
    # db.session.delete(book38)
    # db.session.commit()
    # insert_digesta_book(liber="LIBER TRIGESIMUS OCTAVUS", ksiega="KSIĘGA TRZYDZIESTA ÓSMA", number=38, file_name=FILE_PICKLE_LIBER_38)

    # par13535 = DigestaParagraphusModel.query.filter_by(id=13536).first()
    # par13537 = DigestaParagraphusModel.query.filter_by(id=13537).first()
    #
    # db.session.delete(par13535)
    # db.session.delete(par13537)
    # db.session.commit()
    # insert_digesta_book(liber="LIBER TRIGESIMUS OCTAVUS", ksiega="KSIĘGA TRZYDZIESTA ÓSMA", number=38, file_name=FILE_PICKLE_LIBER_38)
    #
    # Ulpian = AuthorModel.query.filter(AuthorModel.name == "PAULUS").first()
    # text = 0
    # for l in Ulpian.leges:
    #     for p in l.paragraphi:
    #         text += len(p.text_lat)
    # whole = sum([len(x.text_lat) for x in DigestaParagraphusModel.query.all()])
    #
    #
    #
    # print(text)
    # print(text / whole)

    # print(author.name)
    # print(round((author_text_for_book / book_text) * 100, 4))

    # authorship()

    # book_coverage()
    # titulus_coverage()
    # tituli_authorship()
    # book_coverage()
    tituli_l = len(DigestaTitulusModel.query.all())
    leges_l = len(DigestaLexModel.query.all())
    paragraphi_l = len(DigestaParagraphusModel.query.all())
    jurists_l = len(AuthorModel.query.all())
    opera = len(OpusModel.query.all())
    znaki = sum([len(p.text_lat) for p in DigestaParagraphusModel.query.all()])
    verba = sum([len(p.text_lat.split(' ')) for p in DigestaParagraphusModel.query.all()])
    print(tituli_l, leges_l, paragraphi_l, jurists_l, opera, znaki, verba)