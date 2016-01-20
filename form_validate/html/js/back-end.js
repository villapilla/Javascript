/*jslint
    node: true,
    browser: true,
    unparam: true
*/
'use strict';
var globals = (function (ns) {
    ns.ERR_LAST_NAME = "Debes introducir tu nombre y al menos un apellido";
    ns.ERR_EMAIL = "Debes introducir un correo valido";
    ns.ERR_PASS = "La contraseña debe tener al menos seis caracteres y una " +
        "letra mayúscula, una letra minúscula, un número y un símbolo";
    ns.ERR_CONF_PASS = "La confirmación y la contraseña deben coincidir";
    ns.ERR_URL = "Debes introducir una URL válida";
    ns.ERR_ADDRESS = "Debes introducir una dirección válida";
    ns.ERR_COUNTRY = "Debes seleccionar un pais válido";
    ns.ERR_POST_CODE = "Debes introducir un codigo postal válido";
    ns.COUNTRIES = ["España", "Francia", "Portugal", "Italia", "Alemania"];
    ns.LAST_NAME_REG_EXP = new RegExp("^([a-z\.']+\s)+[a-z\.']+$", "i");
    ns.EMAIL_REG_EXP = new RegExp("^[\w.]+@[\w.]+\.[\w]{2,6}$", "i"); 
    ns.PASS_REG_EXP = new RegExp("^.*(?=.{6,})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/");
    ns.URL_REG_EXP = new RegExp("^(http:\/\/|https:\/\/|www.|ftp:\/\/).+$");
    ns.STANDARD_REG_EXP = new RegExp("^\w+$");
    return ns;
}({}));


function validate(regExp, input) {
    var checkStyle;
    if(input === "" || regExp.test(input)) {
        checkValidate = true;
    } else {
        checkValidate = ;
    }
    return checkValidate;
}

function inputStyle() {

}