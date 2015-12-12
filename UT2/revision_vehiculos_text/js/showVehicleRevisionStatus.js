(function (exports) {
    var globals = require("./globals.js");
    var functions = require("./functions.js");

    exports.showVehicleRevisionStatus = function (search) {
        var greeting,
            information = "",
            system = "",
            numberplate = functions.extractValue(search, "numberplate"),
            lastrevdate = functions.extractValue(search, "lastrevdate"),
            validNumberPlate = functions.checkNumberPlate(numberplate),
            diffDays = functions.checkLastTrevDate(lastrevdate);
        if (!validNumberPlate || diffDays === -1) {
            if (!validNumberPlate) {
                greeting = globals.ERROR_NUMBERPLATE;
            } else {
                greeting = globals.ERROR_LASTREVDATE;
            }
        } else {
            greeting = functions.getMomentOfDay();
            if (diffDays > 365) {
                information = globals.INSPECTION_MSG_PRE + functions.randomBusiness() + globals.INSPECTION_MSG_SUF;
            } else {
                information = globals.NO_INSPECTION_MSG;
            }
            system = "Navegador: Mozilla Firefox; Sistema: Ubuntu";
        }
        console.log(greeting);
        console.log(information);
        return [greeting, information, system];

    }

})(this);
