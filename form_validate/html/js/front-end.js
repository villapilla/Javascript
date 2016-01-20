/*jslint
    node: true,
    browser: true,
    unparam: true
*/
/*globals
    globals,
    dealernet,
    document
*/
'use strict';

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
function ChooseCountry() {
    var form_input = $("post_code"),
        new_input;
    if (this.value === globals.COUNTRIES[0]) {
        form_input.appendChild(generateTextElement("label", "Codigo postal:"));
        form_input.appendChild(generateInput("text", "post_code", ""));
        form_input.className = "form_input";
    } else {
        if (form_input.childElementCount > 1) {
            new_input = form_input.cloneNode(false);
            new_input.className = "no_display";
            form_input.remove();
            $("form").insertBefore(new_input, $("form_comments"));
        }
    }
}
function removeFirstWhite() {
    this.removeChild(this.firstChild);
    this.removeEventListener("change", removeFirstWhite, false);
}
window.onload = function () {
    //var input_box = [$("name_error"), $("email_error"), $("pass_error"), $("confirm_error"), $("url_error"), $("address_error"), $("name_error"), $("country_error")]
    createError("name_error", globals.ERR_LAST_NAME);
    createError("email_error", globals.ERR_EMAIL);
    createError("pass_error", globals.ERR_PASS);
    createError("confirm_error", globals.ERR_CONF_PASS);
    createError("url_error", globals.ERR_URL);
    createError("address_error", globals.ERR_ADDRESS);
    $("select_country").addEventListener("change", removeFirstWhite, false);
    buildSelect("select_country", globals.COUNTRIES, "", ChooseCountry);
};