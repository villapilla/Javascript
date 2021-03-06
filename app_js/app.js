/*jslint
    browser:true,
    node:true,
*/
/*globals
    MutationObserver,
    document
*/
'use strict';
var doctype = document.implementation.createDocumentType('html', '', '');
document.insertBefore(doctype, document.childNodes[0]);
function generateBox(tag, id) {
    var element = document.createElement(tag);
    element.id = id;
    return element;
}
function Attribute(classValue, text) {
    this.classValue = classValue;
    this.text = text;
}
function ClassContainer() {
    this.container = [];
}
var ns = (function (ns) {
    ns.INIT_TAG = ["header", "section"];
    ns.INPUT_VALUE = "Valor";
    ns.INPUT_CLASS = "Clase";
    ns.INPUT_TEXT = [ns.INPUT_CLASS, ns.INPUT_VALUE];
    ns.ERROR = "Rellene ambos campos";
    ns.TITLE = "Manipulación del DOM";
    ns.INPUT_BUTTON = "Añadir";
    ns.DELETE_BUTTON = "Eliminar";
    ns.TABLE_BUTTON = "Tabla";
    ns.LIST_BUTTON = "Lista";
    ns.COLOR_BIG = "red";
    ns.COLOR_SMALL = "green";
    ns.COLOR_INHERIT = "black";
    ns.classContainer = new ClassContainer();
    ns.listItem = generateBox("ul", "listItem");
    ns.tableItem = generateBox("table", "tableItem");
    return ns;
}({}));
ClassContainer.prototype.addClass = function (classValue, text) {
    this.container.push(new Attribute(classValue, text));
};
ClassContainer.prototype.removeClass = function (classValue) {
    this.container = this.container.filter(function (x) {
        return x.classValue !== classValue;
    });
};
ClassContainer.prototype.arrayUnique = function (type) {
    return this.container.map(function (x) {
        return x[type];
    }).filter(function (element, index, arrayMap) {
        return arrayMap.indexOf(element) === index;
    });
};
ClassContainer.prototype.numberOfObject = function (classValue, text) {
    return this.container.reduce(function (x, y) {
        return (y.classValue === classValue && y.text === text) ? x + 1 : x;
    }, 0);
};
function $(id) {
    return document.getElementById(id);
}
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
function emptyElement(element, fillElements) {
    var newElement = element.cloneNode(false),
        state = fillElements && newElement.appendChild(fillElements);
    element.parentElement.replaceChild(newElement, element);
    return state;
}
function generateList() {
    ns.listItem = ns.listItem.cloneNode(false);
    ns.classContainer.container.forEach(function (x) {
        ns.listItem.appendChild(generateTextElement("li", x.text,
            x.classValue));
    });
    return ns.listItem;
}
function paintElement(number) {
    var color;
    if (number > 2) {
        color = ns.COLOR_BIG;
    } else {
        if (number < 2) {
            color = ns.COLOR_SMALL;
        } else {
            color = ns.COLOR_INHERIT;
        }
    }
    return color;
}
function generateTable() {
    var arrayClass = ns.classContainer.arrayUnique("classValue"),
        arrayText = ns.classContainer.arrayUnique("text"),
        numberObject;
    ns.tableItem = ns.tableItem.cloneNode(false);
    ns.tableItem.appendChild(generateBox("tr", "th_row"));
    ns.tableItem.firstChild.appendChild(generateTextElement("td",
        ns.INPUT_VALUE + "\\" + ns.INPUT_CLASS, ""));
    arrayClass.forEach(function (x) {
        ns.tableItem.firstChild.appendChild(generateTextElement("td", x, ""));
    });
    arrayText.forEach(function (classValue) {
        ns.tableItem.appendChild(generateBox("tr", ""));
        ns.tableItem.lastChild.appendChild(generateTextElement("td",
            classValue, ""));
        arrayClass.forEach(function (text) {
            numberObject = ns.classContainer.numberOfObject(text, this);
            ns.tableItem.lastChild.appendChild(generateTextElement("td",
                numberObject, "")).style.color = paintElement(numberObject);
        }, classValue);
    });
    return ns.tableItem;
}
function reloadData() {
    var section = document.body.lastChild,
        fillElements = ($("change").value === ns.TABLE_BUTTON) ?
                generateList() :
                generateTable();
    emptyElement(section, fillElements);
}
function reloadSelect() {
    var select = $("select"),
        newSelect;
    emptyElement($("error"));
    newSelect = buildSelect("select", ns.classContainer.arrayUnique("classValue"));
    $("delete_box").replaceChild(newSelect, select);
}
function changeResume() {
    if (this.value === ns.TABLE_BUTTON) {
        this.value = ns.LIST_BUTTON;
    } else {
        this.value = ns.TABLE_BUTTON;
    }
    reloadData();
}
function createAtt() {
    var classValue = $(ns.INPUT_CLASS),
        nameValue = $(ns.INPUT_VALUE);
    if (classValue.value === "" || nameValue.value === "") {
        emptyElement($("error"), document.createTextNode(ns.ERROR));
    } else {
        ns.classContainer.addClass(classValue.value, nameValue.value);
        reloadSelect();
        nameValue.value = "";
        classValue.value = "";
    }
}
function deleteClass() {
    ns.classContainer.removeClass($("select").value);
    reloadSelect();
}
function createPage() {
    var header = document.getElementsByTagName("header")[0],
        section = document.getElementsByTagName("section")[0],
        form_box = header.appendChild(generateBox("span", "form_box")),
        delete_box = header.appendChild(generateBox("span", "delete_box")),
        change_box = header.appendChild(generateBox("span", "change_box")),
        observer,
        config = {attributes: false, childList: true, characterData: false};
    header.insertBefore(generateTextElement("h2", ns.TITLE, "title"),
        $("form_box"));
    header.appendChild(generateBox("h4", "error"));
    ns.INPUT_TEXT.forEach(function (x) {
        form_box.appendChild(generateTextElement("label", x, ""));
        form_box.appendChild(generateInput("text", x));
    });
    form_box.appendChild(generateButton(createAtt, ns.INPUT_BUTTON, "add"));
    delete_box.appendChild(buildSelect("select",
        ns.classContainer.arrayUnique("classValue")));
    delete_box.appendChild(generateButton(deleteClass,
        ns.DELETE_BUTTON,
        "delete"));
    observer = new MutationObserver(reloadData);
    observer.observe($("delete_box"), config);
    change_box.appendChild(generateButton(changeResume,
        ns.TABLE_BUTTON, "change"));
    section.appendChild(ns.listItem);
}
window.onload = function () {
    ns.INIT_TAG.forEach(function (x) {
        document.body.appendChild(document.createElement(x));
    });
    createPage();
};