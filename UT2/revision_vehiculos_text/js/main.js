var vehicleinspection = require("./showVehicleRevisionStatus.js");

function writeScreen() {
    var result = vehicleinspection.showVehicleRevisionStatus(window.location.search);
    window.document.getElementById("saludo").innerHTML=result[0];
    window.document.getElementById("contacto").innerHTML=result[1];
    window.document.getElementById("sistema").innerHTML=result[2];
}

window.onload = writeScreen;
