chai.should();
describe('Check primalty', function() {
    describe('', function() {
        context('Not numbers', function() {
            it('should return false for strings', function() {
                 isPrime("One").should.not.be.ok;
            });
        });
        context('Numbers', function() {
            it('should return false for a negative number like -3', function() {
                isPrime(-3).should.not.be.ok;
            });
            it('should return false for 0', function() {
                isPrime(1).should.not.be.ok;
            });
            it('should return false for infinity', function() {
                isPrime(Infinity).should.not.be.ok;
            });
            it('should return false for 1', function() {
                isPrime(1).should.not.be.ok;
            });
            it('should return true for 2', function() {
                isPrime(2).should.be.ok;
            });
            it('should return true for 3', function() {
                isPrime(3).should.be.ok;
            });
            it('should return false for 4', function() {
                isPrime(4).should.not.be.ok;
            });
            it('should return true for 5', function() {
                isPrime(5).should.be.ok;
            });
            it('should return false for 8', function() {
                isPrime(8).should.not.be.ok;
            });
            it('should return true for 11', function() {
                isPrime(11).should.be.ok;
            });
            it('should return true for 37', function() {
                isPrime(37).should.be.ok;
            });
            it('should return true for 1304539 after a while ;-)', function() {
                isPrime(1304539).should.be.ok;
            });

        });
    });
});
