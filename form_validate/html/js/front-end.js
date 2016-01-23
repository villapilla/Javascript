/*jslint
    node: true,
    browser: true,
    unparam: true
    regexp: true
*/


'use strict';

var globals = (function (ns) {
    /*ns.ERR_LAST_NAME = "Debe introducir tu nombre y al menos un apellido";
    ns.ERR_EMAIL = "Debe introducir un correo valido";
    ns.ERR_PASS = "La contraseña debe tener al menos seis caracteres y una " +
        "letra mayúscula, una letra minúscula, un número y un símbolo";
    ns.ERR_CONF_PASS = "La confirmación y la contraseña deben coincidir";
    ns.ERR_URL = "Debe introducir una URL válida";
    ns.ERR_ADDRESS = "Debe introducir una dirección válida";
    ns.ERR_COUNTRY = "Debe seleccionar un pais válido";
    ns.ERR_POST_CODE = "Debe introducir un código postal válido";*/
    ns.COUNTRIES = ["España", "Francia", "Portugal", "Italia", "Alemania"];
    ns.SPAIN = ns.COUNTRIES[0];
    ns.LAST_NAME_REG_EXP = /^[a-zñ\-\'\.]+(?:\s[a-zñ\-\'\.]+)+$/i;
    ns.EMAIL_REG_EXP = /^[\w.]+@[\w.]+\.[\w]{2,6}$/i;
    ns.PASS_REG_EXP = /^.*(?=.{6,})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/;
    ns.URL_REG_EXP = /^[a-z]{2,}:([0-9]+|\/\/){1}[^\s]*$/i;
    ns.STANDARD_REG_EXP = /^.+$/;
    ns.POST_CODE_REG_EXP = /^([1-4][0-9]{4}|5[0-2][0-9]{3}|0[1-9][0-9]{3})$/;
    ns.inputId = ["name", "email", "password", "confirm", "url", "address", "code"];
    ns.CLASS_RESET = "reset";
    ns.CLASS_VALID = "valid";
    ns.CLASS_INVALID = "invalid";
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
function resetForm() {
    globals.inputId.forEach(function (element) {
        $(element).value = "";
        $(element).className = "";
    });
    $("comments").value = "";
    $("select_country").selectedIndex = 0;
    $("check_buttom").checked = false;
    $("error").className = "no_display";
}
function validateInput(regExp, input) {
    var checkClass;
    if (input.value === "") {
        checkClass = "";
    } else {
        if (regExp.test(input.value)) {
            checkClass = globals.CLASS_VALID;
        } else {
            checkClass = globals.CLASS_INVALID;
        }
    }
    input.className = checkClass;
}

function validateName() {
    validateInput(globals.LAST_NAME_REG_EXP, this);
}
function validatePass() {
    validateInput(globals.PASS_REG_EXP, this);
}
function validateEmail() {
    validateInput(globals.EMAIL_REG_EXP, this);
}
function validateConfirm() {
    var confirm = $("confirm");
    if (confirm.value === "") {
        confirm.className = "";
    } else {
        if (confirm.value === $("password").value) {
            confirm.className = globals.CLASS_VALID;
        } else {
            confirm.className = globals.CLASS_INVALID;
        }
    }
}
function validateUrl() {
    validateInput(globals.URL_REG_EXP, this);
}
function validateStandard() {
    validateInput(globals.STANDARD_REG_EXP, this);
}
function validatePostCode() {
    validateInput(globals.POST_CODE_REG_EXP, this);
}
function validateForm() {
    globals.inputId.forEach(function (element) {
        $(element).focus();
    });
}

function sendForm() {
    var input;
    validateForm();
    input = document.getElementsByClassName("invalid");
    if (input.length === 0 && $("check_buttom").checked) {
        document.forms[0].submit();
    } else {
        $("error").className = "form_input";
    }
}

function startApp() {
    /*createError("name_error", globals.ERR_LAST_NAME);
    createError("email_error", globals.ERR_EMAIL);
    createError("pass_error", globals.ERR_PASS);
    createError("confirm_error", globals.ERR_CONF_PASS);
    createError("url_error", globals.ERR_URL);
    createError("address_error", globals.ERR_ADDRESS);*/
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
    resetForm();
    validateForm();
}

window.onload = startApp;