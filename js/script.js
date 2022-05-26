class Calculator {

    constructor() {
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = 0;
    }

    checkLastDigit(input, upperValue, reg) {
        if(!reg.test(input) && !reg.test(upperValue.substr(upperValue.length - 1))) {
            // ex: 9 + + 
            return true;

        } else {
            return false;
        }
    }

    btnPress() {
        let input = this.textContent;
        let upperValue = calc.upperValue.textContent;
        // verificar se tem somente números
        var reg = new RegExp('^\\d+$');

        // verificar sinais de operação
        if(calc.checkLastDigit(input, upperValue, reg)) {
            return false;
        }


        if(upperValue == '0') {
            calc.upperValue.textContent = input;
        } else {
            calc.upperValue.textContent += input;
        }
    }
}

// start obj
let calc = new Calculator;

// start btns
let buttons = document.querySelectorAll('.btn');

// map all buttons
for(let i = 0; buttons.length > i; i++) {
    buttons[i].addEventListener('click', calc.btnPress);
}