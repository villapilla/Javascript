function extractValue(searchString, varName) {
    var word = "",
        positionChar = searchString.indexOf(varName) + varName.length + 1;
    if ((searchString[searchString.indexOf(varName) - 1] === "?" ||
            searchString[searchString.indexOf(varName) - 1] === "&") &&
            searchString[positionChar - 1] === "=") {
        while (searchString[positionChar] !== "&" &&
                searchString[positionChar]) {
            word += searchString[positionChar];
            positionChar += 1;
        }
    } else {
        word = "";
    }
    return word;
}

function checkNumberPlate(numberPlate) {
    var template = new RegExp("^[0-9]{4}[-]{1}[A-Z]{3}$|" +
        "^[A-Z]{1,2}[-]{1}[0-9]{4}[-]{1}[A-Z]{1,2}$", "i");
    return (template.test(numberPlate));
}

function checkLastTrevDate(date, today) {
    var dateInsert,
        diffDate,
        day = +(date[0] + date[1]),
        month = date[2] + date[3] + date[4],
        year = +(date[5] + date[6] + date[7] + date[8]),
        validDay = (day > 0 && day <= 31 && date[0] !== " " &&
        date[1] !== " "),
        validYear = (date[5] !== " " && date[8] !== " " && year > 0 &&
        !date[9]),
        invalidMonth = (MONTH_STRING.indexOf(month)) % 3;
    if (!invalidMonth && validDay && validYear) {
        dateInsert = new Date(year, (MONTH_STRING.indexOf(month) / 3), day);
        if (dateInsert.getTime() > today.getTime()) {
            diffDate = -1;
        } else {
            diffDate = Math.floor((today.getTime() - dateInsert.getTime()) /
                (1000 * 3600 * 24));
        }
    } else {
        diffDate = -1;
    }
    return diffDate;
}

function getMomentOfDay(now) {
    var momentOfDay,
        hour = now.getHours();
    if (hour >= 0 && hour < 13) {
        momentOfDay = MORNING_GREETING_MSG;
    } else {
        if (hour >= 13 && hour < 20) {
            momentOfDay = EVENING_GREETING_MSG;
        } else {
            momentOfDay = NIGHT_GREETING_MSG;
        }
    }
    return momentOfDay;
}

function randomBusiness() {
    var splitBusiness = BUSINESS.split("|"),
        random = Math.floor(Math.random() * (splitBusiness.length));
    return splitBusiness[random];
}

function getSystem(system) {
    var operativeSystem;
    if (system.indexOf('Ubuntu') !== -1) {
        operativeSystem = "Ubuntu";
    } else {
        if (system.indexOf('Linux') !== -1) {
            operativeSystem = "Linux";
        } else {
            if (system.indexOf('Windows') !== -1) {
                operativeSystem = "Windows";
            } else {
                if (system.indexOf('Mac') !== -1) {
                    operativeSystem = "Macintosh";
                } else {
                    operativeSystem = "No se pudo detectar";
                }
            }
        }
    }
    return operativeSystem;
}

function getNavigator(browser) {
    var agent;
    if (browser.indexOf('MSIE') !== -1) {
        agent = "Internet Explorer ";
    } else {
        if (browser.indexOf("Chromium") !== -1) {
            agent = "Chromium";
        } else {
            if (browser.indexOf('Iceweasel') !== -1) {
                agent = "Iceweasel ";
            } else {
                if (browser.indexOf('Firefox') !== -1) {
                    agent = "Mozilla Firefox ";
                } else {
                    if (browser.indexOf('OPR') !== -1) {
                        agent = "Opera ";
                    } else {
                        if (browser.indexOf('Chrome') !== -1) {
                            agent = "Google Chrome ";
                        } else {
                            agent = "Navegador no idenficado ";
                        }
                    }
                }
            }
        }
    }
    return agent;
}

function getSystemInformation() {
    var userAgent = window.navigator.userAgent;
    return ("Navegador: " + getNavigator(userAgent) +
        "; Sistema Operativo: " + getSystem(userAgent));
}
