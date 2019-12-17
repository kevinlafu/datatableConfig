function number_format(number, decimals, dec_point, thousands_point) {
    if (number == null || !isFinite(number)) {
        throw new TypeError("number is not valid");
    }

    if (!decimals) {
        var len = number.toString().split('.').length;
        decimals = len > 1 ? len : 0;
    }

    if (!dec_point) { dec_point = '.'; }
    if (!thousands_point) { thousands_point = ',';}

    number = parseFloat(number).toFixed(decimals);
    number = number.replace(".", dec_point);
    var splitNum = number.split(dec_point);
    splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
    number = splitNum.join(dec_point);
    return number;
}

function number_format_back(num) {
    num = num + '';
    num = num.replace(/\./g, '');
    num = num.split(',');
    num = num[0] + '.' + num[1];
    return parseFloat(num);
}
