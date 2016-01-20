

function generaArrayString(search) {
    var cadena = search;
    cadena.toLowerCase();
    return cadena.split("");
}
function ordenaArray(arrayCadena) {
    return arrayCadena.sort();
}
function generaArray(arrayCadena) {
    var arrayHistograma = new Array();
    arrayCadena.sort();
}
/*function generaArray(arrayCadena) {
    var letra = 0,
        histograma = new Array();
   // histograma.fill(0);
    while (arrayCadena[letra]) {
        if(!histograma[letra]) {
            histograma[arrayCadena[letra]] = 1;
        } else {
            histograma[arrayCadena[letra]] += 1;
        }
        //histograma[ABECEDARIO.indexOf(cadena[letra])] += 1;
        letra += 1;
    }
    return histograma;
}*/

function generaHistograma(search) {
    return ordenaArray(generaArrayString(search));
}