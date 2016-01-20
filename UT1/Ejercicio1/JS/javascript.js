function funciona() {
    var num, suma = 0;
    do{
    num = prompt("Introduce un numero entre 1 y 998");
    num *= 1;
    if(num < 999 && num >= 0 && !isNaN(num)) {
        suma += num;
        }
    }while(num !== 999);
    document.write("La suma es: "+ suma)
    
}

window.onload(funciona());
