function tiempo(time) {
    var hour = (time - (time % 3600))/3600;
    var minute = ((time % 3600) - ((time % 3600) % 60)) / 60;
    var second = ((time % 3600) % 60);
    return hour + " horas : " + minute +  " minutos : " + second + " segundos";
}