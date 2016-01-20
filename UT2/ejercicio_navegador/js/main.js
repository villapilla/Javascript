var fecha = new Date(),
    diaSemana,
    nombre = prompt("Introduce nombre y apellidos"),
    mes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    fechaFinDeAnio = new Date(2015, 11, 31),
    diferenciaFecha = Math.floor((fechaFinDeAnio.getTime() - fecha.getTime())/(1000*60*60*24)),
    TextoSalida;


switch(fecha.getUTCDay(fecha)) {
case 0:
    diaSemana = "Domingo";
    break;
case 1:
    diaSemana = "Lunes";
    break;
case 2:
    diaSemana = "Martes";
    break;
case 3:
    diaSemana = "Miercoles";
    break;
case 4:
    diaSemana = "Jueves";
    break;
case 5:
    diaSemana = "Viernes";
    break;
case 6:
    diaSemana = "Sabado";
    break;
default:
    diaSemana = "";
    break;
}
TextoSalida = "Hola, " + nombre + "<br>Hoy es " + diaSemana + ", " + fecha.getUTCDate() + " de " + mes[fecha.getMonth()] +
                " de " + fecha.getFullYear() + " y son las " + fecha.getHours() +":" + 
                fecha.getMinutes() + ":" + fecha.getSeconds() + " horas, por lo tanto faltan " + diferenciaFecha + " dias para finalizar el año" +
                 ". Tu nombre tiene un total de " + nombre.length + " letras<br> Utilizas el navegador " + window.navigator.appName +
                 " en su versión " + window.navigator.appVersion;

document.write(TextoSalida);
