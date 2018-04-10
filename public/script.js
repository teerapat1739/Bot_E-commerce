'use strict'

$(document).ready(function () {
    let qt = 1
    let total = parseFloat($('#total').val()),
        total1 = parseFloat($('#total').val())

        $('#plus').click(function () {
            qt += 1
            total+= total1
            total = +total.toFixed(2)
            console.log(total)
            $('#result').text(qt)
            $('#quantity').val(qt)
            $('#total').val(total)
        }),

        $('#minus').click(function () {
            qt === 1 ? 1: qt-1
            total === total1 ? total1 : total -= total1
            total = + total.toFixed(2)
            console.log(total)
            $('#result').text(qt)
            $('#quantity').val(qt)
            $('#total').val(total)
        })
})