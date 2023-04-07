from resources import roman_num, roman_ordinal_numeral, rom_ord_num_to_num
import re
int_pat = "^[0-9]*$"
int_p = re.compile(int_pat)


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

            book[title_nr] = {'title_lat': title_title, 'paragraphs': {}}
        elif title_nr and l and l != title_title and l not in roman_numerals_list:
            text = l.split(':', 1)
            first_line = text[0]
            print(first_line)

            paragraph_nr = first_line.split(' ', 1)[0]
            jurist = first_line.split('libro', 1)[0].split(' ', 1)[1]
            work = first_line.split('libro', 1)[1]
            opus_liber = []
            opus_title = []
            for w in work.split(' '):
                if w in roman_ordinal_numeral or ((w.startswith('unde') or w.startswith('duode')) and w[-1] == 'o'):
                    opus_liber.append(w)
                else:
                    opus_title.append(w)
            opus_liber_int = rom_ord_num_to_num(opus_liber)

            opus_title = ' '.join(opus_title)

            content = text[1]
            book[title_nr]['paragraphs'][paragraph_nr] = {'address_lat': first_line.strip(), 'jurist': jurist.strip(),
                                                          'opus': {'title': opus_title.strip(),
                                                                   'liber': int(opus_liber_int)},
                                                          'content_lat': content.strip()}

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

            book[title_nr]['title_pol'] = title_title
        elif l and l != title_title and not int_p.match(l):
            text = l.split(':', 1)
            first_line = text[0]

            paragraph_nr = first_line.split(' ', 1)[0]
            content = text[1]
            book[title_nr]['paragraphs'][paragraph_nr]['address_pl'] = first_line
            book[title_nr]['paragraphs'][paragraph_nr]['content_pl'] = content

    return book


if __name__ == '__main__':

    book = extract_text_data_from_plain_text('populate/Data/digestaplikiend/d1.txt')
    print(book)