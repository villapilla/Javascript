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

var doctype = document.implementation.createDocumentType( 'html', '', '');
document.insertBefore(doctype, document.childNodes[0]);

function generateBox(tag, id) {
    var element = document.createElement(tag);
    element.id = id;
    return element;
}
var ns = (function (ns) {
    ns.INIT_TAG = ["header", "section"];
    ns.INPUT_VALUE = "Valor";
    ns.INPUT_CLASS = "Clase";
    ns.INPUT_TEXT = [ns.INPUT_CLASS, ns.INPUT_VALUE];
    ns.INPUT_BUTTON = "Añadir";
    ns.DELETE_BUTTON = "Eliminar";
    ns.TABLE_BUTTON = "Tabla";
    ns.LIST_BUTTON = "Lista";
    ns.COLOR_BIG = "red";
    ns.COLOR_SMALL = "green"; 
    ns.classContainer = new ClassContainer();
    ns.listItem = generateBox("ul", "listItem");
    ns.tableItem = generateBox("table", "tableItem");
    return ns;
}({}));
function $(id) {
    return document.getElementById(id);
}

function Attribute(classValue, text) {
    this.classValue = classValue;
    this.text = text;
}
function ClassContainer() {
    this.container = [];
}
ClassContainer.prototype.addClass = function (classValue, text) {
    this.container.push(new Attribute(classValue, text));
};
ClassContainer.prototype.removeClass = function (classValue) {
    this.container = this.container.filter(function (x) {
        return x.classValue !== classValue;
    });
};
ClassContainer.prototype.arrayClassUnique = function() {
    return this.container.map(function (x) {
        return x.classValue;
    }).filter(function (element, index, arrayMap) {
        return arrayMap.indexOf(element) === index;
    });
};
ClassContainer.prototype.arrayTextUnique = function() {
    return this.container.map(function (x) {
        return x.text;
    }).filter(function (element, index, arrayMap) {
        return arrayMap.indexOf(element) === index;
    });
};
ClassContainer.prototype.numberOfObject = function(classValue, text) {
    return this.container.reduce(function(x, y) {
        return (y.classValue === classValue && y.text === text) ? x + 1 : x;
    }, 0);
};
function generateTextElement(tag, text, classValue) {
    var element = document.createElement(tag),
        lineText = document.createTextNode(text);
    element.appendChild(lineText);
    element.setAttribute("class", classValue);
    return element;
}
function generateInput(type, name) {
    var input = document.createElement("input");
    input.id = name;
    input.type = type;
    input.name = name;
    return input;
}
function buildOption(message) {
    var option = document.createElement("Option"),
        text = document.createTextNode(message);
    option.value = message;
    option.appendChild(text);
    return option;
}
function buildSelect(id, optionArray) {
    var select = document.createElement("select");
    select.id = id;
    optionArray.map(buildOption).forEach(function (y) {
        select.appendChild(y);
    });
    return select;
}



function generateButton(fn, value, id) {
    var button = generateInput("submit", id);
    button.value = value;
    button.addEventListener("click", fn, false);
    return button;
}
function generateList() {
    ns.listItem = ns.listItem.cloneNode(false);
    ns.classContainer.container.forEach(function (x) {
        ns.listItem.appendChild(generateTextElement("li", x.text, x.classValue));
    });
}
function generateTable() {
    var arrayClass = ns.classContainer.arrayClassUnique(),
        numberObject,
        arrayText = ns.classContainer.arrayTextUnique();
    ns.tableItem = ns.tableItem.cloneNode(false);
    ns.tableItem.appendChild(generateBox("tr","class_row"));
    ns.tableItem.firstChild.appendChild(generateTextElement("td", "", ""));
    arrayClass.forEach(function (x) {
        ns.tableItem.firstChild.appendChild(generateTextElement("td", x, ""));
    });
    arrayText.forEach(function (x, y) {
        ns.tableItem.appendChild(generateBox("tr","row" + y));
        ns.tableItem.lastChild.appendChild(generateTextElement("td", x, ""));
        arrayClass.forEach(function (x) {
            numberObject = ns.classContainer.numberOfObject(x, this);
            ns.tableItem.lastChild.appendChild(generateTextElement("td", numberObject, ""));
            if (numberObject > 2) {
                ns.tableItem.lastChild.lastChild.style.color = ns.COLOR_BIG;
            } else {
                if (numberObject < 2) {
                    ns.tableItem.lastChild.lastChild.style.color = ns.COLOR_SMALL;
                }
            }
        }, x);
    });
    //return "hola";
}
function updateState() {
    ($("change").value === ns.TABLE_BUTTON) ? reloadList() : reloadTable();
}
function reloadSelect() {
    var select = $("select"),
        newSelect;
    newSelect = buildSelect("select", ns.classContainer.arrayClassUnique());
    $("delete_box").replaceChild(newSelect, select);
}
function reloadList() {
    var section = document.body.lastChild,
        newSection = section.cloneNode(false);
    generateList();
    newSection.appendChild(ns.listItem);
    document.body.replaceChild(newSection, section);
}
function reloadTable() {
    var section = document.body.lastChild,
        newSection = section.cloneNode(false);
    generateTable();
    newSection.appendChild(ns.tableItem);
    document.body.replaceChild(newSection, section);
}
function changeResume() {
    if(this.value === ns.TABLE_BUTTON) {
        this.value = ns.LIST_BUTTON;
        reloadTable();
    } else {
        this.value = ns.TABLE_BUTTON;
        reloadList();
    }
}
function createAtt() {
    var classValue = $(ns.INPUT_CLASS),
        nameValue = $(ns.INPUT_VALUE);
    ns.classContainer.addClass(classValue.value, nameValue.value);
    reloadSelect();
    nameValue.value = "";
    classValue.value = "";
}
function deleteClass() {
    ns.classContainer.removeClass($("select").value);
    reloadSelect();
}
function createPage() {
    var header = document.getElementsByTagName("header")[0],
        section = document.getElementsByTagName("section")[0],
        observer,
        config = {attributes: false, childList: true, characterData: false};
    header.appendChild(generateBox("span", "form_box"));
    header.appendChild(generateBox("span", "delete_box"));
    header.appendChild(generateBox("span", "change_box"));
    section.appendChild(ns.listItem);
    //Primer form
    ns.INPUT_TEXT.forEach(function (x) {
        $("form_box").appendChild(generateTextElement("label", x, ""));
        $("form_box").appendChild(generateInput("text", x));
    });
    $("form_box").appendChild(generateButton(createAtt, ns.INPUT_BUTTON, "add"));
    //Select
    $("delete_box").appendChild(buildSelect("select", ns.classContainer.arrayClassUnique()));
    $("delete_box").appendChild(generateButton(deleteClass, ns.DELETE_BUTTON, "delete"));
    observer = new MutationObserver(updateState);
    observer.observe($("delete_box"), config);
    $("change_box").appendChild(generateButton(changeResume, ns.TABLE_BUTTON, "change"));
}

window.onload = function () {
    ns.INIT_TAG.forEach(function (x) {
        document.body.appendChild(document.createElement(x));
    });
    createPage();
};

