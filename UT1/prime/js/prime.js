function isPrime(number) {
    var isprime = !(isNaN(number) || !isFinite(number) || number < 2),
        factor = number - 1;
    while (factor >= 2 && isprime) {
        isprime = number % factor;
        factor = factor - 1;
    }
    return isprime;
}
