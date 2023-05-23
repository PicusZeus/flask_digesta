from resources import roman_num, roman_ordinal_numeral, rom_ord_num_to_num
import re
import pickle
from juristDoublets import doublets_authors, doublets_opera

int_pat = "^[0-9]*$"
int_p = re.compile(int_pat)

work_title_pattern = "[a-ząęźżćłńśó.„\" ]*([A-Z].*)"

work_title_p = re.compile(work_title_pattern)

roman_number_pattern = "^[IVXLC]*([IVXLC])$"
roman_number_p = re.compile(roman_number_pattern)



def split_lex_into_sections(text):
    lex_content = text[1]
    # split into sections
    lex_splitted = re.split(r' (\d+\w?\.)', lex_content)
    lex = dict()
    lex['pr'] = lex_splitted[0]
    lex_splitted = lex_splitted[1:]
    for index, part in enumerate(lex_splitted):
        if index == 0 or index % 2 == 0:
            lex[lex_splitted[index]] = lex_splitted[index + 1]

    return lex


def extract_text_data_from_plain_text(file_name):
    """

    :param file_name: a file with latin and polish text o
    f asingle digesta book, divided with TEXT_POLSKI tag
    :return: dictionary
    """

    file = open(file_name, 'r')
    roman_numerals_list = roman_num(max=200)

    lines = [x.strip('\n') for x in file.readlines()]
    lat_lines = []
    pol_lines = []
    lang_lines = lat_lines
    for line in lines:
        if "TEXT_POLSKI" in line:
            lang_lines = pol_lines
            continue
        lang_lines.append(line)

    book = {}
    title_title = ''
    title_nr = None

    for index, l in enumerate(lat_lines):

        if l in roman_numerals_list:
            title_title = lat_lines[index + 1]
            title_nr = roman_numerals_list.index(l) + 1

            book[title_nr] = {'title_lat': title_title, 'leges': {}}
        elif title_nr and l and l != title_title and l not in roman_numerals_list:
            text = l.split(':', 1)
            first_line = text[0]



            if first_line in ['54 Scaevola apud Iulianum libro vicensimo secundo digestorum notat']:
                lex_nr = 54
                jurist = 'SCAEVOLA'
                # work = 'apud Iulianum libro vicensimo secundo digestorum notat'
                opus_title = 'apud Iulianum libro vicensimo secundo digestorum'
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])

            elif first_line in ["30 Gaius ad edictum praetoris urbani, titulo de damno infecto"]:
                lex_nr = 30
                jurist = 'GAIUS'
                opus_title = "ad edictum praetoris urbani, titulo de damno infecto"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line in ["9 Volusius Maecianus ex lege Rodia"]:
                lex_nr = 9
                jurist = "VOLUSIUS MAECIANUS"
                opus_title = "ex lege Rodia"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])

            elif first_line in ["4 Libro octavo digestorum Iuliani Paulus notat"]:
                lex_nr = 4
                jurist = "PAULUS"
                opus_title = "Libro octavo digestorum Iuliani notat"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line in ["11 In libro septimo digestorum Iuliani Scaevola notat"]:
                lex_nr = 11
                jurist = "SCAEVOLA"
                opus_title = "In libro septimo digestorum Iuliani notat"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line in ["19 Gaius ad edictum praetoris titulo de publicanis"]:
                lex_nr = 19
                jurist = "GAIUS"
                opus_title = "ad edictum praetoris titulo de publicanis"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "57a Marcianus in libro secundo de adulteriis Papiniani Marcianus notat":
                lex_nr = '57a'
                jurist = 'Marcianus'
                opus_title = "in libro secundo de adulteriis Papiniani notat"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "40 Libro trigesimo digestorum Iuliani Marcellus notat":
                lex_nr = 40
                jurist = "Marcellus"
                opus_title = "Libro trigesimo digestorum Iuliani notat"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "36 Apud Scaevolam libro octavo decimo digestorum Claudius notat":
                lex_nr = 36
                jurist = "CLAUDIUS"
                opus_title = "Apud Scaevolam libro octavo decimo digestorum notat"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "26 Apud Scaevolam libro trigesimo digestorum Claudius notat":
                lex_nr = 26
                jurist = "CLAUDIUS"
                opus_title = "Apud Scaevolam libro trigesimo digestorum notat"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "75 Ex libro quadragesimo digestorum Iuliani Marcellus":
                lex_nr = 75
                jurist = "MARCELLUS"
                opus_title = "Ex libro quadragesimo digestorum Iuliani"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "20 Marcellus apud Iulianum libro vicesimo septimo digestorum notat":
                lex_nr = 20
                jurist = "MARCELLUS"
                opus_title = "apud Iulianum libro vicesimo septimo digestorum notat"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "17 Ex libro libro vicensimo primo digestorum Scaevolae":
                lex_nr = 17
                jurist = "SCAEVOLA"
                opus_title = "digesorum"
                opus_liber_int = 21
                first_line = " ".join(first_line.split(' ')[1:])

            elif first_line == "113 Paulus imperialium sententiarum in cognitionibus prolatarum ex libris sex libro secundo":
                lex_nr = 113
                jurist = "PAULUS"
                opus_title = "imperialium sententiarum in cognitionibus prolatarum"
                opus_liber_int = 2
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "80 Apud Iulianum libro trigesimo secundo digestorum Marcellus notat":
                lex_nr = 80
                jurist = "MARCELLUS"
                opus_title = "Apud Iulianum libro trigesimo secundo digestorum"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "5 Apud Iulianum libro vicensimo nono digestorum notat":
                lex_nr = 5
                jurist = "MARCELLUS"
                opus_title = "Apud Iulianum libro vicensimo nono digestorum notat"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "6 Papiniani libro decimo quaestionum PAULUS notat":
                lex_nr = 6
                jurist = "PAULUS"
                opus_title = "Papiniani libro decimo quaestionum notat"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "63 In libro singulari regularum Pomponii Marcellus notat":
                lex_nr = 63
                jurist = "MARCELLUS"
                opus_title = "In libro singulari regularum Pomponii notat"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "8 In libro secundo de adulteriis Papiniani Marcianus notat":
                lex_nr = 8
                jurist = "MARCIANUS"
                opus_title = "In libro secundo de adulteriis Papiniani notat"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line.split(' ', 1)[1] == ". . . . . . . . . . . . . . . . .":
                lex_nr = first_line.split(' ', 1)[0]
                jurist = "IGNOTUS"
                opus_title = "IGNOTUM"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line.split(' ', 1)[1] == "Gaius ad edictum praetoris urbani titulo de damno infecto":
                lex_nr = first_line.split(' ', 1)[0]
                jurist = "GAIUS"
                opus_title = "ad edictum praetoris urbani titulo de damno infecto"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])

            elif first_line.split(' ', 1)[1] == "Gaius ad edictum praetoris urbani titulo de aquae pluviae arcendae":
                lex_nr = first_line.split(' ', 1)[0]
                jurist = "GAIUS"
                opus_title = "ad edictum praetoris urbani titulo de aquae pluviae arcendae"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line.split(' ', 1)[1] == "Gaius ad edictum praetoris urbani titulo de publicanis":
                lex_nr = first_line.split(' ', 1)[0]
                jurist = "GAIUS"
                opus_title = "ad edictum praetoris urbani titulo de publicanis"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line.split(' ', 1)[1] == "Gaius ad edictum praetoris urbani titulo de liberali causa":
                lex_nr = first_line.split(' ', 1)[0]
                jurist = "GAIUS"
                opus_title = "ad edictum praetoris urbani titulo de liberali causa"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line.split(' ', 1)[1] == "Gaius libro ad edictum praetoris urbani titulo de re iudicata":
                lex_nr = first_line.split(' ', 1)[0]
                jurist = "GAIUS"
                opus_title = "ad edictum praetoris urbani titulo de re iudicata"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line.split(' ', 1)[1] == "Gaius ad edictum praetoris urbani":
                lex_nr = first_line.split(' ', 1)[0]
                jurist = "GAIUS"
                opus_title = "ad edictum praetoris urbani"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "9 Gaius ad edictum urbicum titulo de operis novi nuntiatione":
                lex_nr = 9
                jurist = "GAIUS"
                opus_title = "ad edictum urbicum titulo de operis novi nuntiatione"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "16 Papiniani libro decimo quaestionum PAULUS notat":
                lex_nr = 16
                jurist = "PAULUS"
                opus_title = "Papiniani libro decimo quaestionum notat"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "1 Ἐκ τοῦ ἀστυνομικοῦ μονοβίβλου τοῦ Παπινιανοῦ":
                lex_nr = 1
                jurist = "PAPINIANUS"
                opus_title = 'Ἐκ τοῦ ἀστυνομικοῦ'
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "5 Apud Iulianum libro vicensimo nono digestorum Marcellus notat":
                lex_nr = 5
                jurist = "MARCELLUS"
                opus_title = "Apud Iulianum libro vicensimo nono digestorum notat"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "80 Apud Iulianum libro trigesimo secundo digestorum Marcellus notat":
                lex_nr = 80
                jurist = 'MARCELLUS'
                opus_title = "Apud Iulianum libro trigesimo secundo digestorum notat"


            elif first_line == "11 Paulus libro quarto Iuliani digestorum notat":
                lex_nr = 11
                jurist = "PAULUS"
                opus_title = "libro quarto Iuliani digestorum notat"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line.split(' ', 1)[1] == "Venuleius Saturninus ex libro tertio iudiciorum publicorum":
                lex_nr = first_line.split(' ', 1)[0]
                jurist = "VENULEIUS SATURNINUS"
                opus_title = "iudiciorum publicorum"
                opus_liber_int = 3
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "240 Paulus ex libris sex libro primo imperialium sententiarum in cognitionibus prolatarum":
                lex_nr = 240
                jurist = "PAULUS"
                opus_title = "libri sex imperialium sententiarum in cognitionibus prolatarum"
                opus_liber_int = 1
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "4 Libro octavo digestorum Iuliani Paulus notat":
                lex_nr = 4
                jurist = "PAULUS"
                opus_title = "Libro octavo digestorum Iuliani notat"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "93 Paulus imperialium sententiarum in cognitionibus prolatarum ex libris sex primo seu decretorum libro secundo":
                lex_nr = 93
                jurist = "PAULUS"
                opus_title = "libri sex imperialium sententiarum in cognitionibus prolatarum"
                opus_liber_int = 2
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "24 Paulus imperialium sentantiarum in cognitionibus prolatarum sive decretorum ex libris sex libro primo":
                lex_nr = 24
                jurist = "PAULUS"
                opus_title = "libri sex imperialium sententiarum in cognitionibus prolatarum"
                opus_liber_int = 1
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "83 Paulus imperialium sententiarum in cognitionibus prolatarum ex libris VI libro primo seu decretorum libro II":
                lex_nr = 83
                jurist = "PAULUS"
                opus_title = "libri sex imperialium sententiarum in cognitionibus prolatarum"
                opus_liber_int = 1
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "10 Paulus imperiarum sententiarum in cognitionibus prolatarum ex libris sex libro secundo":
                lex_nr = 10
                jurist = "PAULUS"
                opus_title = "libri sex imperialium sententiarum in cognitionibus prolatarum"
                opus_liber_int = 2
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "18 Paulus libro trigensimo primo quaestionum Papiniani notat":
                lex_nr = 18
                jurist = "PAULUS"
                opus_title = "libro trigensimo primo quaestionum Papiniani notat"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "16 Paulus libro quinto responsorum Papiniani <notat>":
                lex_nr = 16
                jurist = "PAULUS"
                opus_title = "libro quinto responsorum Papiniani notat"
                opus_liber_int = 0
                first_line = " ".join(first_line.split(' ')[1:])
            elif first_line == "6 Papinianus quoque libro tertio responsorum ait":
                lex_nr = 6
                jurist = "PAPINIANUS"
                opus_title = "responsorum"
                opus_liber_int = 3
                first_line = " ".join(first_line.split(' ')[1:])
            else:
                # removing lex nr

                # print(first_line, first_line.split(' ', 1)[0])
                lex_nr = first_line.split(' ', 1)[0]
                lex_nr = lex_nr.replace('.', '')
                print(first_line)
                lex_nr = int(lex_nr)
                jurist = first_line.split('libro', 1)[0].split(' ', 1)[1]
                jurist = jurist.replace(" ex", '')
                first_line = " ".join(first_line.split(' ')[1:])
                print(first_line)
                work = first_line.split('libro', 1)[1]
                work = work.replace("<", '')
                work = work.replace(">", '')
                opera_before = ['fideicommissorum', 'epistularum', "constitutionum", 'institutionum', 'posteriorum',
                                'imperialium sentantiarum in cognitionibus prolatarum sive decretorum ex libris sex']
                opus_liber = []
                opus_title = []
                for w in work.split(' '):
                    if w in roman_ordinal_numeral or ((w.startswith('unde') or w.startswith('duode')) and w[-1] == 'o') or roman_number_p.match(w):
                        opus_liber.append(w)
                    else:
                        opus_title.append(w)

                for opus_before in opera_before:
                    if opus_before in jurist:
                    # print(jurist)
                        jurist = jurist.replace(opus_before, '')
                        opus_title.append(opus_before)

                opus_liber_int = rom_ord_num_to_num(opus_liber)

                opus_title = ' '.join(opus_title)
                if not opus_title:
                    opus_title = "opus ignotum"



        #
            # lex_content = text[1]
            # #split into sections
            # lex_splitted = re.split(r' (\d+\w?\.)', lex_content)
            # lex = dict()
            # lex['pr'] = lex_splitted[0]
            # lex_splitted = lex_splitted[1:]
            # for index, part in enumerate(lex_splitted):
            #     if index == 0 or index % 2 == 0:
            #         lex[lex_splitted[index]] = lex_splitted[index + 1]

            # print(res)
            if jurist.strip().upper() in doublets_authors:
                jurist = doublets_authors[jurist.strip().upper()]
            if opus_title.strip() in doublets_opera:
                opus_title = doublets_opera[opus_title.strip()]
            lex = split_lex_into_sections(text)

            book[title_nr]['leges'][lex_nr] = {'address_lat': first_line.strip(), 'jurist': jurist.strip().upper(),
                                               'opus': {'title_lat': opus_title.strip(),
                                                        'liber': int(opus_liber_int)},
                                               'content_lat': lex}



    title_title = ''
    for index, l in enumerate(pol_lines):
        # for index, l in enumerate(lat_lines):
        #
        #     if l in roman_numerals_list:
        #         title_title = lat_lines[index + 1]
        #         title_nr = roman_numerals_list.index(l) + 1
        if l and l.strip() in roman_numerals_list:
            title_title = pol_lines[index + 1]
            title_nr = roman_numerals_list.index(l) + 1

            book[title_nr]['title_pl'] = title_title
        elif l.isnumeric():
            title_title = pol_lines[index + 1]
            title_nr = int(l)
            book[title_nr]['title_pl'] = title_title

        elif l and l != title_title and not int_p.match(l):
            text = l.split(':', 1)
            first_line = text[0]
            first_line = first_line.replace('(', '')
            first_line = first_line.replace(')', '')

            if first_line in ['54 Scaevola w Uwagach do dwudziestej drugiej księgi Digestów Iulianusa']:
                opus_title_pl = "Uwagi do dwudziestej drugiej księgi Digestów Iulianusa"
                lex_nr = 54
            elif first_line in ["30 Gaius w Komentarzu do tytułu edyktu pretora miejskiego poświęconego szkodzie grożącej z sąsiedniego gruntu"]:
                opus_title_pl = "Komentarz do tytułu edyktu pretora miejskiego poświęconego szkodzie grożącej z sąsiedniego gruntu"
                lex_nr = 30
            elif first_line == "16 Paulusa uwaga w księdze dziesiątej Problemów prawnych Paninianusa":
                opus_title_pl = "uwaga w księdze dziesiątej Problemów prawnych Paninianusa"
                lex_nr = 16
            elif first_line == "18 Paulus w księdze trzydziestej pierwszej do Problemów prawnych Papinianusa notuje":
                opus_title_pl = "Uwaga w księdze trzydziestej pierwszej do Problemów prawnych Papinianusa"
                lex_nr = 18
            elif first_line in ["9 Volusius Maecianus z Komentarza do ustawy rodyjskiej"]:
                opus_title_pl = "Komentarz do ustawy rodyjskiej"
                lex_nr = 9
            elif first_line in ["4 Uwaga Paulusa do księgi ósmej Digestów Iulianusa"]:
                opus_title_pl = "Uwaga Paulusa do księgi ósmej Digestów Iulianusa"
                lex_nr = 4
            elif first_line in ['11 Uwaga Scaevoli do siódmej księgi Digestów Iulianusa']:
                opus_title_pl = "Uwaga Scaevoli do siódmej księgi Digestów Iulianusa"
                lex_nr = 11
            elif first_line in ["19 Gaius w Komentarzu do tytułu edyktu pretorskiego poświęconego poborcom podatkowym"]:
                opus_title_pl = "Komentarz do tytułu edyktu pretorskiego poświęconego poborcom podatkowym:"
                lex_nr = 19
            elif first_line == "57a Marcianusa uwaga w księdze drugiej monografii Papinianusa o cudzołóstwie":
                opus_title_pl = "uwaga w księdze drugiej monografii Papinianusa o cudzołóstwie"
                lex_nr = "57a"
            elif first_line == "40 W księdze trzydziestej Digestów Iulianusa Marcellus zaznacza":
                opus_title_pl = 'W księdze trzydziestej Digestów Iulianusa zaznacza'
                lex_nr = 40
            elif first_line == "36 Uwaga Claudiusa <Tryphoninusa> w osiemnastej księdze Digestów Scaevoli":
                opus_title_pl = "Uwaga w osiemnastej księdze Digestów Scaevoli"
                lex_nr = 36
            elif first_line == "26 Uwaga Claudiusa <Tryphoninusa> w trzydziestej księdze Digestów Scaevoli":
                opus_title_pl = "Uwaga w trzydziestej księdze Digestów Scaevoli"
                lex_nr = 26
            elif first_line == "75 <Uwaga> Marcellusa w księdze czterdziestej Digestów Iulianusa":
                opus_title_pl = "<Uwaga> w księdze czterdziestej Digestów Iulianusa"
                lex_nr = 75
            elif first_line == "20 Uwaga Marcellusa do księgi dwudziestej siódmej Digestów Iulianusa":
                opus_title_pl = "Uwaga do księgi dwudziestej siódmej Digestów Iulianusa"
                lex_nr = 20
            elif first_line == "113 Paulus w drugiej z sześciu ksiąg Cesarskich wyroków ogłoszonych w procesach":
                lex_nr = 113
                opus_title_pl = "Cesarskich wyroków ogłoszonych w procesach"
            elif first_line == "63 Uwaga Marcellusa w księdze jedynej Zasad prawnych Pomponiusa":
                lex_nr = 63
                opus_title_pl = "Uwaga w księdze jedynej Zasad prawnych Pomponiusa"
            elif first_line == "8 Uwaga Marcianusa w księdze drugiej monografii O cudzołóstwie autorstwa Papinianusa":
                lex_nr = 8
                opus_title_pl = "Uwaga w księdze drugiej monografii O cudzołóstwie autorstwa Papinianusa"
            elif first_line == "17 Z księgi dwudziestej pierwszej Digestów Scaevoli":
                lex_nr = 17
                opus_title_pl = "Digestów"
            elif first_line == "8 Uwaga Paulusa do księgi ósmej Digestów Iulianusa":
                lex_nr = 8
                opus_title_pl = "Uwaga do księgi ósmej Digestów Iulianusa"
            elif first_line.split(' ', 1)[1] == "Venuleius Saturninus z księgi trzeciej monografii O publicznoprawnych postępowaniach karnych":
                lex_nr = str(first_line.split(' ', 1)[0])
                opus_title_pl = "monografii O publicznoprawnych postępowaniach karnych"
            elif first_line.split(' ', 1)[1] == ". . . . . . . . . . . . . . . . .":
                lex_nr = str(first_line.split(' ', 1)[0])
                opus_title_pl = "Nieznane"
            elif first_line.split(' ', 1)[1] == "Gaius w Komentarzu do tytułu edyktu pretora miejskiego, O zagrażającej szkodzie":
                lex_nr = str(first_line.split(' ', 1)[0])
                opus_title_pl = "w Komentarzu do tytułu edyktu pretora miejskiego, O zagrażającej szkodzie"
            elif first_line.split(' ', 1)[1] == "Gaius w Komentarzu do tytułu edyktu pretora miejskiego „O postępowaniu sądowym w sprawach o wolność”":
                lex_nr = str(first_line.split(' ', 1)[0])
                opus_title_pl = "w Komentarzu do tytułu edyktu pretora miejskiego „O postępowaniu sądowym w sprawach o wolność”"

            elif first_line.split(' ', 1)[1] == "Gaius w Komentarzu do <tytułu> edyktu pretora miejskiego <„O postępowaniu sądowym w sprawach o wolność”>":

                lex_nr = str(first_line.split(' ', 1)[0])
                opus_title_pl = "w Komentarzu do <tytułu> edyktu pretora miejskiego <„O postępowaniu sądowym w sprawach o wolność”>"
            elif first_line.split(' ', 1)[1] == "Gaius w Komentarzu do edyktu pretora miejskiego, w tytule na temat zasądzenia":

                lex_nr = str(first_line.split(' ', 1)[0])
                opus_title_pl = "w Komentarzu do edyktu pretora miejskiego, w tytule na temat zasądzenia"

            elif first_line.split(' ', 1)[1] == "Gaius w Komentarzu do edyktu pretora miejskiego w rozdziale O skardze z tytułu zmiany naturalnego odpływu wody deszczowej":

                lex_nr = first_line.split(' ', 1)[0]
                opus_title_pl = "w Komentarzu do edyktu pretora miejskiego w rozdziale O skardze z tytułu zmiany naturalnego odpływu wody deszczowej"
            elif first_line.split(' ', 1)[1] == "Gaius w Komentarzu do edyktu pretora miejskiego w rozdziale O dzierżawcach dochodów państwowych":
                lex_nr = first_line.split(' ', 1)[0]
                opus_title_pl = "w Komentarzu do edyktu pretora miejskiego w rozdziale O dzierżawcach dochodów państwowych:"
            elif first_line == "5 Uwaga Marcellusa w księdze dwudziestej dziewiątej Digestów Iulianusa":
                lex_nr = 5
                opus_title_pl = "Uwaga w księdze dwudziestej dziewiątej Digestów Iulianusa"
            elif first_line == "11 Paulus notuje w księdze czwartej Digestów Iulianusa":
                lex_nr = 11
                opus_title_pl = "w księdze czwartej Digestów Iulianusa notuje"
            elif first_line == "80 Uwaga Marcellusa w księdze trzydziestej drugiej Digestów Iulianusa":
                lex_nr = 80
                opus_title_pl = "Uwaga w księdze trzydziestej drugiej Digestów Iulianusa"

            elif first_line == "9 Gaius w Komentarzu do <tytułu> edyktu <pretora> miejskiego":
                lex_nr = 9
                opus_title_pl = "w Komentarzu do <tytułu> edyktu <pretora> miejskiego"
            elif first_line == "80 Uwaga Marcellusa w księdze trzydziestej drugiej Digestów Iulianusa":
                lex_nr = 80
                opus_title_pl = "Uwaga w księdze trzydziestej drugiej Digestów Iulianusa"
            elif first_line == "1 Wyciąg z monografii Papinianusa O urzędzie edyla":
                lex_nr = 1
                opus_title_pl = "Wyciąg z monografii O urzędzie edyla"
            else:
                print(first_line)
                opus = first_line.split("w księdze")[1]
                opus = opus.replace('<', '')
                opus = opus.replace('>', '')
                if opus == " ......":
                    opus_title_pl = 'nieznane'
                else:
                    print(opus)
                    opus_title_pl = work_title_p.match(opus)[1]
                lex_nr = first_line.split(' ', 1)[0]
                lex_nr = lex_nr.replace('.', '')
                lex_nr = int(lex_nr)
                # lex_nr = int(first_line.split(' ', 1)[0])
            first_line = " ".join(first_line.split(' ')[1:])

            # first_line = " ".join(first_line.split()[1:])
            # content = text[1]

            # lex = text[1]
            # lex_splitted = re.split(r' (\d+\w?\.)', lex)
            # pat = re.compile(r'\d')
            # res = dict()
            # res['pr'] = lex_splitted[0]
            # lex_splitted = lex_splitted[1:]
            # for index, part in enumerate(lex_splitted):
            #     if index == 0 or index % 2 == 0:
            #         res[lex_splitted[index]] = lex_splitted[index + 1]
            # print(res)
            lex = split_lex_into_sections(text)

            # print(lex)
            print(lex_nr)
            book[title_nr]['leges'][lex_nr]['address_pl'] = first_line
            book[title_nr]['leges'][lex_nr]['content_pl'] = lex
            book[title_nr]['leges'][lex_nr]['opus']['title_pl'] = opus_title_pl

    print(book)
    with open(file_name + "_extracted.pickle", 'wb') as file:
        pickle.dump(book, file)


if __name__ == '__main__':
    # extract_text_data_from_plain_text('populate/Data/digestaplikiend/d1.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d2.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d3.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d4.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d5.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d6.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d7.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d8.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d9.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d10.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d11.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d12.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d13.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d14.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d15.txt')
    extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d16.txt')
    extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d17.txt')
    extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d18.txt')
    extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d19.txt')
    extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d20.txt')
    extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d21.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d22.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d23.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d24.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d25.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d26.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d27.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d28.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d29.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d30.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d31.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d32.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d33.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d34.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d35.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d36.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d37.txt')
    extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d38.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d39.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d40.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d41.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d42.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d43.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d44.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d45.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d46.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d47.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d48.txt')
    # extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d49.txt')
    extract_text_data_from_plain_text('populate/Data/Digestaplikiend/d50.txt')



































