function translateWord(word) {
    var solution = "",
        i = 0,
        ERROR = "Datos invalidos";
    do {
        switch (word[i]) {
        case "a":
        case "A":
            solution = solution + "01";
            break;
        case "b":
        case "B":
            solution = solution + "02";
            break;
        case "c":
        case "C":
            solution = solution + "03";
            break;
        case "d":
        case "D":
            solution = solution + "04";
            break;
        case "e":
        case "E":
            solution = solution + "05";
            break;
        case "f":
        case "F":
            solution = solution + "06";
            break;
        case "g":
        case "G":
            solution = solution + "07";
            break;
        case "h":
        case "H":
            solution = solution + "08";
            break;
        case "i":
        case "I":
            solution = solution + "09";
            break;
        case "j":
        case "J":
            solution = solution + "10";
            break;
        case "k":
        case "K":
            solution = solution + "11";
            break;
        case "l":
        case "L":
            solution = solution + "12";
            break;
        case "m":
        case "M":
            solution = solution + "13";
            break;
        case "n":
        case "N":
            solution = solution + "14";
            break;
        case "ñ":
        case "Ñ":
            solution = solution + "15";
            break;
        case "o":
        case "O":
            solution = solution + "16";
            break;
        case "p":
        case "P":
            solution = solution + "17";
            break;
        case "q":
        case "Q":
            solution = solution + "18";
            break;
        case "r":
        case "R":
            solution = solution + "19";
            break;
        case "s":
        case "S":
            solution = solution + "20";
            break;
        case "t":
        case "T":
            solution = solution + "21";
            break;
        case "u":
        case "U":
            solution = solution + "22";
            break;
        case "v":
        case "V":
            solution = solution + "23";
            break;
        case "w":
        case "W":
            solution = solution + "24";
            break;
        case "x":
        case "X":
            solution = solution + "25";
            break;
        case "y":
        case "Y":
            solution = solution + "26";
            break;
        case "z":
        case "Z":
            solution = solution + "27";
            break;
        default:
            word = "";
            solution = ERROR;
        }
        i = i + 1;
    } while (word[i]);
    return solution;
}
