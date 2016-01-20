function $(selector) {
    return window.document.getElementById(selector);
}
function writeScreen() {
    var result = showVehicleRevisionStatus(window.location.search);
    $("saludo").innerHTML = result[0];
    $("contacto").innerHTML = result[1];
    $("sistema").innerHTML = result[2];
}

window.onload = writeScreen;
