chai.should();
    describe('Check cod', function () {
        it('should return ERROR for empty string', function () {
            translateWord("").should.be.equal("Datos invalidos");
        });
        it('should return ERROR for number', function () {
            translateWord(12).should.be.equal("Datos invalidos");
        });
        it('should return ERROR for escape character', function () {
            translateWord("\n").should.be.equal("Datos invalidos");
        });
        it('should return 01020201 for ABBA', function () {
            translateWord("ABBA").should.be.equal("01020201");
        });
        it('should return ERROR for character and number', function () {
            translateWord("H1GA").should.be.equal("Datos invalidos");
        });
        it('should return ERROR for not letter character', function () {
            translateWord("%").should.be.equal("Datos invalidos");
        });
        it('should return 01020201 for abba', function () {
            translateWord("ABBA").should.be.equal("01020201");
        });
        it('should return 161405 for one', function () {
            translateWord("one").should.be.equal("161405");
        });
    });          