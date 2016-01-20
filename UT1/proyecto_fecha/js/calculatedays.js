function calculateDaysSinceEpoch(date) {
    var ERROR_FORMAT = "Por favor, introducir la fecha en el formato " +
        "solicitado",
        ERROR_DATE = "La fecha introducida no es válida",
        numberDays,
        errorDate,
        firstYear = 1970,
        day = +(date[0] + date[1]),
        month = date[2] + date[3] + date[4],
        year = +(date[5] + date[6] + date[7] + date[8]),
        isLeap = (!(year % 4) && ((year % 100) || !(year % 400))),
        shortMonth = (day > 30),
        validDay = (day > 0 && day <= 31 && date[0] !== " " &&
        date[1] !== " "),
        validYear = year >= 1970,
        errorFormat = (date[5] === " " || date[8] === " ");
    switch (month) {
    case "jan":
        month = 0;
        break;
    case "feb":
        month = 1;
        if (isLeap) {
            errorDate = day > 29;
        } else {
            errorDate = day > 28;
        }
        break;
    case "mar":
        month = 2;
        break;
    case "apr":
        month = 3;
        errorDate = shortMonth;
        break;
    case "may":
        month = 4;
        break;
    case "jun":
        month = 5;
        errorDate = shortMonth;
        break;
    case "jul":
        month = 6;
        break;
    case "aug":
        month = 7;
        break;
    case "sep":
        month = 8;
        errorDate = shortMonth;
        break;
    case "oct":
        month = 9;
        break;
    case "nov":
        month = 10;
        errorDate = shortMonth;
        break;
    case "dec":
        month = 11;
        break;
    default:
        errorFormat = true;
        break;
    }
    if (!errorFormat && validDay && year > 0 && !date[9]) {
        if (!errorDate && validYear) {
            numberDays = day;
            while (month > 0) {
                if (month === 4 || month === 6 || month === 9 ||
                        month === 11) {
                    numberDays = numberDays + 30;
                } else {
                    if (month === 2) {
                        if (isLeap) {
                            numberDays = numberDays + 29;
                        } else {
                            numberDays = numberDays + 28;
                        }
                    } else {
                        numberDays = numberDays + 31;
                    }
                }
                month = month - 1;
            }
            year = year - 1;
            while (year >= firstYear) {
                if (!(year % 4) && ((year % 100) || !(year % 400))) {
                    numberDays = numberDays + 366;
                } else {
                    numberDays = numberDays + 365;
                }
                year = year - 1;
            }
            numberDays = numberDays - 1;
        } else {
            numberDays = ERROR_DATE;
        }
    } else {
        numberDays = ERROR_FORMAT;
    }
    return numberDays;
}