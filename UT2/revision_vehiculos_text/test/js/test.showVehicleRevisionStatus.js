chai.should();
describe('Revision Vehiculos', function () {
    describe('Check Date', function () {
        context('Errores de formato', function () {
            it('should return -1 for empty string', function () {
                checkLastTrevDate("").should.equal(-1);
            });
            it('should return -1 for a space " "', function () {
                checkLastTrevDate(" ").should.equal(-1);
            });
            it('should return -1 for "MANOLO"', function () {
                checkLastTrevDate("MANOLO").should.equal(-1);
            });
            it('should return -1 for " 1jan2-115"', function() {
                checkLastTrevDate(" 1jan2-115").should.equal(-1);
            });
            it('should return -1 for "1 jan2-115"', function () {
                checkLastTrevDate("1 jan2-115").should.equal(-1);
            });
            it('should return -1 for "1jan2-1-1-1"', function () {
                checkLastTrevDate("1jan2-1-1-1").should.equal(-1);
            });
            it('should return -1 for "-1-1jan2-115"', function () {
                checkLastTrevDate("-1-1jan2-115").should.equal(-1);
            });
            it('should return -1 for "-1may2-1-1-1"', function () {
                checkLastTrevDate("-1may2-1-1-1").should.equal(-1);
            });
            it('should return -1 for "32jan2-114"', function () {
                checkLastTrevDate("32jan2-114").should.equal(-1);
            });
            it('should return -1 for "31/12/2-116"', function () {
                checkLastTrevDate("31/12/2-116").should.equal(-1);
            });
            it('should return -1 for "31ene2-115"', function () {
                checkLastTrevDate("31ene2-115").should.equal(-1);
            });
            it('should return -1 for "13feb1-1-1-1-1"', function () {
                checkLastTrevDate("13feb1-1-1-1-1").should.equal(-1);
            });
            it('should return -1 for "26oct1-1-1"', function () {
                checkLastTrevDate("26oct1-1-1").should.equal(-1);
            });
            it('should return -1 for "26oct 1-1-1"', function () {
                checkLastTrevDate("26oct1-1-1").should.equal(-1);
            });
            it('should return -1 for "26oct1-1-1 "', function () {
                checkLastTrevDate("26oct1-1-1").should.equal(-1);
            });
            it('should return true for "31dec3999"', function () {
                checkLastTrevDate("31dec3999").should.equal(-1);
            });
        });
        context('Fechas validas', function () {    
            it('should return true for "01jan1970"', function () {
                checkLastTrevDate("01jan1970").should.to.be(true);
            });
            it('should return true for "02jan1970"', function () {
                checkLastTrevDate("02jan1970").should.equal(Number);
            });
            it('should return true for "29feb2000"', function () {
                checkLastTrevDate("29feb2000").should.equal(Number);
            });
        });
    });
    describe('Check numberPlate', function () {
        context('Errores de formato', function () {
            it('should return false for empty string', function () {
                checkNumberPlate("").should.equal(false);
            });
            it('should return false for a space " "', function () {
                checkNumberPlate(" ").should.equal(false);
            });
            it('should return false for "MANOLO"', function () {
                checkNumberPlate("MANOLO").should.equal(false);
            });
            it('should return false for " 1111-ctt"', function() {
                checkNumberPlate(" 1111-ctt").should.equal(false);
            });
            it('should return false for "111-ctt"', function () {
                checkNumberPlate("111-ctt").should.equal(false);
            });
            it('should return false for "TO-12255"', function () {
                checkNumberPlate("TO-12255").should.equal(false);
            });
            it('should return false for "1234-AZñ"', function () {
                checkNumberPlate("1234-AZñ").should.equal(false);
            });
            it('should return false for "-1may2-1-1-1"', function () {
                checkNumberPlate("1234-AZ").should.equal(false);
            });
            it('should return false for "TO-234-AZ"', function () {
                checkNumberPlate("TO-234-AZ").should.equal(false);
            });
            it('should return false for "TO- 234-AZ"', function () {
                checkNumberPlate("TO- 234-AZ").should.equal(false);
            });
        });
        context('Fechas validas', function () {    
            it('should return true for "TO-2365-AC"', function () {
                checkNumberPlate("TO-2365-AC").should.equal(true);
            });
            it('should return true for "M-2365-AC"', function () {
                checkNumberPlate("M-2365-AC").should.equal(true);
            });
            it('should return true for "M-2365-C"', function () {
                checkNumberPlate("M-2365-C").should.equal(true);
            });
            it('should return true for "TO-2365-C"', function () {
                checkNumberPlate("TO-2365-C").should.equal(true);
            });
            it('should return true for "1125-CTT"', function () {
                checkNumberPlate("1125-CTT").should.equal(true);
            });
        });
    });
}); 