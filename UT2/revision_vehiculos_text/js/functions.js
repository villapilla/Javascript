(function (exports) {
    var globals = require("./globals.js");

    exports.extractValue = function (haystack, needle) {
        var word = "",
            positionChar = haystack.indexOf(needle) + needle.length + 1;
        if(haystack[haystack.indexOf(needle) - 1] === "?" || haystack[haystack.indexOf(needle) - 1] === "&") {
            while (haystack[positionChar] !== "&" && haystack[positionChar]) {
                word += haystack[positionChar];
                positionChar += 1;
            }
        } else {
            word = "";
        }
        return word;
    };

    exports.checkNumberPlate = function (numberPlate) {
        var template = new RegExp('^[0-9]{4}[-]{1}[A-Z]{3}$|^[A-Z]{1,2}[-]{1}[0-9]{4}[-]{1}[A-Z]{1,2}$', 'i');
        return (template.test(numberPlate));
    };

    exports.checkLastTrevDate = function (date) {
        var dateInsert,
            diffDate,
            day = +(date[0] + date[1]),
            month = date[2] + date[3] + date[4],
            year = +(date[5] + date[6] + date[7] + date[8]),
            validDay = (day > 0 && day <= 31 && date[0] !== " " &&
            date[1] !== " "),
            validYear = (date[5] !== " " && date[8] !== " " && year > 0 &&
            !date[9]),
            invalidMonth = (globals.MONTH_STRING.indexOf(month)) % 3;
        if (!invalidMonth && validDay && validYear) {
            dateInsert = new Date(year, (globals.MONTH_STRING.indexOf(month.toLowerCase()) / 3), day);
            if (dateInsert.getTime() > globals.DATE_TODAY.getTime()) {
                diffDate = -1;
            } else {
                diffDate = Math.floor((globals.DATE_TODAY.getTime() - dateInsert.getTime()) / (1000 * 3600 * 24));
            }
        } else {
            diffDate = -1;
        }
        return diffDate;
    };

    exports.getMomentOfDay = function () {
        var momentOfDay,
            hour,
            now = globals.DATE_TODAY;
        hour = now.getHours();
        if (hour >= 0 && hour < 13) {
            momentOfDay = globals.MORNING_GREETING_MSG;
        } else {
            if (hour >= 13 && hour < 20) {
                momentOfDay = globals.EVENING_GREETING_MSG;
            } else {
                momentOfDay = globals.NIGHT_GREETING_MSG;
            }
        }
        return momentOfDay;
    };

    exports.randomBusiness = function () {
        var random = Math.floor(Math.random() * (globals.BUSINESS.split("|").length));
        return globals.BUSINESS.split("|")[random];
    };

    exports.getSystem = function (system) {
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
    };

    exports.getNavigator = function (browser) {
        var agent;
        if (browser.indexOf('MSIE') !== -1) {
            agent = "Internet Explorer ";
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
        return agent;
    };

    exports.getSystemInformation = function (userAgent) {
        return ("Navegador: " + getNavigator(userAgent) + "; Sistema Operativo: " + getSystem(userAgent));
    };
})(this);
