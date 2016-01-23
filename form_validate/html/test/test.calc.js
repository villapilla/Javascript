// Using html2js preprocessor
var HTMLFile = __html__['index.html'],
    body = HTMLFile.split(RegExp("<body>|</body>"))[1];


document.body.innerHTML = body;


startApp();

// BDD
chai.should();

describe('Form_Validation', function() {
    context('Validate name field', function() {
        afterEach(function() {
            resetForm();
        });
        it('Name should be class valid for name and last_name', function() {
            $('name').value = "David Villaluenga";
            validateInput(globals.LAST_NAME_REG_EXP, $("name"));
            $('name').className.should.be.equal("valid");
        });
        it('Name should be class valid for name and last_name', function() {
            $('name').value = "Steve's Mac-Flanigan J";
            validateInput(globals.LAST_NAME_REG_EXP, $("name"));
            $('name').className.should.be.equal("valid");
        });
        it('Name should be class empty for empty field', function() {
            $('name').value = "";
            validateInput(globals.LAST_NAME_REG_EXP, $("name"));
            $('name').className.should.be.equal("");
        });
        it('Name should be class invalid for only name', function() {
            $('name').value = "David";
            validateInput(globals.LAST_NAME_REG_EXP, $("name"));
            $('name').className.should.be.equal("invalid");
        });
    });
    context('Validate email field', function() {
            afterEach(function() {
                resetForm();
            });
            it('Email should be class valid for valid email', function() {
                $('email').value = "dvillaluenga@gmail.com";
                validateInput(globals.EMAIL_REG_EXP, $("email"));
                $('email').className.should.be.equal("valid");
            });
            it('Email should be class valid for valid email', function() {
                $('email').value = "escarate.laravel@gmail.com.es";
                validateInput(globals.EMAIL_REG_EXP, $("email"));
                $('email').className.should.be.equal("valid");
            });
            it('Email should be class invalid for empty field', function() {
                $('email').value = "";
                validateInput(globals.EMAIL_REG_EXP, $("email"));
                $('email').className.should.be.equal("");
            });
            it('Email should be class invalid for invalid email', function() {
                $('email').value = "dasdas.com";
                validateInput(globals.LAST_NAME_REG_EXP, $("email"));
                $('email').className.should.be.equal("invalid");
            });
    });
    context('Validate password field', function() {
            afterEach(function() {
                resetForm();
            });
            it('Password field should be class valid for valid password', function() {
                $('password').value = "aA1!aaaaa/$%&/()=?<>^*_:";
                validateInput(globals.PASS_REG_EXP, $("password"));
                $('password').className.should.be.equal("valid");
            });
            it('Password field should be class valid for valid password', function() {
                $('password').value = "1LP#aa";
                validateInput(globals.PASS_REG_EXP, $("password"));
                $('password').className.should.be.equal("valid");
            });
            it('Password field be class empty for empty field', function() {
                $('password').value = "";
                validateInput(globals.PASS_REG_EXP, $("password"));
                $('password').className.should.be.equal("");
            });
            it('Password field be class invalid for short password', function() {
                $('password').value = "aA!1W";
                validateInput(globals.PASS_REG_EXP, $("password"));
                $('password').className.should.be.equal("invalid");
            });
            it('Password field be class invalid for no number in password', function() {
                $('password').value = "a!AdA$";
                validateInput(globals.PASS_REG_EXP, $("password"));
                $('password').className.should.be.equal("invalid");
            });
            it('Password should be class invalid for password with no simbols', function() {
                $('password').value = "aA21Aa";
                validateInput(globals.PASS_REG_EXP, $("password"));
                $('password').className.should.be.equal("invalid");
            });
    });
    context('Validate confirm_password field', function() {
            afterEach(function() {
                resetForm();
            });
            it('Confirm_password field should be class valid for equal field password', function() {
                $('password').value = "aA1";
                $('confirm').value = "aA1";
                validateConfirm();
                $('confirm').className.should.be.equal("valid");
            });
            it('Confirm_password field should be class empty for empty field password and confirm_password', function() {
                $('password').value = "";
                $('confirm').value = "";
                validateConfirm();
                $('confirm').className.should.be.equal("");
            });
            it('Confirm_password field should be class invalid for different field password and confirm_password', function() {
                $('password').value = "aA";
                $('confirm').value = "aA1";
                validateConfirm();
                $('confirm').className.should.be.equal("invalid");
            });
    });
    context('Validate url field', function() {
            afterEach(function() {
                resetForm();
            });
            it('URL field should be class valid for local url', function() {
                $('url').value = "localhost:8000/";
                validateInput(globals.URL_REG_EXP, $("url"));
                $('url').className.should.be.equal("valid");
            });
            it('URL field should be class valid for external url', function() {
                $('url').value = "http://www.aula-daw.com/";
                validateInput(globals.URL_REG_EXP, $("url"));
                $('url').className.should.be.equal("valid");
            });
            it('URL field should be class empty for empty url field', function() {
                $('url').value = "";
                validateInput(globals.URL_REG_EXP, $("url"));
                $('url').className.should.be.equal("");
            });
            it('URL field should be class invalid for local url with white spaces', function() {
                $('url').value = "localhost:800 /";
                validateInput(globals.URL_REG_EXP, $("url"));
                $('url').className.should.be.equal("invalid");
            });
            it('URL field should be class invalid for invalid url', function() {
                $('url').value = "pepe";
                validateInput(globals.URL_REG_EXP, $("url"));
                $('url').className.should.be.equal("invalid");
            });
            it('URL field should be class invalid for invalid url', function() {
                $('url').value = "htp//hola.com";
                validateInput(globals.URL_REG_EXP, $("url"));
                $('url').className.should.be.equal("invalid");
            });
    });
    context('Validate post-code field', function() {
            afterEach(function() {
                resetForm();
            });
            it('Post-code field should be class valid for postal code 52999', function() {

                $("code").value = "52999";
                validateInput(globals.POST_CODE_REG_EXP, $("code"));
                $('code').className.should.be.equal("valid");
            });
            it('Post-code field should be class valid for postal code 01000', function() {
                $('code').value = "01000";
                validateInput(globals.POST_CODE_REG_EXP, $("code"));
                $('code').className.should.be.equal("valid");
            });
            it('Post-code field should be class empty for empty postal code', function() {
                $("code").value = "";
                validateInput(globals.POST_CODE_REG_EXP, $("code"));
                $('code').className.should.be.equal("");
            });
            it('Post-code field should be class invalid for postal code 0000A', function() {
                $('code').value = "0000A";
                validateInput(globals.POST_CODE_REG_EXP, $("code"));
                $('code').className.should.be.equal("invalid");
            });
            it('Post-code field should be class invalid for postal code 1111', function() {
                $('code').value = "1111";
                validateInput(globals.POST_CODE_REG_EXP, $("code"));
                $('code').className.should.be.equal("invalid");
            });
            it('Post-code field should be class invalid for postal code 00000', function() {
                $('code').value = "00000";
                validateInput(globals.POST_CODE_REG_EXP, $("code"));
                $('code').className.should.be.equal("invalid");
            });
    });
/*
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
    });*/
});
