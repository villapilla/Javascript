// Messages and list of services
INVALID_NUMBERPLATE_MSG = "Número de matrícula incorrecto";
INVALID_DATE_MSG = "Fecha de matriculación incorrecta";
MORNING_GREETING_MSG = "Buenos días";
EVENING_GREETING_MSG = "Buenas tardes";
NIGHT_GREETING_MSG = "Buenas noches";
NO_INSPECTION_MSG = "Su vehículo no necesita revisión";
INSPECTION_MSG_PRE = "Debe ponerse en contacto con ";
INSPECTION_MSG_SUF = " para revisar su vehículo";
LIST_OF_SERVICES = "ABERCO|JUMDER|NOIRTE|OSPIA|SAIMTE";

// Helper functions
function getCurrentTime() {
    var now = new Date();
    return now.getHours() * 100 + now.getMinutes();
}

function input(numberPlate, lastRevDate, switchOrder) {
    var firstArg = numberPlate ?  "numberplate=" + numberPlate : "",
        secondArg = lastRevDate ? "lastrevdate=" + lastRevDate : "";
    return "?" + (switchOrder ? secondArg + firstArg : firstArg + secondArg);
}

function output(result, info) {
    return [ result, info, MY_BROWSER + " " + MY_OS ];
}

function skipTest() {
    it('should skip this test', function(done) {
        done();
    });
}

function buildArrayFromString(srcString, preMsg, postMsg, separator) {
    // TODO: Implement this using array methods
    var separator = separator || "|",
        preMsg = preMsg || "",
        postMsg = postMsg || "",
        resultArray = srcString.split(separator),
        numberOfItems = resultArray.length,
        currentItem;
    for (currentItem = 0 ; currentItem < numberOfItems ; currentItem++) {
        resultArray[currentItem] = preMsg + resultArray[currentItem] + postMsg;
    }
    return resultArray;
}

// BDD
chai.should();
// TDD 
var assert = chai.assert;

// Global variables and constants used for testing
var MORNING_END = 1259,
    EVENING_END = 1959,
    NIGHT_END = 2359,
    MY_BROWSER = "Firefox/42.0",
    MY_OS = "Linux x86_64",
    currentTime = getCurrentTime()
    TODAY="13nov2015";
    TODAYLASTYEAR="13nov2014";
    YESTERDAYLASTYEAR="12nov2014";

// Build all possible inspection messages and error messages
var ARRAY_OF_SERVICES = buildArrayFromString(LIST_OF_SERVICES, 
        INSPECTION_MSG_PRE, INSPECTION_MSG_SUF),
    ARRAY_OF_ERROR_MGS = buildArrayFromString(INVALID_NUMBERPLATE_MSG +
        "|"+ INVALID_DATE_MSG);

// The tests!
describe('Test showVehicleRevisionStatus function. To be launched on ' + TODAY + '. The code to test is inside a blackbox, so this is not a common practice', function() {
    context('Invalid query string', function() {
        it('should evaluate to an error message for empty string', function() {
            var result = showVehicleRevisionStatus("");
            ARRAY_OF_ERROR_MGS.should.contain(result[0]);
        });
        it('should evaluate to an error message for a badly composed query string', function() {
            var result = showVehicleRevisionStatus("/thisisan==invalid&query& string");
            ARRAY_OF_ERROR_MGS.should.contain(result[0]);
        });
    });

    context('Invalid arguments', function() {
        it('should evaluate to an error message for invalid inspection date: Nodate', function() {
            var result = showVehicleRevisionStatus(input("M-1234-AA", "NoDate"));
            result[0].should.be.equal(INVALID_DATE_MSG);
        });
        it('should evaluate to an error message for invalid number plate: 3453-DD3 date: ', function() {
            var result = showVehicleRevisionStatus(input("3453-DD3", "01oct2000"));
            result[0].should.be.equal(INVALID_NUMBERPLATE_MSG);
        });
    });

    context('Greetings', function() {
        beforeEach(function() {
        });

        if (currentTime > MORNING_END) {
            skipTest();
        } else {
            it('should return a morning greeting message when run in the mornings', function() {
                var result = showVehicleRevisionStatus(input("CS-4532-L", "16jul2015"));
                result[0].should.be.equal(MORNING_GREETING_MSG);
            });
        }
        if (currentTime <= MORNING_END || currentTime > EVENING_END) {
            skipTest();
        } else {
            it('should return a morning greeting message when run in the evenings', function() {
                var result = showVehicleRevisionStatus(input("3921-ABC", "12mar2010"));
                result[0].should.be.equal(EVENING_GREETING_MSG);
            });
        }
        if (currentTime <= EVENING_END) {
            skipTest();
        } else {
            it('should return a morning greeting message when run at nights', function() {
                var result = showVehicleRevisionStatus(input("SE-5464-G", "26apr2015"));
                result[0].should.be.equal(NIGHT_GREETING_MSG);
            });
        }
    });

    context('Does not need inspection', function() {
        it('should evaluate to a no inspection message for 16jan2015 and valid numberplate', function() {
            var result = showVehicleRevisionStatus(input("B-3912-HN", "16jan2015"));
            result[1].should.be.equal(NO_INSPECTION_MSG);
        });
        it('should evaluate to a no inspection message for ' + TODAYLASTYEAR + ' and valid numberplate', function() {
            var result = showVehicleRevisionStatus(input("VA-0934-X", TODAYLASTYEAR));
            result[1].should.be.equal(NO_INSPECTION_MSG);
        });
    });

    context('Needs inspection', function() {
        it('should evaluate to an inspection message for 16sep2000 and valid numberplate', function() {
            var result = showVehicleRevisionStatus(input("7219-EBJ", "16sep2000"));
            ARRAY_OF_SERVICES.should.contain(result[1]);
        });
        it('should evaluate to an inspection message for ' + YESTERDAYLASTYEAR + ' and valid numberplate', function() {
            var result = showVehicleRevisionStatus(input("M-1234-AA", YESTERDAYLASTYEAR));
            ARRAY_OF_SERVICES.should.contain(result[1]);
        });
    });
});
