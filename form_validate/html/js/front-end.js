/*jslint
    node: true,
    browser: true,
    unparam: true
    regexp: true
*/
'use strict';
var ns = (function (ns) {
    ns.ERR_LAST_NAME = "Debe introducir su nombre y al menos un apellido";
    ns.ERR_EMAIL = "Debe introducir un correo valido";
    ns.ERR_PASS = "La contraseña debe tener al menos seis caracteres y una " +
        "letra mayúscula, una letra minúscula, un número y un símbolo";
    ns.ERR_CONF_PASS = "La confirmación y la contraseña deben coincidir";
    ns.ERR_URL = "Debe introducir una URL válida";
    ns.ERR_ADDRESS = "Debe introducir una dirección válida";
    ns.ERR_COUNTRY = "Debe seleccionar un pais válido";
    ns.ERR_POST_CODE = "Debe introducir un código postal válido";
    ns.COUNTRIES = ["España", "Francia", "Portugal", "Italia", "Alemania"];
    ns.SPAIN = ns.COUNTRIES[0];
    ns.LAST_NAME_REG_EXP = /^[a-zñ\-\'\.]+(?:\s[a-zñ\-\'\.]+)+$/i;
    ns.EMAIL_REG_EXP = /^[\w.]+@[\w.]+\.[\w]{2,6}$/i;
    ns.PASS_REG_EXP = /^.*(?=.{6,})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/;
    ns.URL_REG_EXP = /^[a-z]{2,}:([0-9]+|\/\/){1}[^\s]*$/i;
    ns.STANDARD_REG_EXP = /^.+$/;
    ns.POST_CODE_REG_EXP = /^([1-4][0-9]{4}|5[0-2][0-9]{3}|0[1-9][0-9]{3})$/;
    ns.inputId = ["name", "email", "password", "confirm", "url",
        "address", "code"];
    ns.inputRequired = ["name", "email", "password", "confirm"];
    ns.CLASS_VALID = "valid";
    ns.CLASS_INVALID = "invalid";
    ns.CLASS_NO_DISPLAY = "no_display";
    ns.CLASS_FORM = "form_input";
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
    if (this.value === ns.SPAIN) {
        form_input.className = ns.CLASS_FORM;
    } else {
        form_input.lastElementChild.value = "";
        form_input.lastElementChild.className = "";
        form_input.className = ns.CLASS_NO_DISPLAY;
    }
}
function resetForm() {
    ns.inputId.forEach(function (element) {
        $(element).value = "";
        $(element).className = "";
    });
    $("comments").value = "";
    $("select_country").selectedIndex = 0;
    $("check_buttom").checked = false;
    $("error").className = ns.CLASS_NO_DISPLAY;
}
function validateInput(regExp, input) {
    if (input.value === "") {
        input.className = "";
    } else {
        if (regExp.test(input.value)) {
            input.className = ns.CLASS_VALID;
        } else {
            input.className = ns.CLASS_INVALID;
        }
    }
}
function validateName() {
    validateInput(ns.LAST_NAME_REG_EXP, this);
}
function validatePass() {
    validateInput(ns.PASS_REG_EXP, this);
}
function validateEmail() {
    validateInput(ns.EMAIL_REG_EXP, this);
}
function validateUrl() {
    validateInput(ns.URL_REG_EXP, this);
}
function validateStandard() {
    validateInput(ns.STANDARD_REG_EXP, this);
}
function validatePostCode() {
    validateInput(ns.POST_CODE_REG_EXP, this);
}
function validateConfirm() {
    var confirm = $("confirm");
    if (confirm.value === "") {
        confirm.className = "";
    } else {
        if (confirm.value === $("password").value) {
            confirm.className = ns.CLASS_VALID;
        } else {
            confirm.className = ns.CLASS_INVALID;
        }
    }
}
function validateForm() {
    var invalidElements;
    ns.inputId.forEach(function (element) {
        $(element).focus();
    });
    invalidElements = document.getElementsByClassName(ns.CLASS_INVALID);
    if (invalidElements.length) {
        invalidElements[0].focus();
    } else {
        $("error").className = ns.CLASS_NO_DISPLAY;
    }
}
function sendForm() {
    var inputInvalid,
        inputReq;
    validateForm();
    inputReq = ns.inputRequired.every(function (element) {
        return $(element).className === ns.CLASS_VALID;
    });
    inputInvalid = document.getElementsByClassName(ns.CLASS_INVALID);
    if (inputReq && inputInvalid.length === 0 && $("check_buttom").checked) {
        document.forms[0].submit();
    } else {
        $("error").className = ns.CLASS_FORM;
    }
}
function closePanel() {
    $("cookies").className = ns.CLASS_NO_DISPLAY;
}
function startApp() {
    createError("nameEr", ns.ERR_LAST_NAME);
    createError("email_error", ns.ERR_EMAIL);
    createError("pass_error", ns.ERR_PASS);
    createError("confirm_error", ns.ERR_CONF_PASS);
    createError("url_error", ns.ERR_URL);
    createError("address_error", ns.ERR_ADDRESS);
    createError("post_code_error", ns.ERR_POST_CODE);
    buildSelect("select_country", ns.COUNTRIES, "", chooseCountry);
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
    $("cookies_message").addEventListener("click", closePanel, false);
    resetForm();
    validateForm();
}
window.onload = startApp;