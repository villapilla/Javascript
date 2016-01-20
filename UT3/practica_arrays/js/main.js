var html = "";
function $(selector) {
    return window.document.getElementById(selector);
}
function writeScreen() {
    var result = generaHistograma(window.document.getElementById("cadena").value);
    html = "";
    $("histograma").innerHTML = "";
    result.forEach(generaTabla);
    $("histograma").innerHTML = "<table>" + html + "</table>";
}

function escribeHistograma(codigoHtml) {
    html += codigoHtml;
}



function generaTabla(element, index, array) {
    var html = "";
    if(element !== array[index-1]) {
        html += "<tr>" + "<td>" + element + "</td><td></td>";
    } else {
        if(element !== array[index+1]) {
            html += "<td></td></tr>";
        } else {
            html += "<td></td>";
        }
    }
   escribeHistograma(html);
}
function loadButton() {
   var button = window.document.getElementById("boton");
   button.addEventListener("click", writeScreen, false)
}

/*
function generaFila(numeroFila , array_histograma) {
    var html = "<tr>",
        caracter = 0;
    while(ABECEDARIO[caracter]) {
        html += "<td";
        if(numeroFila === 0) {
           html += ">" + ABECEDARIO[caracter];
        } else { 
            if(array_histograma[caracter] >= numeroFila) {
                 html += " class = \"fondo_azul\">";
            } else {
                 html += ">";
            }
        }
        html += "</td>"
        caracter += 1;
    }
    html += "</tr>"; 
    return html;
}

function generaTabla(maxColum, array_histograma) {
    var columna = 0,
        tabla = "<table>";
    while(columna < maxColum) {
        tabla += generaFila(columna, array_histograma);
        columna += 1;
    }
    tabla += "</table>";
    return tabla;
}*/
window.onload = loadButton;