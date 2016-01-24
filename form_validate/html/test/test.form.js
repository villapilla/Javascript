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
            validateInput(ns.LAST_NAME_REG_EXP, $("name"));
            $('name').className.should.be.equal(ns.CLASS_VALID);
        });
        it('Name should be class valid for name and last_name', function() {
            $('name').value = "Steve's Mac-Flanigan J";
            validateInput(ns.LAST_NAME_REG_EXP, $("name"));
            $('name').className.should.be.equal(ns.CLASS_VALID);
        });
        it('Name should be class empty for empty field', function() {
            $('name').value = "";
            validateInput(ns.LAST_NAME_REG_EXP, $("name"));
            $('name').className.should.be.equal("");
        });
        it('Name should be class invalid for only name', function() {
            $('name').value = "David";
            validateInput(ns.LAST_NAME_REG_EXP, $("name"));
            $('name').className.should.be.equal(ns.CLASS_INVALID);
        });
    });
    context('Validate email field', function() {
            afterEach(function() {
                resetForm();
            });
            it('Email should be class valid for valid email', function() {
                $('email').value = "dvillaluenga@gmail.com";
                validateInput(ns.EMAIL_REG_EXP, $("email"));
                $('email').className.should.be.equal(ns.CLASS_VALID);
            });
            it('Email should be class valid for valid email', function() {
                $('email').value = "escarate.laravel@gmail.com.es";
                validateInput(ns.EMAIL_REG_EXP, $("email"));
                $('email').className.should.be.equal(ns.CLASS_VALID);
            });
            it('Email should be class invalid for empty field', function() {
                $('email').value = "";
                validateInput(ns.EMAIL_REG_EXP, $("email"));
                $('email').className.should.be.equal("");
            });
            it('Email should be class invalid for invalid email', function() {
                $('email').value = "dasdas.com";
                validateInput(ns.LAST_NAME_REG_EXP, $("email"));
                $('email').className.should.be.equal(ns.CLASS_INVALID);
            });
    });
    context('Validate password field', function() {
            afterEach(function() {
                resetForm();
            });
            it('Password field should be class valid for valid password', function() {
                $('password').value = "aA1!aaaaa/$%&/()=?<>^*_:";
                validateInput(ns.PASS_REG_EXP, $("password"));
                $('password').className.should.be.equal(ns.CLASS_VALID);
            });
            it('Password field should be class valid for valid password', function() {
                $('password').value = "1LP#aa";
                validateInput(ns.PASS_REG_EXP, $("password"));
                $('password').className.should.be.equal(ns.CLASS_VALID);
            });
            it('Password field be class empty for empty field', function() {
                $('password').value = "";
                validateInput(ns.PASS_REG_EXP, $("password"));
                $('password').className.should.be.equal("");
            });
            it('Password field be class invalid for short password', function() {
                $('password').value = "aA!1W";
                validateInput(ns.PASS_REG_EXP, $("password"));
                $('password').className.should.be.equal(ns.CLASS_INVALID);
            });
            it('Password field be class invalid for no number in password', function() {
                $('password').value = "a!AdA$";
                validateInput(ns.PASS_REG_EXP, $("password"));
                $('password').className.should.be.equal(ns.CLASS_INVALID);
            });
            it('Password should be class invalid for password with no simbols', function() {
                $('password').value = "aA21Aa";
                validateInput(ns.PASS_REG_EXP, $("password"));
                $('password').className.should.be.equal(ns.CLASS_INVALID);
            });
            it('should have a invalid class for a password without numbers abc&ABC', function () {
                $('password').value = "abc&ABC";
                validateInput(ns.PASS_REG_EXP, $("password"));
                $('password').className.should.be.equal(ns.CLASS_INVALID);
            });

            it('should have a invalid class for a password without simbols abc123A', function () {
                $('password').value = "abc123A";
                validateInput(ns.PASS_REG_EXP, $("password"));
                $('password').className.should.be.equal(ns.CLASS_INVALID);
            });
            it('should have a invalid class for a password without minus letters ABC123$', function () {
                $("password").value = "ABC123$";
                validateInput(ns.PASS_REG_EXP, $("password"));
                $("password").className.should.be.equal(ns.CLASS_INVALID);
            });
            it('should have a invalid class for a password without mayus letters abc123$', function () {
                $("password").value = "abc123$";
                validateInput(ns.PASS_REG_EXP, $("password"));
                $("password").className.should.be.equal(ns.CLASS_INVALID);
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
                $('confirm').className.should.be.equal(ns.CLASS_VALID);
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
                $('confirm').className.should.be.equal(ns.CLASS_INVALID);
            });
    });
    context('Validate url field', function() {
            afterEach(function() {
                resetForm();
            });
            it('URL field should be class valid for local url', function() {
                $('url').value = "localhost:8000/";
                validateInput(ns.URL_REG_EXP, $("url"));
                $('url').className.should.be.equal(ns.CLASS_VALID);
            });
            it('URL field should be class valid for external url', function() {
                $('url').value = "http://www.aula-daw.com/";
                validateInput(ns.URL_REG_EXP, $("url"));
                $('url').className.should.be.equal(ns.CLASS_VALID);
            });
            it('URL field should be class empty for empty url field', function() {
                $('url').value = "";
                validateInput(ns.URL_REG_EXP, $("url"));
                $('url').className.should.be.equal("");
            });
            it('URL field should be class invalid for local url with white spaces', function() {
                $('url').value = "localhost:800 /";
                validateInput(ns.URL_REG_EXP, $("url"));
                $('url').className.should.be.equal(ns.CLASS_INVALID);
            });
            it('URL field should be class invalid for invalid url', function() {
                $('url').value = "pepe";
                validateInput(ns.URL_REG_EXP, $("url"));
                $('url').className.should.be.equal(ns.CLASS_INVALID);
            });
            it('URL field should be class invalid for invalid url', function() {
                $('url').value = "htp//hola.com";
                validateInput(ns.URL_REG_EXP, $("url"));
                $('url').className.should.be.equal(ns.CLASS_INVALID);
            });
    });
    context('Validate post-code field', function() {
            afterEach(function() {
                resetForm();
            });
            it('Post-code field should be class valid for postal code 52999', function() {

                $("code").value = "52999";
                validateInput(ns.POST_CODE_REG_EXP, $("code"));
                $('code').className.should.be.equal(ns.CLASS_VALID);
            });
            it('Post-code field should be class valid for postal code 01000', function() {
                $('code').value = "01000";
                validateInput(ns.POST_CODE_REG_EXP, $("code"));
                $('code').className.should.be.equal(ns.CLASS_VALID);
            });
            it('Post-code field should be class empty for empty postal code', function() {
                $("code").value = "";
                validateInput(ns.POST_CODE_REG_EXP, $("code"));
                $('code').className.should.be.equal("");
            });
            it('Post-code field should be class invalid for postal code 0000A', function() {
                $('code').value = "0000A";
                validateInput(ns.POST_CODE_REG_EXP, $("code"));
                $('code').className.should.be.equal(ns.CLASS_INVALID);
            });
            it('Post-code field should be class invalid for postal code 1111', function() {
                $('code').value = "1111";
                validateInput(ns.POST_CODE_REG_EXP, $("code"));
                $('code').className.should.be.equal(ns.CLASS_INVALID);
            });
            it('Post-code field should be class invalid for postal code 00000', function() {
                $('code').value = "00000";
                validateInput(ns.POST_CODE_REG_EXP, $("code"));
                $('code').className.should.be.equal(ns.CLASS_INVALID);
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
