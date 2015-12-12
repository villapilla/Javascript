function edad(edadHijo, edadPadre) {
    var salida;        
    if(!isNaN(edadHijo) && !isNaN(edadPadre)) {
        if(edadPadre <= edadHijo) {
            salida = "";
        } else {
            salida = edadPadre - 2 * edadHijo;
        }
    } else {
        salida ="";
    }
    return salida;
}