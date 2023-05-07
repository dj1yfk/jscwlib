/*  jscwlib - JavaScript Morse Code Library
 *
 *  Author:     Fabian Kurz, DJ5CW
 *  Homepage:   https://fkurz.net/ham/jscwlib.html
 *  Repository: https://git.fkurz.net/dj1yfk/jscwlib
 *
 *  The MIT license applies.
 */

    function jscw (params) {

        var download_svg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4LjciIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCA4LjcgMTAiPjxwYXRoIHN0eWxlPSJzdHJva2U6IzAwMDtzdHJva2Utd2lkdGg6MC4yNnB4OyIgZD0ibSA0LjQsMi41IHYgNC43IGwgMS42LC0xLjYgdiAwLjMgbCAtMS42NywxLjY3IC0xLjY3LC0xLjY3IHYgLTAuMyBsIDEuNTYsMS42IDAsLTQuNyB6IiAvPjxwYXRoIHN0eWxlPSJzdHJva2U6IzAwMDtzdHJva2Utd2lkdGg6MC40OyIgZD0iTSAyLjUsOCBIIDYuMSIgLz48L3N2Zz4K";
        var play_svg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDEwIDEwIj48cGF0aCBkPSJNMyAyIEwzIDggTDcgNSBaIiBzdHlsZT0iZmlsbDojZmZmO3N0cm9rZS13aWR0aDowLjM7c3Ryb2tlOiMwMDA7c3Ryb2tlLWxpbmVqb2luOmJldmVsOyIvPjwvc3ZnPgo=";
        var pause_svg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDEwIDEwIj48c3R5bGU+LmF7ZmlsbDojZmZmO3N0cm9rZS13aWR0aDowLjM7c3Ryb2tlOiMwMDA7fTwvc3R5bGU+PHJlY3Qgd2lkdGg9IjEuNiIgaGVpZ2h0PSI1IiB4PSIzIiB5PSIyLjUiIHJ5PSIwLjQiIGNsYXNzPSJhIi8+PHJlY3Qgd2lkdGg9IjEuNiIgaGVpZ2h0PSI1IiB4PSI1LjQiIHk9IjIuNSIgcnk9IjAuNCIgY2xhc3M9ImEiLz48L3N2Zz4K";
        var stop_svg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNSIgaGVpZ2h0PSIyNSIgdmlld0JveD0iMCAwIDEwIDEwIj48cmVjdCB3aWR0aD0iMy43NSIgaGVpZ2h0PSIzLjc1IiB4PSIzLjEyNSIgeT0iMy4xMjUiIHJ5PSIwLjIiIHN0eWxlPSJmaWxsOiNmZmY7c3Ryb2tlLXdpZHRoOjAuMztzdHJva2U6IzAwMCIvPjwvc3ZnPgo=";

        var settings_svg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiI+PHBhdGggZD0ibTEwNy43NSAyMi4xNTl2MjEuNTcxYy04LjgzNSAyLjExNy0xNy4yODYgNS42MDgtMjUuMDQgMTAuMzQ3bC0xNS4yMzQtMTUuMjM0LTI4LjYzMiAyOC42MzQgMTUuMjYgMTUuMjZjLTQuNzQ0OCA3Ljc0NDQtOC4yNDQzIDE2LjE4Ni0xMC4zNzEgMjUuMDE2aC0yMS41NzN2NDAuNDkzaDIxLjU3MWMyLjExNjEgOC44MzgyIDUuNjA3NiAxNy4yODkgMTAuMzQ3IDI1LjA0M2wtMTUuMjM0IDE1LjIzNCAyOC42MzIgMjguNjM0IDE1LjI2Mi0xNS4yNjJjNy43NDQ0IDQuNzQ0OCAxNi4xODYgOC4yNDQzIDI1LjAxNiAxMC4zNzF2MjEuNTczaDQwLjQ5M3YtMjEuNTcxYzguODM3NS0yLjExNjMgMTcuMjg4LTUuNjA3OCAyNS4wNDEtMTAuMzQ3bDE1LjIzNiAxNS4yMzYgMjguNjMyLTI4LjYzNC0xNS4yNi0xNS4yNmM0Ljc0NS03Ljc0NSA4LjI0NDUtMTYuMTg3IDEwLjM3MS0yNS4wMThoMjEuNTczdi00MC40OTNoLTIxLjU3MWMtMi4xMTYzLTguODM3NS01LjYwNzgtMTcuMjg4LTEwLjM0Ny0yNS4wNDFsMTUuMjUtMTUuMjIyLTI4LjY0LTI4LjYzNC0xNS4yNiAxNS4yNmMtNy43NDUtNC43NDUtMTYuMTg3LTguMjQ0NS0yNS4wMTgtMTAuMzcxdi0yMS41NzNoLTQwLjQ5M3ptMjAuMjQ3IDU3LjUzN2E0OC4zMDMgNDguMzAzIDAgMCAxIDQ4LjMgNDguMzA0IDQ4LjMwMyA0OC4zMDMgMCAwIDEgLTQ4LjMgNDguMyA0OC4zMDMgNDguMzAzIDAgMCAxIC00OC4zMDMgLTQ4LjMgNDguMzAzIDQ4LjMwMyAwIDAgMSA0OC4zMDMgLTQ4LjMwNHoiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjgiIC8+PC9zdmc+Cgo=";

        var settings_open_svg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiI+PHBhdGggZD0ibTEwNy43NSAyMi4xNTl2MjEuNTcxYy04LjgzNSAyLjExNy0xNy4yODYgNS42MDgtMjUuMDQgMTAuMzQ3bC0xNS4yMzQtMTUuMjM0LTI4LjYzMiAyOC42MzQgMTUuMjYgMTUuMjZjLTQuNzQ0OCA3Ljc0NDQtOC4yNDQzIDE2LjE4Ni0xMC4zNzEgMjUuMDE2aC0yMS41NzN2NDAuNDkzaDIxLjU3MWMyLjExNjEgOC44MzgyIDUuNjA3NiAxNy4yODkgMTAuMzQ3IDI1LjA0M2wtMTUuMjM0IDE1LjIzNCAyOC42MzIgMjguNjM0IDE1LjI2Mi0xNS4yNjJjNy43NDQ0IDQuNzQ0OCAxNi4xODYgOC4yNDQzIDI1LjAxNiAxMC4zNzF2MjEuNTczaDQwLjQ5M3YtMjEuNTcxYzguODM3NS0yLjExNjMgMTcuMjg4LTUuNjA3OCAyNS4wNDEtMTAuMzQ3bDE1LjIzNiAxNS4yMzYgMjguNjMyLTI4LjYzNC0xNS4yNi0xNS4yNmM0Ljc0NS03Ljc0NSA4LjI0NDUtMTYuMTg3IDEwLjM3MS0yNS4wMThoMjEuNTczdi00MC40OTNoLTIxLjU3MWMtMi4xMTYzLTguODM3NS01LjYwNzgtMTcuMjg4LTEwLjM0Ny0yNS4wNDFsMTUuMjUtMTUuMjIyLTI4LjY0LTI4LjYzNC0xNS4yNiAxNS4yNmMtNy43NDUtNC43NDUtMTYuMTg3LTguMjQ0NS0yNS4wMTgtMTAuMzcxdi0yMS41NzNoLTQwLjQ5M3ptMjAuMjQ3IDU3LjUzN2E0OC4zMDMgNDguMzAzIDAgMCAxIDQ4LjMgNDguMzA0IDQ4LjMwMyA0OC4zMDMgMCAwIDEgLTQ4LjMgNDguMyA0OC4zMDMgNDguMzAzIDAgMCAxIC00OC4zMDMgLTQ4LjMgNDguMzAzIDQ4LjMwMyAwIDAgMSA0OC4zMDMgLTQ4LjMwNHoiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2FhYWFhYSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjgiIC8+PC9zdmc+Cg==";

        var alphabet = {
            " ": " ",  // word space

            // International Morse code, as per ITU-R M.1677-1

            // 1. Morse code signals
            // 1.1.1. Letters (Latins cript)
            // Uppercase Lowercase
            "A": ".-",   "a": ".-",
            "B": "-...", "b": "-...",
            "C": "-.-.", "c": "-.-.",
            "D": "-..",  "d": "-..",
            "E": ".",    "e": ".",
            "F": "..-.", "f": "..-.",
            "G": "--.",  "g": "--.",
            "H": "....", "h": "....",
            "I": "..",   "i": "..",  "ı": "..",  // dotless i (see https://en.wikipedia.org/wiki/Dotless_I)
            "J": ".---", "j": ".---",
            "K": "-.-",  "k": "-.-",
            "L": ".-..", "l": ".-..",
            "M": "--",   "m": "--",
            "N": "-.",   "n": "-.",
            "O": "---",  "o": "---",
            "P": ".--.", "p": ".--.",
            "Q": "--.-", "q": "--.-",
            "R": ".-.",  "r": ".-.",
            "S": "...",  "s": "...", "ſ": "...",  // long s (see https://en.wikipedia.org/wiki/Long_s)
            "T": "-",    "t": "-",
            "U": "..-",  "u": "..-",
            "V": "...-", "v": "...-",
            "W": ".--",  "w": ".--",
            "X": "-..-", "x": "-..-",
            "Y": "-.--", "y": "-.--",
            "Z": "--..", "z": "--..",

            // 1.1.2. Figures (Hindu-Arab digits)
            "0": "-----",
            "1": ".----",
            "2": "..---",
            "3": "...--",
            "4": "....-",
            "5": ".....",
            "6": "-....",
            "7": "--...",
            "8": "---..",
            "9": "----.",

            // 1.1.3. Punctuation marks and miscellaneous signs
            ".": ".-.-.-",  // Full stop (period)
            ",": "--..--",  // Comma
            ":": "---...",  // Colon r division sign
            "?": "..--..",  // Question mark
            "'": ".----.",  // Apostrophe
            "-": "-....-",  // Hyphen
            "/": "-..-.",  // Fraction bar or division sign
            "(": "-.--.",  // Left-hand bracket (parenthesis)
            ")": "-.--.-",  // Right-hand bracket (parenthesis)
            // Inverted commas (before and after the words)
            // Straight quotes
            '"': ".-..-.",
            // English quotes
            "“": ".-..-.",
            "”": ".-..-.",
            // French quotes
            "«": ".-..-.",
            "»": ".-..-.",
            "=": "-...-",  // Double hyphen
            // NA  // Understood
            // NA  // Error
            "+": ".-.-.",  // Cross or addition sign
            // NA  // Invitation to transmit
            // NA  // Wait
            // NA  // End of work
            // NA  // Starting signal
            "×": "-..-",  // Multiplication sign (same as letter X)
            "@": ".--.-.",  // Commercial at

            // 3. Transmission of signs for which there is no corresponding signal in the Morse code
            // 3.1. Signs that have no corresponding signal in the Morse code,
            //      but that are acceptable in the writing of telegrams, shall
            //      be sent as follows:
            // 3.2. Multiplication sign
            // 3.2.1. For the multiplication sign, the signal corresponding to
            //        the letter X shall be transmitted.
            // NOTE: already listed in 1.1.3
            // 3.3. Percentage or per thousand sign
            // 3.3.1. To indicate the signal % or ‰, the figure 0, the fraction
            //        bar and the figures 0 or 00 shall be transmitted
            //        successively (i.e. 0/0, 0/00).
            "%": "----- -..-. -----",
            "‰": "----- -..-. ----- -----",
            // 3.3.2 A whole number, a fractional number, or a fraction,
            //       followed by a % or ‰ sign, shall be transmitted by joining
            //       up the whole number, the fraction number, or the fraction
            //       to the % or ‰ by a single hyphen.
            // TODO: This is not implemented
            // 3.4 Inverted commas (quotation marks)
            // 3.4.1 The special signal for inverted commas shall be transmitted
            //       before and after the word or words. However, where code
            //       converters are used, the apostrophe may be transmitted
            //       twice before and twice after the word or words to signal
            //       inverted commas (quotation marks).
            // NOTE: NA
            // 3.5 Minute and second signs
            // 3.5.1 To transmit the minute ( ′ ) or second ( ″ ) signs, when
            //       such signs follow figures – for example 1′15″ – the
            //       apostrophe signal (. − − − −.) must be used once or twice
            //       as appropriate. The signal (.− . . −.) reserved for
            //       inverted commas may not be used for the second sign.
            "′": ".----.",
            "″": ".----. .----.",

            // Non-standard punctuation marks
            "!": "..--.",  // mapped to interrogation mark
            "$": "...-..-",
            "`": ".-----.",
            ";": "-.-.-.",
            "&": ". ...",  // "es"

            // non-Latin extensions (from https://en.wikipedia.org/wiki/Morse_code#Letters,_numbers,_punctuation,_prosigns_for_Morse_code_and_non-Latin_variants)
            // Uppercase    Lowercase
            "À": ".--.-",   "à": ".--.-",
            "Ä": ".-.-",    "ä": ".-.-",
            "Å": ".--.-",   "å": ".--.-",
            "Ą": ".-.-",    "ą": ".-.-",
            "Æ": ".-.-",    "æ": ".-.-",
            "Ć": "-.-..",   "ć": "-.-..",
            "Ĉ": "-.-..",   "ĉ": "-.-..",
            "Ç": "-.-..",   "ç": "-.-..",
            /* "CH": "----", "ch": "----" */
            "Đ": "..-..",   "đ": "..-..",
            "Ð": "..-.",    "ð": "..-.",
            "É": "..-..",   "é": "..-..",
            "È": ".-..-",   "è": ".-..-",
            "Ę": "..-..",   "ę": "..-..",
            "Ĝ": "--.-.",   "ĝ": "--.-.",
            "Ĥ": "----",    "ĥ": "----",
            "Ĵ": ".---.",   "ĵ": ".---.",
            "Ł": ".-..-",   "ł": ".-..-",
            "Ń": "--.--",   "ń": "--.--",
            "Ñ": "--.--",   "ñ": "--.--",
            "Ó": "---.",    "ó": "---.",
            "Ö": "---.",    "ö": "---.",
            "Ø": "---.",    "ø": "---.",
            "Ś": "...-...", "ś": "...-...",
            "Ŝ": "...-.",   "ŝ": "...-.",
            "Š": "----",    "š": "----",
            "Þ": ".--..",   "þ": ".--..",
            "Ü": "..--",    "ü": "..--",
            "Ŭ": "..--",    "ŭ": "..--",
            "Ź": "--..-.",  "ź": "--..-.",
            "Ż": "--..-.",  "ż": "--..-.",

            // other characters without a reference
            // Uppercase    Lowercase
            /* "SS" */      "ß": "...--..",
            "Á": ".--.-",   "á": ".--.-",
            "Œ": "---.",    "œ": "---.",
            "Ì": ".---.",   "ì": ".---.",

            // mapping of other Latin characters with diacritics to standard characters
            // Uppercase    Lowercase
            // A
            "Â": ".-",      "â": ".-",
            "Ã": ".-",      "ã": ".-",
            "Ā": ".-",      "ā": ".-",
            "Ă": ".-",      "ă": ".-",
            "Ą": ".-",      "ą": ".-",
            // C
            "Ċ": "-.-.",    "ċ": "-.-.",
            "Č": "-.-.",    "č": "-.-.",
            // D
            "Ď": "-..",     "ď": "-..",
            // E
            "Ê": ".",       "ê": ".",
            "Ë": ".",       "ë": ".",
            "Ē": ".",       "ē": ".",
            "Ĕ": ".",       "ĕ": ".",
            "Ė": ".",       "ė": ".",
            "Ę": ".",       "ę": ".",
            "Ě": ".",       "ě": ".",
            // G
            "Ğ": "--.",     "ğ": "--.",
            "Ġ": "--.",     "ġ": "--.",
            "Ģ": "--.",     "ģ": "--.",
            // H
            "Ħ": "....",    "ħ": "....",
            // I
            "Í": "..",      "í": "..",
            "Î": "..",      "î": "..",
            "Ï": "..",      "ï": "..",
            "Ĩ": "..",      "ĩ": "..",
            "Ī": "..",      "ī": "..",
            "Ĭ": "..",      "ĭ": "..",
            "Į": "..",      "į": "..",
            // IJ
            "Ĳ": ".. .---", "ĳ": ".. .---",
            // K
            "Ķ": "-.-",     "ķ": "-.-",
            /* NA */        "ĸ": "-.-",
            // L
            "Ĺ": ".-..",    "ĺ": ".-..",
            "Ļ": ".-..",    "ļ": ".-..",
            "Ľ": ".-..",    "ľ": ".-..",
            "Ŀ": ".-..",    "ŀ": ".-..",
            // N
            "Ņ": "-.",      "ņ": "-.",
            "Ň": "-.",      "ň": "-.",
            /* "ʼN" */      "ŉ": "-.",
            "Ŋ": "-.",      "ŋ": "-.",
            // O
            "Ò": "---",     "ò": "---",
            "Ô": "---",     "ô": "---",
            "Õ": "---",     "õ": "---",
            "Ō": "---",     "ō": "---",
            "Ŏ": "---",     "ŏ": "---",
            "Ő": "---",     "ő": "---",
            // R
            "Ŕ": ".-.",     "ŕ": ".-.",
            "Ŗ": ".-.",     "ŗ": ".-.",
            "Ř": ".-.",     "ř": ".-.",
            // S
            "Ş": "...",     "ş": "...",
            // T
            "Ţ": "-",       "ţ": "-",
            "Ť": "-",       "ť": "-",
            "Ŧ": "-",       "ŧ": "-",
            // U
            "Ù": "..-",     "ù": "..-",
            "Ú": "..-",     "ú": "..-",
            "Û": "..-",     "û": "..-",
            "Ũ": "..-",     "ũ": "..-",
            "Ū": "..-",     "ū": "..-",
            "Ů": "..-",     "ů": "..-",
            "Ű": "..-",     "ű": "..-",
            "Ų": "..-",     "ų": "..-",
            // W
            "Ŵ": ".--",     "ŵ": ".--",
            // Y
            "Ý": "-.--",    "ý": "-.--",
            "Ŷ": "-.--",    "ŷ": "-.--",
            "Ÿ": "-.--",    "ÿ": "-.--",
            // Z
            "Ž": "--..",    "ž": "--..",

            // Greek Morse code
            // Wikipedia: The Greek Morse code alphabet is very similar to the
            //            Latin alphabet. It uses one extra letter for Greek
            //            letter Χ and no longer uses the codes for Latin
            //            letters "J", "U" and "V".
            // https://en.wikipedia.org/wiki/Morse_code_for_non-Latin_alphabets#Greek
            // Uppercase  Lowercase     Lowercase in word-final position
            "Α": ".-",    "α": ".-",
            "Β": "-...",  "β": "-...",
            "Γ": "--.",   "γ": "--.",
            "Δ": "-..",   "δ": "-..",
            "Ε": ".",     "ε": ".",
            "Ζ": "--..",  "ζ": "--..",
            "Η": "....",  "η": "....",
            "Θ": "-.-.",  "θ": "-.-.",
            "Ι": "..",    "ι": "..",
            "Κ": "-.-",   "κ": "-.-",
            "Λ": ".-..",  "λ": ".-..",
            "Μ": "--",    "μ": "--",
            "Ν": "-.",    "ν": "-.",
            "Ξ": "-..-",  "ξ": "-..-",
            "Ο": "---",   "ο": "---",
            "Π": ".--.",  "π": ".--.",
            "Ρ": ".-.",   "ρ": ".-.",
            "Σ": "...",   "σ": "...",   "ς": "...",
            "Τ": "-",     "τ": "-",
            "Υ": "-.--",  "υ": "-.--",
            "Φ": "..-.",  "φ": "..-.",
            "Χ": "----",  "χ": "----",
            "Ψ": "--.-",  "ψ": "--.-",

            // Russian Morse code for Cyrillic
            // https://en.wikipedia.org/wiki/Russian_Morse_code (1857)
            // Полное собрание законов Российской Империи. Собрание Второе
            // These are listed in the order of the Wikipedia page (alphabetical
            // order of the corresponding latin script character)
            // Uppercase  Lowercase
            "А": ".-",    "а": ".-",    // a
            "Б": "-...",  "б": "-...",  // be
            "В": ".--",   "в": ".--",   // ve
            "Г": "--.",   "г": "--.",   // ghe
            "Д": "-..",   "д": "-..",   // de
            "Е": ".",     "е": ".",     // ie
            "Ж": "...-",  "ж": "...-",  // zhe
            "З": "--..",  "з": "--..",  // ze
            "И": "..",    "и": "..",    // i
            "Й": ".---",  "й": ".---",  // short i
            "К": "-.-",   "к": "-.-",   // ka
            "Л": ".-..",  "л": ".-..",  // el
            "М": "--",    "м": "--",    // em
            "Н": "-.",    "н": "-.",    // en
            "О": "---",   "о": "---",   // o
            "П": ".--.",  "п": ".--.",  // pe
            "Р": ".-.",   "р": ".-.",   // er
            "С": "...",   "с": "...",   // es
            "Т": "-",     "т": "-",
            "У": "..-",   "у": "..-",   // u
            "Ф": "..-.",  "ф": "..-.",  // ef
            "Х": "....",  "х": "....",  // ha
            "Ц": "-.-.",  "ц": "-.-.",  // tse
            "Ч": "---.",  "ч": "---.",  // che
            "Ш": "----",  "ш": "----",  // sha
            "Щ": "--.-",  "щ": "--.-",  // shcha
            "Ъ": "-..-",  "ъ": "-..-",  // hard sign
            "Ы": "-.--",  "ы": "-.--",  // yeru
            "Ь": "-..-",  "ь": "-..-",  // soft sign
            "Ѣ": "..-..", "ѣ": "..-..", // yat, in Wikipedia article and in Russian law document
            "Э": "..-..", "э": "..-..", // e, in Wikipedia article only
            "Ю": "..--",  "ю": "..--",  // yu
            "Я": ".-.-",  "я": ".-.-",  // ya

            // mapping of other Cyrillic characters to standard ones
            "Ѐ": ".",     "ѐ": ".",    // ie with grave
            "Ё": ".",     "ё": ".",    // io
            "Є": ".",     "є": ".",    // ukrainian  ie
            "І": "..",    "і": "..",   // byelorussian-ukrainian i
            "Ї": "..",    "ї": "..",   // yi
            "Ј": ".---",  "ј": ".---", // je
            "Ћ": "-.-.",  "ћ": "-.-.", // tshe
            "Ѝ": "..",    "ѝ": "..",   // i with grave
            "Ў": "..-",   "ў": "..-",  // short u

            // phonetic decomposition of other Cyrillic characters
            "Ђ": "-.. .---",  "ђ": "-.. .---",  // dje
            "Ѓ": "--. .---",  "ѓ": "--. .---",  // gje
            "Ѕ": "-.. --..",  "ѕ": "-.. --..",  // dze
            "Љ": ".-.. .---", "љ": ".-.. .---", // lje
            "Њ": "-. .---",   "њ": "-. .---",   // nje
            "Ќ": "-.- .---",  "ќ": "-.- .---",  // kje
            "Џ": "-.. --..",  "џ": "-.. --..",  // dzhe

            // Wabun code for Japanese, tnx JE1TRV
            // https://en.wikipedia.org/wiki/Wabun_code
            // https://www.rfcafe.com/references/qst/japanese-morse-telegraph-code-sep-1942-qst.htm (1942)
            // https://web.archive.org/web/20220129114408/https://elaws.e-gov.go.jp/data/325M50080000017_20200622_502M60000008061/pict/S25F30901000017-001.pdf (1945?)
            // 1. Kanas without any diacritics (dakuten or handakuten)
            // Katakana    Hiragana
            "イ": ".-",    "い": ".-",     // i
            "イ": ".-",    "い": ".-",     // i
            "ロ": ".-.-",  "ろ": ".-.-",   // ro
            "ハ": "-...",  "は": "-...",   // ha
            "ニ": "-.-.",  "に": "-.-.",   // ni
            "ホ": "-..",   "ほ": "-..",    // ho
            "ヘ": ".",     "へ": ".",      // he
            "ト": "..-..", "と": "..-..",  // to
            "チ": "..-.",  "ち": "..-.",   // ti
            "リ": "--.",   "り": "--.",    // ri
            "ヌ": "....",  "ぬ": "....",   // nu
            "ル": "-.--.", "る": "-.--.",  // ru
            "ヲ": ".---",  "を": ".---",   // wo
            "ワ": "-.-",   "わ": "-.-",    // wa
            "カ": ".-..",  "か": ".-..",   // ka
            "ヨ": "--",    "よ": "--",     // yo
            "ョ": "--",    "ょ": "--",     // yo
            "タ": "-.",    "た": "-.",     // ta
            "レ": "---",   "れ": "---",    // re
            "ソ": "---.",  "そ": "---.",   // so
            "ツ": ".--.",  "つ": ".--.",   // tu
            "ッ": ".--.",  "っ": ".--.",   // tu
            "ネ": "--.-",  "ね": "--.-",   // ne
            "ナ": ".-.",   "な": ".-.",    // na
            "ラ": "...",   "ら": "...",    // ra
            "ム": "-",     "む": "-",      // mu
            "ウ": "..-",   "う": "..-",    // u
            "ヰ": ".-..-", "ゐ": ".-..-",  // yi
            "ノ": "..--",  "の": "..--",   // no
            "オ": ".-...", "お": ".-...",  // o
            "ク": "...-",  "く": "...-",   // ku
            "ヤ": ".--",   "や": ".--",    // ya
            "ャ": ".--",   "ゃ": ".--",    // ya
            "マ": "-..-",  "ま": "-..-",   // ma
            "ケ": "-.--",  "け": "-.--",   // ke
            "フ": "--..",  "ふ": "--..",   // fu
            "コ": "----",  "こ": "----",   // ko
            "エ": "-.---", "え": "-.---",  // e
            "テ": ".-.--", "て": ".-.--",  // te
            "ア": "--.--", "あ": "--.--",  // a
            "サ": "-.-.-", "さ": "-.-.-",  // sa
            "キ": "-.-..", "き": "-.-..",  // ki
            "ユ": "-..--", "ゆ": "-..--",  // yu
            "ュ": "-..--", "ゅ": "-..--",  // yu
            "メ": "-...-", "め": "-...-",  // me
            "ミ": "..-.-", "み": "..-.-",  // mi
            "シ": "--.-.", "し": "--.-.",  // si
            "ヱ": ".--..", "ゑ": ".--..",  // ye
            "ヒ": "--..-", "ひ": "--..-",  // hi
            "モ": "-..-.", "も": "-..-.",  // mo
            "セ": ".---.", "せ": ".---.",  // se
            "ス": "---.-", "す": "---.-",  // su
            "ン": ".-.-.", "ん": ".-.-.",  // n
            // 2. Kanas with dakuten
            "゛": "..", // Dakuten modifier
            // Katakanas        Hiraganas
            "ガ": ".-.. ..",     "が": ".-.. ..",    // ga
            "ギ": "-.-.. ..",    "ぎ": "-.-.. ..",   // gi
            "グ": "...- ..",     "ぐ": "...- ..",    // gu
            "ゲ": "-.-- ..",     "げ": "-.-- ..",    // ge
            "ゴ": "---- ..",     "ご": "---- ..",    // go
            "ザ": "-.-.- ..",    "ざ": "-.-.- ..",   // za
            "ジ": "--.-. ..",    "じ": "--.-. ..",   // zi
            "ズ": "---.- ..",    "ず": "---.- ..",   // zu
            "ゼ": ".---. ..",    "ぜ": ".---. ..",   // ze
            "ゾ": "---. ..",     "ぞ": "---. ..",    // zo
            "ダ": "-. ..",       "だ": "-. ..",      // da
            "ヂ": "..-. ..",     "ぢ": "..-. ..",    // di
            "ヅ": ".--. ..",     "づ": ".--. ..",    // du
            "デ": ".-.-- ..",    "で": ".-.-- ..",   // de
            "ド": "..-.. ..",    "ど": "..-.. ..",   // do
            "バ": "-... ..",     "ば": "-... ..",    // ba
            "ビ": "--..- ..",    "び": "--..- ..",   // bi
            "ブ": "--.. ..",     "ぶ": "--.. ..",    // bu
            "ベ": ". ..",        "べ": ". ..",       // be
            "ボ": "-.. ..",      "ぼ": "-.. ..",     // bo
            // 3. Kanas with handakuten
            "゜": "..--.", // Handakuten modifier
            // Katakanas        Hiraganas
            "パ": "-... ..--.",  "ぱ": "-... ..--.", // pa
            "ピ": "--..- ..--.", "ぴ": "--..- ..--.",// pi
            "プ": "--.. ..--.",  "ぷ": "--.. ..--.", // pu
            "ペ": ". ..--.",     "ぺ": ". ..--.",    // pe
            "ポ": "-.. ..--.",   "ぽ": "-.. ..--.",  // po
            // 4. Other characters in the Wabun code
            "－": ".--.-",   // -
            "ー": ".--.-",   // -
            "（": "-.--.-",  // (
            "）": ".-..-.",  // )
            "、": ".-.-.-",  // .
            "」": ".-.-..",  // \n

            // SKATS for Korean
            // The ARRL handbook for the radio amateur, 19-3 (1985)
            // https://archive.org/details/arrlhandbookforr0000unse_w7j4/page/n415/mode/2up
            "ㄱ": ".-..",    // kiyeok
            "ㄴ": "..-.",    // nieun
            "ㄷ": "-...",    // tikeut
            "ㄹ": "...-",    // rieul
            "ㅁ": "--",      // mieum
            "ㅂ": ".--",     // pieup
            "ㅅ": "--.",     // sios
            "ㅇ": "-.-",     // ieung
            "ㅈ": ".--.",    // cieuc
            "ㅊ": "-.-.",    // chieuch
            "ㅋ": "-..-",    // khieukh
            "ㅌ": "--..",    // thieuth
            "ㅍ": "---",     // phieuph
            "ㅎ": ".---",    // hieuh
            "ㅏ": ".",       // a
            "ㅐ": "--.-",    // ae
            "ㅑ": "..",      // ya
            "ㅒ": ".. ..-",  // yae
            "ㅓ": "-",       // eo
            "ㅔ": "-.--",    // e
            "ㅕ": "...",     // yeo
            "ㅖ": "... ..-", // ye
            "ㅗ": ".-",      // o
            "ㅛ": "-.",      // yo
            "ㅜ": "....",    // u
            "ㅠ": ".-.",     // yu
            "ㅡ": "-..",     // eu
            "ㅣ": "..-",     // i

            // Hebrew
            // The ARRL handbook for the radio amateur, 19-3 (1985)
            // https://archive.org/details/arrlhandbookforr0000unse_w7j4/page/n415/mode/2up
            "א": ".-",    // alef
            "ב": "-...",  // bet
            "בּ": "-...",  // dotted bet
            "ג": "--.",   // gimel
            "גּ": "--.",   // dotted gimel
            "ד": "-..",   // dalet
            "דּ": "-..",   // dotted dalet
            "ה": "---",   // he
            "ו": ".",     // vav
            "ז": "--..",  // zayin
            "ח": "....",  // chet
            "ט": "..-",   // tet
            "י": "..",    // yod
            "ך": "-.-",   // final kaf
            "ךּ": "-.-",   // dotted final kaf
            "כ": "-.-",   // kaf
            "כּ": "-.-",   // dotted kaf
            "ל": ".-..",  // lamed
            "ם": "--",    // final mem
            "מ": "--",    // mem
            "ן": "-.",    // final nun
            "נ": "-.",    // nun
            "ס": "-.-.",  // samekh
            "ע": ".---",  // ayin
            "ף": ".--.",  // final pe
            "ףּ": ".--.",  // final pe
            "פ": ".--.",  // pe
            "פּ": ".--.",  // dotted pe
            "ץ": ".--",   // final tsadi
            "צ": ".--",   // tsadi
            "ק": "--.-",  // qof
            "ר": ".-.",   // resh
            "ש": "...",   // dotless shin
            "שׁ": "...",   // right-dotted shin
            "שׂ": "...",   // left-dotted shin
            "ת": "-",     // dotless tav
            "תּ": "-",     // dotted tav

            // Arabic
            // The ARRL handbook for the radio amateur, 19-3 (1985)
            // https://archive.org/details/arrlhandbookforr0000unse_w7j4/page/n415/mode/2up
            // Unicode points were copied from “Isolated form”, and names from “Letter name” in
            // https://en.wikipedia.org/wiki/Arabic_alphabet#Table_of_basic_letters
            // TODO: add contextual forms
            "ا": ".-",     // ʾalif
            "ب": "-...",   // bāʾ/bah
            "ت": "-",      // tāʾ/tah
            "ث": "-.-.",   // thāʾ/thah
            "ج": ".---",   // jīm
            "ح": "....",   // ḥāʾ/ḥah
            "خ": "---",    // khāʾ/khah
            "د": "-..",    // dāl/dāʾ/dah
            "ذ": "--..",   // dhāl/dhāʾ/dhah
            "ر": ".-.",    // rāʾ/rah
            "ز": "---.",   // zāy/zayn/zāʾ/zah
            "س": "...",    // sīn
            "ش": "----",   // shīn
            "ص": "-..-",   // ṣād
            "ض": "...-",   // ḍād/ḍāʾ/ḍah
            "ط": "..-",    // ṭāʾ/ṭah
            "ظ": "-.--",   // ẓāʾ/ẓah
            "ع": ".-.-",   // ʿayn
            "غ": "--.",    // ghayn
            "ف": "..-.",   // fāʾ/fah
            "ق": "--.-",   // qāf
            "ڪ": "-.-",    // kāf/kāʾ/kah
            "ك": "-.-",    // kāf/kāʾ/kah
            "ل": ".-..",   // lām
            "م": "--",     // mīm
            "ن": "-.",     // nūn
            "ه": "..-..",  // hāʾ/hah
            "و": ".--",    // wāw
            "ے": "..",     // yāʾ/yah
            "ي": "..",     // yāʾ/yah
            "لا": ".-...-", // lām-alif (ligature)
            // other characters without a reference
            "ء": ".",      // hamzah
        };
        this.alphabet = alphabet;
        var el_len = {
            ".": 1, // dit
            "-": 3, // dah
            // letter space,
            // minus symbol space added after previous character,
            // and minutes symbol space added after letter space itself
            " ": 1,
        };

        this.controls_options = {
            "wpm_min": 5, "wpm_max": 50,
            "eff_min": 0, "eff_max": 50,
            "ews_min": 0, "ews_max": 5,
            "freq_min": 300, "freq_max": 1500,
            "edge_min": 1, "edge_max": 25,
            "volume_min": 0, "volume_max": 100
        };

        this.control_labels = {};
        this.control_inputs = {};

        this.wpm = 20;
        this.eff = 0;
        this.ews = 0;           // extra word space
        this.freq = 600;
        this.volume = 0.5;      // relative volume how CW is generated internally
        this.playvolume = 1;    // player volume (relative * player volume = total volume)
        this.q = 10;
        this.dotlen;
        this.playLength = 0;
        this.playStart = 0;
        this.playEnd = 0;
        this.playTiming = [];   // last generated text
        this.init_done = false;
        this.text = "";
        this.paused = true;
        this.progressbar = false;
        this.mode = 'audio';    // audio: AudioContext, embed: <audio> tag
        this.cgiurl = "https://cgi2.lcwo.net/cgi-bin/";
        this.real = false;  // If set to true, use Real speed, not PARIS
        this.vvv = false;
        this.prefix = "vvv = ";
        this.suffix = " +";
        this.textStart = 0;     // time when the actual text starts (without "vvv +" or startDelay, if activated)
        this.textEnd   = Number.MAX_VALUE;     // time when the actual text ends (i.e. without the "+")
        this.showSettings = false;
        this.startDelay = 0;    // delay in seconds before audio starts
        this.prosign = false;   // we're within a prosign (no letter spaces)
        this.timers = [];

        this.help_url = "https://fkurz.net/ham/jscwlib.html";   // Shows up in the settings dialog - to disable, change to null
        this.help_text = "jscwlib - Documentation";

        // see if volume is saved in localStorage
        try {
            var vl = parseFloat(localStorage.getItem("jscwlib_vol"));
            if (vl >= 0 && vl <= 1) {
                this.playvolume = vl;
            }
        }
        catch (e) {
            console.log("No volume in local storage.");
        }
        // see if Q is saved in localStorage
        try {
            var ql = parseFloat(localStorage.getItem("jscwlib_q"));
            if (ql >= 0 && ql <= 25) {
                this.q = ql;
            }
        }
        catch (e) {
            console.log("No Q in local storage.");
        }

        // override default parameters with values passed to the constructor
        if (params) {
            for (var p in params) {
                this[p] = params[p];
            }
        }

        try {
    	    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            console.log("AudioContext OK");
        }
        catch (e) {
            this.mode = 'embed';
            console.log("AudioContext not supported. Fall back to HTML audio element");
        }

        this.init = function() {
            if (this.mode == 'embed') {
                if (!this.player) {
                    this.player = document.createElement("audio");
                    document.body.appendChild(this.player);
                }
            }
            else {
                this.gainNode = this.audioCtx.createGain(); // this gainNode modulates the CW
                this.gainNodePlay = this.audioCtx.createGain(); // this gainNode is the overall volume
                this.gainNodeLimiter = this.audioCtx.createGain(); // this limits the osc output to avoid clipping with high Q filters

                this.oscillator = this.audioCtx.createOscillator();
                this.biquadFilter = this.audioCtx.createBiquadFilter();
                this.noiseFilterL = this.audioCtx.createBiquadFilter();
                this.noiseFilterH = this.audioCtx.createBiquadFilter();
                this.whiteNoise = this.audioCtx.createBufferSource();

                this.analyser = this.audioCtx.createAnalyser();
                this.analyser.fftSize = 32768 ;
                this.bufferLength = this.analyser.frequencyBinCount;
                this.dataArray = new Uint8Array(this.bufferLength);

                this.noiseFilterL.type = "lowpass";
                this.noiseFilterL.frequency.setValueAtTime(400, this.audioCtx.currentTime);
                this.noiseFilterL.Q.setValueAtTime(20, this.audioCtx.currentTime);

                this.noiseFilterH.type = "highpass";
                this.noiseFilterH.frequency.setValueAtTime(700, this.audioCtx.currentTime);
                this.noiseFilterH.Q.setValueAtTime(20, this.audioCtx.currentTime);

                var bufferSize = 2 * this.audioCtx.sampleRate;
                var noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
                var noise = noiseBuffer.getChannelData(0);
                for (var i = 0; i < bufferSize; i++) {
                        noise[i] = Math.random()*0.5 - 1;
                }

                this.whiteNoise.buffer = noiseBuffer;
                this.whiteNoise.loop = true;
//                this.whiteNoise.start(0);
                this.whiteNoise.connect(this.noiseFilterL);

                this.noiseFilterL.connect(this.noiseFilterH);
                this.noiseFilterH.connect(this.audioCtx.destination);

                this.biquadFilter.type = "lowpass";
                this.biquadFilter.frequency.setValueAtTime(500, this.audioCtx.currentTime);
                this.biquadFilter.Q.setValueAtTime(this.q, this.audioCtx.currentTime);

                this.oscillator.type = 'sine';
                this.oscillator.frequency.setValueAtTime(600, this.audioCtx.currentTime); // value in hertz

                this.oscillator.connect(this.gainNode);
                this.gainNode.connect(this.gainNodeLimiter);
                this.gainNodeLimiter.connect(this.biquadFilter);
                this.biquadFilter.connect(this.gainNodePlay);
                this.gainNodePlay.connect(this.analyser);
                this.analyser.connect(this.audioCtx.destination);

                this.gainNode.gain.value = 0;
                this.gainNodePlay.gain.value = this.playvolume;
                this.gainNodeLimiter.gain.value = 0.55;
                this.oscillator.start();

                this.setFreq(this.freq);
                this.setQ(this.q);
            }
            this.init_done = true;
        }

        this.getLength = function () {
            if (this.mode == 'audio') {
                return this.playLength;
            }
            else {
                if (this.player) {
                    return this.player.duration;
                }
                else {
                    return 0;
                }
            }
        }

        this.setFilter = function (f) {
            console.debug("setFilter f = " + f);
            this.biquadFilter.frequency.setValueAtTime(f, this.audioCtx.currentTime);
        }

        this.setQ = function (q) {
            console.log("setQ = " + q);
            // try storing Q in local storage
            try {
                localStorage.setItem('jscwlib_q', q);
            }
            catch (e) {
                console.log("localStorage not available. Not saving q.");
            }
            this.q = q;
            this.biquadFilter.Q.setValueAtTime(q, this.audioCtx.currentTime);
            // the filter gain depends on the Q - this will compensate for it
            // (values determined experimentally)
            this.gainNodeLimiter.gain.setValueAtTime(1.8 * Math.exp(-0.115 * q), this.audioCtx.currentTime);
            this.updateControls();
        }

        this.setReal = function (r) {
            console.log("setReal: " + r);
            this.real = r ? true : false;
        }

        this.getRemaining = function () {
            if (!this.init_done) {
                return 0;
            }
            if (this.mode == 'audio') {
                var r = this.playEnd - this.audioCtx.currentTime;
            }
            else {
                var r = this.player.duration - this.player.currentTime;
            }

            if (r >= 0) {
                return r;
            }
            else {
                return 0;
            }
        }

        this.getTime = function () {
            if (this.mode == 'audio') {
                var t = this.getLength() - this.getRemaining();
            }
            else {
                var t = this.player.currentTime;
            }
            if (t < 0) {
                return 0;
            }
            else {
                return t;
            }
        }

        this.getPlaytime = function() {
            return this.playLength;
        }

        this.setWpm = function (w) {
            console.log("setWpm = " + w);
            w = parseInt(w);
            this.wpm = w;
            if (this.mode == 'audio' && this.init_done) {
                this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
                this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
            }
            this.updateControls();
        }

        this.setEff = function (e) {
            console.log("setEff = " + e);
            if (this.mode == 'audio' && this.init_done) {
                this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
                this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
            }
            e = parseInt(e);
            this.eff = e;
            this.updateControls();
        }

        this.setEws = function (w) {
            console.log("setEws = " + w);
            w = parseFloat(w);
            this.ews = w;
            if (this.mode == 'audio' && this.init_done) {
                this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
                this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
            }
            this.updateControls();
        }

        this.setFreq = function(f) {
            console.log("setFreq: " + f);
            this.freq = f;
            if (this.mode == 'audio' && this.init_done) {
                this.oscillator.frequency.setValueAtTime(f, this.audioCtx.currentTime);
                this.setFilter(f);
            }
            this.updateControls();
        }

        this.setVolume = function(v) {
            this.playvolume = v;
            // try storing this in local storage
            try {
                localStorage.setItem('jscwlib_vol', v);
            }
            catch (e) {
                console.log("localStorage not available. Not saving volume");
            }
            this.updateControls();
            if (this.mode == 'audio' && this.init_done) {
                this.gainNodePlay.gain.setValueAtTime(v, this.audioCtx.currentTime);
            }
        }

        this.setStartDelay = function (s) {
            console.log("setStartDelay = " + s);
            this.startDelay = s;
        }

        this.setPrefix = function (p) {
            this.prefix = p;
        }

        this.setSuffix = function (s) {
            this.suffix = s;
        }

        this.enablePS = function (b) {
            this.vvv = b ? true : false;
        }

        this.updateControls = function () {

            if (this.onParamChange) {
                console.log("onParamChange");
                this.onParamChange();
            }

            if (this.control_labels["wpm"]) {
                this.control_labels["wpm"].innerHTML = this.wpm + "&nbsp;WpM";
            }
            if (this.control_labels["eff"]) {
                if (this.eff) {
                    this.control_labels["eff"].innerHTML = this.eff + "&nbsp;WpM";
                }
                else {
                    this.control_labels["eff"].innerHTML =  "&nbsp;(off)";
                }
            }
            if (this.control_labels["ews"]) {
                if (this.ews) {
                    this.control_labels["ews"].innerHTML = (this.ews + 1) + "&nbsp;&times;";
                }
                else {
                    this.control_labels["ews"].innerHTML = "&nbsp;(off)";
                }
            }
            if (this.control_labels["freq"]) {
                this.control_labels["freq"].innerHTML = this.freq + "&nbsp;Hz";
            }
            if (this.control_labels["edge"]) {
                this.control_labels["edge"].innerHTML = this.q + "&nbsp;";
            }
            if (this.control_labels["vol"]) {
                this.control_labels["vol"].innerHTML = Math.round(this.playvolume * 100) + "&nbsp;%";
            }

            this.refresh_download_link();
        }

        this.enableControls = function (obj, b) {
            console.log("enableControls = " + b);
            for (var p in obj.control_inputs) {
                if (p == "vol" || p == "edge" || p == "freq")
                    continue;
                obj.control_inputs[p].disabled = !b;
            }
        }

        this.oscilloscope = function(c) {
            var ctx = c.getContext("2d");
            var w = c.width;
            var h = c.height;
            this.analyser.getByteTimeDomainData(this.dataArray);
            ctx.fillStyle = 'rgb(200, 200, 200)';
            ctx.fillRect(0, 0, w, h);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgb(0, 0, 0)';
            ctx.beginPath();
            var sliceWidth = w * 1.0 / this.bufferLength;
            var x = 0;

            for(var i = 0; i < this.bufferLength; i++) {

                var v = this.dataArray[i] / 128.0;
                var y = v * h/2;

                if(i === 0) {
                    ctx.moveTo(x, y);
                }
                else {
                    ctx.lineTo(x, y);
                }
                x += sliceWidth;
            }
            ctx.lineTo(w, h/2);
            ctx.stroke()
        } // oscilloscope

        // draw last generated text on a canvas
        this.draw = function(c) {
            var ctx = c.getContext("2d");
            var w = c.width;
            var h = c.height;
            ctx.fillStyle= '#ffffff';
            ctx.fillRect(0, 0, w, h);

            if (this.playTiming.length == 0) {
                ctx.fillText('Nothing to draw', 0, 10);
                return;
            }

            // duration of last text
            var d = this.playTiming[this.playTiming.length-1]["t"];

            // pixels (width) per second, leave 10 pixels right and left
            var pps = (w - 20) / d;

            // draw!
            ctx.save();
            ctx.translate(10, h);
            ctx.scale(pps, -1);

            // draw seconds and minutes (if any)
            for (var i = 0; i < d; i++) {
                ctx.lineWidth = 1/pps;

                if (i == 0 || i % 60 == 0) {
                    ctx.lineWidth = 5/pps;
                }

                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, 9);
                ctx.stroke();
            }

            // for < 10 seconds, draw the dot lengths
            if (d < 10) {
                for (var i = 0; i < d; i += this.dotlen) {
                    ctx.beginPath();
                    ctx.moveTo(i, 9);
                    ctx.lineTo(i, 19);
                    ctx.stroke();
                }
            }

            ctx.fillStyle = '#ff00ff';
            for (var i = 0; i < this.playTiming.length-1; i++) {
                if (this.playTiming[i]["v"] > 0) {
                    ctx.fillRect(this.playTiming[i]["t"], 10, this.playTiming[i+1]["t"] - this.playTiming[i]["t"] , 5);
                }
            }
            ctx.restore();
        }

        this.calcSpeed = function () {

            if (this.eff > this.wpm) {
                this.eff = this.wpm;
            }

            var eff = this.eff;

            // real speed (not PARIS) => no farnsworth timing, eff = char speed
            if (this.real || this.eff == 0) {
                eff = this.wpm;
            }

            this.dotlen = 1.2 / this.wpm;   // ms
            this.effdotlen = 1.2 / eff;
            // stretch all pauses by this magic formula (fitted to a measured
            // set :) to get a good match. One day I will do the proper math!
            var stretch = (2.5 - 1.5/(Math.pow((this.wpm / eff),1.25)));
            this.fwdotlen = this.effdotlen  * stretch;
            this.letterspace = 3 * this.fwdotlen;
            this.wordspace = 7 * this.fwdotlen - this.letterspace;
        }

        this.setText = function(text) {
            text = text.replace(/\|W/g, "|z");
            this.text = text.toLowerCase();
            this.refresh_download_link();
        }

        this.setTextB64 = function (text) {
            try {
                text = atob(text);
                console.log("setText: Text is base64 encoded.");
            }
            catch (e){
                console.log("setText: Text is not base64 encoded.");
            }
            this.setText(text);
        }

        this.refresh_download_link = function() {
            if (this.btn_down) {
                this.btn_down.href = this.cgiurl + "cw.mp3?d=001&s=" + this.wpm + "&e=" + this.eff + "&f=" + this.freq + "&t=|W" + this.ews + " " + this.text.replace('|z', '|W');
                // Silently remove anything above 8k characters to avoid
                // hitting the maximum request URI length of Apache running ebook2cw.
                if (this.btn_down.href.length > 8000) {
                    console.log("Warning: Download URL truncated, requested URL was too long.");
                    this.btn_down.href = this.btn_down.href.substr(0, 8000);
                }
            }
        }

        this.play = function(playtext) {
            if (!this.init_done) {
                this.init();
            }

            if (this.onPlay) {
                console.log("OnPlay");
                this.onPlay();
            }


            this.paused = false;

            var text = playtext ? playtext : this.text;
            this.text = text;

            // fallback to HTML5
            if (this.mode == 'embed') {
                this.player.src = this.cgiurl + "cw.mp3?s=" + this.wpm + "&e=" + this.eff + "&f=" + this.freq + "&t=|W" + this.ews + " " + text + "%20%20%20%20%5E";
                this.player.play();
                console.log(this.player);
                return;
            }

            /*
             * ugly: in ebook2cw we use |Wx to set the extra word spacing. Here
             * we convert everything to lowercase so it becomes |w which
             * changes wpm. So at this point we change |W to |z and later
             * handle |z commands instead of |W
             */
            text = text.replace(/\|W/g, "|z");

            text = text.toLowerCase();
            this.setText(text);

            // generate array with all events on a timeline.
            // possible events are
            // 1) changes of volume (the Morse "keying") itself
            // 2) changes of tone frequency
            // returns an an object:
            // { "nc": num_chars, "length": length_seconds, "timings": timing_array, "paris": paris_speed }

            if (this.vvv && !this.real) {
                text = this.prefix + text + this.suffix;
            }
            var ret = this.gen_morse_events(text);

            // if we want prefix/suffix *and* real characters, we need to
            // calculate generate the correct timing for the text *without*
            // prefix/suffix first (which we did above), and now re-build
            // it at the calculated PARIS speed, with prefix/suffix added.
            if (this.vvv && this.real) {
                this.real = false;
                var wpm_set = this.wpm;
                var eff_set = this.eff;
                this.wpm = ret["paris"];
                this.eff = ret["paris"];
                ret = this.gen_morse_events(this.prefix + text + this.suffix);
                // restore settings
                this.wpm = wpm_set;
                this.eff = eff_set;
                this.real = true;
                this.updateControls();
            }

            var out = ret["timings"];

            if (!out.length) {
                return;
            }
            this.playTiming = out;
            this.fillAudioBuffers();
            this.setTimers();
        } // play

        this.fillAudioBuffers = function() {
            var out = this.playTiming;
            this.playStart = this.audioCtx.currentTime + 0.01;

            // if the generated audio is very long, we need to add an extra
            // delay of about one second for every 10k elements in the out
            // array. For short text, this is not noticeable at all.
            this.playStart += out.length/10000;

            for (var i = 0; i < out.length; i++) {
                var s = this.playStart + out[i]['t'];
                // volume change
                if (out[i].hasOwnProperty('v')) {
                    this.gainNode.gain.setValueAtTime(out[i]['v'], s);
                }
                // freq change
                if (out[i].hasOwnProperty('f')) {
                    this.oscillator.frequency.setValueAtTime(out[i]['f'], s); // value in hertz
                    this.biquadFilter.frequency.setValueAtTime(out[i]['f'], s);
                }
            }

            this.playLength = out[out.length-1]['t'];
            this.playEnd = this.playStart + this.playLength;
        } // fillAUdioBuffers

        this.setTimers = function() {
            var out = this.playTiming;
            var offset = this.audioCtx.currentTime - this.playStart;

            // if there's a "lamp" element, we generate visual CW.
            var lamp = document.getElementById('lamp')
            var turn_lamp_off = function() { lamp.style.backgroundColor = 'white';};
            var turn_lamp_on = function() { lamp.style.backgroundColor = 'yellow';};

            for (var i = 0; i < out.length; i++) {
                var t = (out[i]['t'] - offset) * 1000;
                if (t < 0) {
                    continue;
                }
                if (out[i].hasOwnProperty('c')) {
                    this.setCharacterCb(out[i]['c'], t);
                }
                // volume change
                if (out[i].hasOwnProperty('v')) {
                    var tmp;
                    if (lamp) {
                        if (out[i]['v'] == 0) {
                            this.timers.push(setTimeout(turn_lamp_off, t));
                        }
                        else {
                            this.timers.push(setTimeout(turn_lamp_on, t));
                        }
                    }
                }
            }

            if (this.onFinished) {
                this.timers.push(setTimeout(this.onFinished, this.getRemaining() * 1000));
            }
        } // setTimers

        this.resetTimers = function() {
            this.timers.splice(0).forEach(clearTimeout);
        }

        // pause simply suspends this audioCtx
        this.pause = function () {
            if (this.audioCtx.state === "running") {
                this.paused = true;
                this.audioCtx.suspend();
                this.resetTimers();
            }
            else {
                this.paused = false;
                this.audioCtx.resume();
                this.setTimers();
            }
            console.log("paused: " + this.paused);
        }

        this.stop = function() {
            if (this.mode == 'audio') {
                this.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
                this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
                this.playEnd = 0;
                this.resetTimers();
            }
            else {
                this.player.pause();
            }
        }

        // dummy function - will be called each time a character starts
        // playing, and will receive the position in the string and the
        // character itself in "c"
        this.onCharacterPlay = function (c) {
            // console.log(c);
        }

        this.setCharacterCb = function (c, t) {
            var cb = this.onCharacterPlay;
            var timer = setTimeout(function() { cb(c); }, t);
            this.timers.push(timer);
        }

        // in: a single character (except space) and a start time
        // out: array of timing for this character w/o spaces after the last element, starting at "time"
        this.gen_morse_timing = function(c, time) {
            var out = [];
            var l = alphabet[c];

            if (!l) {
                console.log("Don't know CW for character: '" + c + "', replacing with space.");
                l = " ";
            }

            for (var j = 0; j < l.length; j++) {
                var el = l.substr(j,1);  // dit, dah or letter space
                if (el != " ")
                    out.push({"t": time, "v": this.volume});
                time += this.dotlen * el_len[el];
                out.push({"t": time, "v": 0});
                // symbol space
                time += this.dotlen;
            }

            return out;
        }

        this.gen_morse_events = function(text) {
            var out = [];
            var time = this.startDelay;

            this.textStart = time;
            this.textEnd = Number.MAX_VALUE;

            this.setFreq(this.freq);    // reset freq (might have been changed by |f command)
            this.calcSpeed();   // set this.dotlen, effdotlen, fwdotlen, letterspace, worspace

            // number of actual characters (not including control sequences)
            var nc = 0;

            for (var i = 0; i < text.length; i++) {
                var c = text.substr(i, 1);
                if (c == "|") { // text command
                    i++;
                    c = text.substr(i, 1);
                    i++;
                    var arg = text.substr(i).split(" ");
                    i+= arg[0].length;
                    switch (c) {
                        case 'f':
                            out = out.concat({"t": time, "f": arg[0]});
                            console.log("Setting f = " + arg[0] + " at " + time);
                            break;
                        case 'w':
                            if (arg[0] > 1) {
                                this.wpm = arg[0];
                                this.calcSpeed();
                            }
                            break;
                        case 'e':
                            this.eff = arg[0];
                            this.calcSpeed();
                            break;
                        case 'z':   // |W => extra word spacing
                            this.ews = arg[0];
                            console.log("EWS = " + this.ews);
                            this.calcSpeed();
                            break;
                        case 'v':
                            this.volume = parseFloat(arg[0])/100;
                            break;
                        case 's':
                            time += arg[0] / 1000;
                            break;
                        default:
                            //alert(c);
                    }
                }
                else if (c == '<') {
                    this.prosign = true;
                }
                else if (c == '>') {
                    this.prosign = false;
                    time += 2*this.dotlen;
                }
                else if (c != " ") {
                    var ti = this.gen_morse_timing(c, time);
                    ti[0]['c'] = {"n": i, "c": c };  // in the first element, include the character and the position, so we can fire the onCharacterPlay function
                    out = out.concat(ti);
                    time = out[out.length - 1]['t'];
                    if (!this.prosign) {
                        time += this.letterspace;
                    }
                    else {
                        time += this.dotlen;
                    }
                    nc++;
                }
                else {  // word space
                    if (nc == 0) {
                        // when the text starts with a (word) space, add a
                        // letter space that would have been added by the
                        // previous letter (in previous else-if block)
                        time += this.letterspace;
                    }
                    var ti = this.gen_morse_timing(c, time);
                    ti[0]['c'] = {"n": i, "c": c };  // in the first element, include the character and the position, so we can fire the onCharacterPlay function
                    out = out.concat(ti);
                    time += this.wordspace;  // NOTE: this.wordspace is actually a wordspace minus a letter space; this compensates the fact that each letter is followed by a letter space
                    if (this.ews) {
                        time += (this.wordspace + this.letterspace) * this.ews;
                    }
                }

                // is the prefix over?
                if (this.vvv && i == (this.prefix.length - 1)) {
                    this.textStart = time;
                }
                // is the suffix beginning?
                if (this.vvv && i == text.length - this.suffix.length) {
                    this.textEnd = time;
                } // or are we simply at the end?
                else if (!this.vvv && i == (text.length - 1)) {
                    this.textEnd = time;
                }
            }

            // real characters requested, not PARIS.
            // this means we need to multiply the
            // PARIS timing by a factor, which we now
            // calculate
            if (this.real == true) {
                // length of generated CW (last element end)
                var l = out[out.length-1]['t'];
                console.log("Characters: " + nc);
                console.log("Length: " + l);
                var real = nc / (l/60) / 5;
                console.log("Real speed words/min: " + real);
                var mult = this.wpm / real;
                console.log("mult " + mult);
                for (var i = 0; i < out.length; i++) {
                    out[i]['t'] = out[i]['t'] / mult;
                }
                this.paris = this.wpm * mult;
                this.textStart /= mult;
                this.textEnd /= mult;
            }
            else {
                this.paris = this.eff;
            }
            console.log("Equivalent PARIS speed = " + this.paris);

            return { "nc": nc, "paris": this.paris, "length": time, "timings": out };
        } // gen_morse_events

        this.setProgressbar = function(pb, l) {
            console.log("setProgressbar");
            this.progressbar = pb;
            this.progresslabel = l;
            window.setInterval(this.progressbarUpdate, 100, this)
        }

        this.progressbarUpdate = function (obj) {
            if (obj.progressbar) {
                if (obj.mode == 'audio') {
                    obj.progressbar.max = obj.getLength();
                    obj.progressbar.value = obj.getLength() - obj.getRemaining();
                }
                else {
                    try {
                        obj.progressbar.max =  obj.player.duration;
                        obj.progressbar.value = obj.player.currentTime;
                    }
                    catch (e) {
                        return;
                    }
                }
                var sec = obj.progressbar.value;

                sec -= obj.textStart;   // start in negative time if we have vvv prefx
                var sign = sec >= 0 ? "&nbsp;" : "-";
                sec = Math.abs(sec);

                obj.progresslabel.innerHTML = obj.fmtTime(sec, sign) + " /" + obj.fmtTime(obj.getLength() - obj.textStart,"");

                if (obj.paused || obj.getRemaining() == 0) {
                    if (obj.btn_pp.src != play_svg) {
                        obj.btn_pp.src = play_svg;
                        obj.enableControls(obj, true);
                   }
                }
                else {
                    if (obj.btn_pp.src != pause_svg) {
                        obj.btn_pp.src = pause_svg;
                        obj.enableControls(obj, false);
                    }
                }
            }
        }

        this.fmtTime = function(sec, sign) {
            var min = 0;
            while (sec > 60) {
                min++;
                sec -= 60;
            }

            if (sign == "-") {
                sec = Math.ceil(sec);
            }
            else {
                sec = Math.floor(sec);
            }

            if (sec < 10) {
                sec = "0" + sec;
            }

            return " " + sign + min + ":" + sec;
        }


        // render a player with play/pause button to element "el"
        this.renderPlayer = function(el, obj) {
            var el = document.getElementById(el);
            el.innerHTML = "";
            el.style.width = '220px';
            el.style.borderWidth = 'thin';
            el.style.borderStyle= 'dashed';
            el.style.padding = '6px';
            el.style.margin= '6px';
            el.style.fontFamily = 'Ubuntu,calibri,tahoma,arial,sans-serif';

            var pb = document.createElement("progress");
            pb.style.width = '215px';
            pb.style.height = '15px';
            pb.id = "pb";

            var l = document.createElement("label");
            l.htmlFor =  "pb";
            l.innerHTML= "0:00 ";
            l.style.fontSize = "12px";
            l.style.fontWeight = "normal";
            l.style.display = "inline-block";

            obj.setProgressbar(pb, l);

            var btn_pp = document.createElement("img");
            btn_pp.src = play_svg;
            btn_pp.title = "Play / Pause";
            btn_pp.style.borderRadius = "3px";
            btn_pp.style.backgroundColor = "#dadada";
            btn_pp.style.cursor = "pointer";
            btn_pp.style.border = "1px solid #555555";
            btn_pp.style.textAlign = "center";
            btn_pp.style.padding = "0px 0px";
            btn_pp.style.margin = "4px";
            btn_pp.style.display = "inline-block";
            btn_pp.style.verticalAlign = "middle";
            btn_pp.style.textDecoration = "none";
            btn_pp.style.color = "#000000";
            btn_pp.style.width = "25px";
            btn_pp.style.height = "25px";
            obj.btn_pp = btn_pp;
            btn_pp.onclick = function () {
                if (obj.getRemaining()) {
                    obj.pause();
                }
                else {
                    obj.play();
                }
            }
            var btn_stop = document.createElement("img");
            btn_stop.title = obj.text;
            btn_stop.style.borderRadius = "3px";
            btn_stop.style.backgroundColor = "#dadada";
            btn_stop.style.cursor = "pointer";
            btn_stop.style.border = "1px solid #555555";
            btn_stop.style.textAlign = "center";
            btn_stop.style.padding = "0px 0px";
            btn_stop.style.margin = "4px";
            btn_stop.style.display = "inline-block";
            btn_stop.style.textDecoration = "none";
            btn_stop.style.verticalAlign = "middle";
            btn_stop.style.color = "#000000";
            btn_stop.src = stop_svg;
            btn_stop.title = "Stop";
            btn_stop.style.width = "25px";
            btn_stop.style.height = "25px";
            btn_stop.onclick = function () {
                obj.stop();
            }
            var btn_down = document.createElement("a");
            var btn_down_img = document.createElement("img");
            btn_down_img.style.borderRadius = "3px";
            btn_down_img.style.backgroundColor = "#dadada";
            btn_down_img.style.cursor = "pointer";
            btn_down_img.style.border = "1px solid #555555";
            btn_down_img.style.textAlign = "center";
            btn_down_img.style.padding = "0px 0px";
            btn_down_img.style.margin = "4px";
            btn_down_img.style.display = "inline-block";
            btn_down_img.style.verticalAlign = "middle";
            btn_down_img.style.textDecoration = "none";
            btn_down_img.style.color = "#000000";
            btn_down_img.src = download_svg;
            btn_down_img.style.width = "25px";
            btn_down_img.style.height = "25px";
            btn_down.appendChild(btn_down_img);
            btn_down.title = "Download MP3";
            obj.btn_down = btn_down;
            btn_down.onclick = function () {
                obj.setText(obj.text);
            }

            var btn_set = document.createElement("a");
            btn_set.style.position = "relative";
            btn_set.style.display = "inline-block";

            var btn_set_img = document.createElement("img");
            btn_set_img.style.borderRadius = "3px";
            btn_set_img.style.backgroundColor = "#dadada";
            btn_set_img.style.cursor = "pointer";
            btn_set_img.style.border = "1px solid #555555";
            btn_set_img.style.textAlign = "center";
            btn_set_img.style.padding = "0px 0px";
            btn_set_img.style.margin = "4px";
            btn_set_img.style.display = "inline-block";
            btn_set_img.style.verticalAlign = "middle";
            btn_set_img.style.textDecoration = "none";
            btn_set_img.style.color = "#000000";
            btn_set_img.src = settings_svg;
            btn_set_img.style.width = "25px";
            btn_set_img.style.height = "25px";
            obj.btn_set_img = btn_set_img;

            // popup dialog for settings
            var pop = document.createElement("span");
            pop.style.width = "300px";
            pop.style.color = '#000000';
            pop.style.backgroundColor = '#eaeaea';
            pop.style.borderRadius = "6px";
            pop.style.borderWidth = 'thin';
            pop.style.borderStyle= 'solid';
            pop.style.position = "absolute";
            pop.style.zIndex = "1";
            pop.style.top = "30px";
            pop.style.left = "30px";
            pop.style.padding = "5px 5px";
            pop.style.fontSize = "12px";
            pop.style.visibility = "hidden";
            pop.innerHTML = '<b>Settings</b>';
            obj.pop = pop;

            // controls go into a table

            var tbl = document.createElement('table');

            // speed
            var speed = document.createElement("input");
            speed.id = "speed";
            speed.type = "range";
            speed.min = obj.controls_options["wpm_min"];
            speed.max = obj.controls_options["wpm_max"];
            speed.value = obj.wpm;
            speed.step = 1;
            speed.style.display = "inline-block";
            speed.style.verticalAlign = "middle";
            speed.style.width = "150px";
            speed.onchange = function () { obj.setWpm(this.value); }
            speed.oninput = function () { obj.setWpm(this.value); }

            var speed_label = document.createElement("label");
            speed_label.htmlFor = "speed";
            speed_label.style.fontSize = "12px";
            speed_label.innerHTML = "0 WpM";

            obj.control_labels["wpm"] = speed_label;
            obj.control_inputs["wpm"] = speed;

            var tr = tbl.insertRow();
            var td = tr.insertCell();
            td.appendChild(document.createTextNode("Speed:"));
            td = tr.insertCell();
            td.appendChild(speed);
            td = tr.insertCell();
            td.appendChild(speed_label);

            // eff
            var eff = document.createElement("input");
            eff.id = "eff";
            eff.type = "range";
            eff.min = obj.controls_options["eff_min"];
            eff.max = obj.controls_options["eff_max"];
            eff.value = obj.eff;
            eff.step = 1;
            eff.style.display = "inline-block";
            eff.style.verticalAlign = "middle";
            eff.style.width = "150px";
            eff.onchange = function () { obj.setEff(this.value); }
            eff.oninput = function () { obj.setEff(this.value); }

            var eff_label = document.createElement("label");
            eff_label.htmlFor = "eff";
            eff_label.style.fontSize = "12px";
            eff_label.innerHTML = "0 WpM";

            obj.control_labels["eff"] = eff_label;
            obj.control_inputs["eff"] = eff;

            tr = tbl.insertRow();
            td = tr.insertCell();
            td.appendChild(document.createTextNode("eff. Speed:"));
            td = tr.insertCell();
            td.appendChild(eff);
            td = tr.insertCell();
            td.appendChild(eff_label);

            // ews
            var ews = document.createElement("input");
            ews.id = "ews";
            ews.type = "range";
            ews.min = obj.controls_options["ews_min"];
            ews.max = obj.controls_options["ews_max"];
            ews.value = obj.ews;
            ews.step = 0.1;
            ews.style.display = "inline-block";
            ews.style.verticalAlign = "middle";
            ews.style.width = "150px";
            ews.onchange = function () { obj.setEws(this.value); }
            ews.oninput = function () { obj.setEws(this.value); }

            var ews_label = document.createElement("label");
            ews_label.htmlFor = "ews";
            ews_label.style.fontSize = "12px";
            ews_label.innerHTML = "0";

            obj.control_labels["ews"] = ews_label;
            obj.control_inputs["ews"] = ews;

            tr = tbl.insertRow();
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Word space:"));
            td = tr.insertCell();
            td.appendChild(ews);
            td = tr.insertCell();
            td.appendChild(ews_label);

            // freq
            var freq = document.createElement("input");
            freq.id = "freq";
            freq.type = "range";
            freq.min = obj.controls_options["freq_min"];
            freq.max = obj.controls_options["freq_max"];
            freq.value = obj.freq;
            freq.step = 1;
            freq.style.display = "inline-block";
            freq.style.verticalAlign = "middle";
            freq.style.width = "150px";
            freq.onchange = function () { obj.setFreq(this.value); }
            freq.oninput = function () { obj.setFreq(this.value); }

            var freq_label = document.createElement("label");
            freq_label.htmlFor = "freq";
            freq_label.style.fontSize = "12px";
            freq_label.innerHTML = "600 Hz";

            obj.control_labels["freq"] = freq_label;
            obj.control_inputs["freq"] = freq;

            tr = tbl.insertRow();
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Frequency:"));
            td = tr.insertCell();
            td.appendChild(freq);
            td = tr.insertCell();
            td.appendChild(freq_label);

            // edge
            var edge = document.createElement("input");
            edge.id = "edge";
            edge.type = "range";
            edge.min = obj.controls_options["edge_min"];
            edge.max = obj.controls_options["edge_max"];
            edge.value = obj.edge;
            edge.step = 1;
            edge.style.display = "inline-block";
            edge.style.verticalAlign = "middle";
            edge.style.width = "150px";
            edge.onchange = function () { obj.setQ(this.value); }
            edge.oninput = function () { obj.setQ(this.value); }

            var edge_label = document.createElement("label");
            edge_label.htmlFor = "edge";
            edge_label.style.fontSize = "12px";
            edge_label.innerHTML = "10";

            obj.control_labels["edge"] = edge_label;
            obj.control_inputs["edge"] = edge;

            tr = tbl.insertRow();
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Edge:"));
            td = tr.insertCell();
            td.appendChild(edge);
            td = tr.insertCell();
            td.appendChild(edge_label);

            // volume
            var vol = document.createElement("input");
            vol.id = "vol";
            vol.type = "range";
            vol.min = obj.controls_options["volume_min"];
            vol.max = obj.controls_options["volume_max"];
            vol.value = obj.playvolume * 100;
            vol.step = 1;
            vol.style.display = "inline-block";
            vol.style.verticalAlign = "middle";
            vol.style.width = "150px";
            vol.onchange = function () { obj.setVolume(this.value/100); }
            vol.oninput = function () { obj.setVolume(this.value/100); }

            var vol_label = document.createElement("label");
            vol_label.htmlFor = "vol";
            vol_label.style.fontSize = "12px";
            vol_label.innerHTML = "50%";

            obj.control_labels["vol"] = vol_label;
            obj.control_inputs["vol"] = vol;

            tr = tbl.insertRow();
            td = tr.insertCell();
            td.appendChild(document.createTextNode("Volume:"));
            td = tr.insertCell();
            td.appendChild(vol);
            td = tr.insertCell();
            td.appendChild(vol_label);

            if (this.help_url) {
                tr = tbl.insertRow();
                td = tr.insertCell();
                td.style.textAlign = 'end';
                td.colSpan = 3;
                var a = document.createElement('a');
                var t = document.createTextNode(this.help_text);
                a.style.fontSize = '11px';
                a.href = this.help_url;
                a.appendChild(t);
                td.appendChild(a);
            }

            pop.appendChild(tbl);

            btn_set.appendChild(pop);
            btn_set.appendChild(btn_set_img);
            btn_set.title = "Settings";
            obj.btn_set = btn_set;
            btn_set_img.onclick = function () {
                obj.toggle_settings();
            }

            obj.updateControls();

            el.appendChild(pb);
            el.appendChild(btn_stop);
            el.appendChild(btn_pp);
            el.appendChild(btn_down);
            el.appendChild(btn_set);
            el.appendChild(l);
            this.el = el;
        }

        this.toggle_settings = function () {
            this.showSettings = !this.showSettings;

            if (this.showSettings) {
                console.log("show");
                this.pop.style.visibility = "visible";
                this.btn_set_img.src = settings_open_svg;
            }
            else {
                console.log("hide");
                this.btn_set_img.src = settings_svg;
                this.pop.style.visibility = "hidden";
            }
        }




    } // class jscw

