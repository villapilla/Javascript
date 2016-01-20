// Using html2js preprocessor 
var HTMLFile = __html__['index.html'],
    body = HTMLFile.split(RegExp("<body>|</body>"))[1];

document.body.innerHTML = body;

app();

// BDD
chai.should();

describe('Simple calculator', function() {
    context('Correct values in operators', function() {
        afterEach(function() {
            $('result').innerHTML = "";
        });
    
        it('should show 6 for 3 + 3', function() {
            $('firstoperand').value = 3;
            $('secondoperand').value = 3;
            $('add').click();
            $('result').innerHTML.should.be.equal("6");
        });
    });

    context('Incorrect values in operators', function() {
        afterEach(function() {
            $('result').innerHTML = "";
        });

        it('should show error for Bad + 3', function() {
            $('firstoperand').value = "Bad";
            $('secondoperand').value = 3;
            $('add').click();
            $('result').innerHTML.should.be.equal(ERROR_MSG);
        });
    });
});
