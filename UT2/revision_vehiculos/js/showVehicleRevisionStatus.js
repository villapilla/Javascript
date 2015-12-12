function showVehicleRevisionStatus(search) {
    var greeting,
        information = "",
        system = "",
        now = new Date(),
        numberplate = extractValue(search, "numberplate"),
        lastrevdate = extractValue(search, "lastrevdate"),
        validNumberPlate = checkNumberPlate(numberplate),
        diffDays = checkLastTrevDate(lastrevdate, now);
    if (!validNumberPlate || diffDays === -1) {
        if (!validNumberPlate) {
            greeting = ERROR_NUMBERPLATE;
        } else {
            greeting = ERROR_LASTREVDATE;
        }
    } else {
        greeting = getMomentOfDay(now);
        if (diffDays > 365) {
            information = INSPECTION_MSG_PRE + randomBusiness() +
                INSPECTION_MSG_SUF;
        } else {
            information = NO_INSPECTION_MSG;
        }
        system = getSystemInformation();
    }
    return [greeting, information, system];
}