roman_ordinal_numeral = {'primo': 1,
                         'secundo': 2, 'tertio': 3, 'quarto': 4, 'quinto': 5, 'sexto': 6, 'septimo': 7, 'octavo': 8,
                         'nono': 9, 'decimo': 10, 'undecimo': 11, 'duodecimo': 12,
                         'vicesimo': 20, 'vicensimo': 20, 'tricesimo': 30, 'quadragesimo': 40, 'quinquagesimo': 50,
                         'sexagesimo': 60, 'trigensimo': 30, 'trigesimo': 30,
                         'septuagesimo': 70, 'octogesimo': 80, 'nonagesimo': 90,
                         'tricensimo': 30, 'quadragensimo': 40, 'quinquagensimo': 50,
                         'sexagensimo': 60,
                         'septuagensimo': 70, 'octogensimo': 80, 'nonagensimo': 90, 'singulari': 0,
                         'centensimo': 100, 'centesimo': 100}


def int_to_roman(i):
    """
    :return: change a arab into roman number (max 3999)
    """
    arab = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    rom = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
    numeral_map = list(zip(arab, rom))

    result = []
    for integer, numeral in numeral_map:
        count = int(i // integer)

        result.append(numeral * count)
        i -= integer * count
    return ''.join(result)


def roman_num(max=100):
    """

    :param max: for most of the times bigger list is not needed
    :return: a list of roman numerals
    """
    li = []
    for x in range(max):
        li.append(int_to_roman(x + 1))

    return li


def rom_ord_num_to_num(numbers: list):
    num_int = 0
    for number in numbers:
        if number in roman_ordinal_numeral:
            num_int += roman_ordinal_numeral[number]
        elif number.startswith('unde'):
            num_int -= 1
            num_int += roman_ordinal_numeral[number[4:]]
        elif number.startswith('duode'):
            num_int -= 2
            num_int += roman_ordinal_numeral[number[5:]]
        else:
            raise Exception
    return num_int
