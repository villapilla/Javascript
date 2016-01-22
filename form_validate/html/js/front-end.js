/*globals
    globals,
    dealernet,
    document
*/
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
    ns.SPAIN = ns.COUNTRIES[0];
    ns.LAST_NAME_REG_EXP = /^[a-zñ\-\'\.]+(?:\s[a-zñ\-\'\.]+)+$/i;
    ns.EMAIL_REG_EXP = /^[\w.]+@[\w.]+\.[\w]{2,6}$/i;
    ns.PASS_REG_EXP = /^.*(?=.{6,})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/;
    ns.URL_REG_EXP = /^[a-z]{2,}:([0-9]+|\/\/){1}[^\s-]*$/i;
    ns.STANDARD_REG_EXP = /^.+$/;
    ns.POST_CODE_REG_EXP = /^([0-4][0-9]{4}|[5][0-2][0-9]{3})$/;
    ns.inputId = ["name", "email", "password", "confirm", "url", "address", "code"];
    return ns;
}({}));


function $(id) {
    return document.getElementById(id);
}

function createError(id, error) {
    $(id).appendChild(document.createTextNode(error));
}
function buildOption(message) {
    var option = document.createElement("Option"),
        text = document.createTextNode(message);
    option.value = message;
    option.appendChild(text);
    return option;
}
function buildSelect(id, optionArray, firstElement, func) {
    var select = $(id);
    select.appendChild(buildOption(firstElement));
    optionArray.reduce(function (select, optionValue) {
        select.appendChild(buildOption(optionValue));
        return select;
    }, select);
    select.addEventListener("change", func, false);
    return select;
}
function generateTextElement(tag, text) {
    var element = document.createElement(tag),
        lineText = document.createTextNode(text);
    element.appendChild(lineText);
    return element;
}
function generateInput(type, name, identify) {
    var input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.setAttribute("class", identify);
    return input;
}
function chooseCountry() {
    var form_input = $("post_code");
    if (this.value === globals.SPAIN) {
        form_input.className = "form_input";
    } else {
        form_input.lastElementChild.value = "";
        form_input.lastElementChild.className = "reset";
        form_input.className = "no_display";
    }
}

function validateInput(regExp, input) {
    var checkClass;
    if (input === "") {
        checkClass = "reset";
    } else {
        if (regExp.test(input)) {
            checkClass = "valid";
        } else {
            checkClass = "invalid";
        }
    }
    return checkClass;
}

function validateName() {
    var newClass = validateInput(globals.LAST_NAME_REG_EXP, this.value);
    this.className = newClass;
}
function validatePass() {
    var newClass = validateInput(globals.PASS_REG_EXP, this.value);
    this.className = newClass;
}
function validateEmail() {
    var newClass = validateInput(globals.EMAIL_REG_EXP, this.value);
    this.className = newClass;
}
function validateConfirm() {
    if (this.value === "") {
        this.className = "reset";
    } else {
        if (this.value === $("password").value) {
            this.className = "valid";
        } else {
            this.className = "invalid";
        }
    }
}
function validateUrl() {
    var newClass = validateInput(globals.URL_REG_EXP, this.value);
    this.className = newClass;
}
function validateStandard() {
    var newClass = validateInput(globals.STANDARD_REG_EXP, this.value);
    this.className = newClass;
}
function validatePostCode() {
    var newClass = validateInput(globals.POST_CODE_REG_EXP, this.value);
    this.className = newClass;
}
function sendForm(e) {
    var input; 
    validateForm();
    input = document.getElementsByClassName("invalid");
    if (input.length === 0 && $("check_buttom").checked) {
        document.forms[0].submit();
    } else {
        $("error").className = "form_input";
    }
}
function validateForm() {
    var inputs;
    globals.inputId.forEach(function (element) {
        $(element).focus();
    });
}
window.onload = function () {
    createError("name_error", globals.ERR_LAST_NAME);
    createError("email_error", globals.ERR_EMAIL);
    createError("pass_error", globals.ERR_PASS);
    createError("confirm_error", globals.ERR_CONF_PASS);
    createError("url_error", globals.ERR_URL);
    createError("address_error", globals.ERR_ADDRESS);
    buildSelect("select_country", globals.COUNTRIES, "", chooseCountry);
    $("name").addEventListener("keyup", validateName, false);
    $("name").addEventListener("focus", validateName, false);
    $("password").addEventListener("keyup", validatePass, false);
    $("password").addEventListener("focus", validatePass, false);
    $("email").addEventListener("keyup", validateEmail, false);
    $("email").addEventListener("focus", validateEmail, false);
    $("confirm").addEventListener("keyup", validateConfirm, false);
    $("confirm").addEventListener("focus", validateConfirm, false);
    $("address").addEventListener("keyup", validateStandard, false);
    $("address").addEventListener("focus", validateStandard, false);
    $("url").addEventListener("keyup", validateUrl, false);
    $("url").addEventListener("focus", validateUrl, false);
    $("code").addEventListener("keyup", validatePostCode, false);
    $("code").addEventListener("focus", validatePostCode, false);
    $("send").addEventListener("click", sendForm, false);
    validateForm();
};

