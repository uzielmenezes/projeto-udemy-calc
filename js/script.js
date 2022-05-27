class Calculator {

    constructor() {
        this.upperValue = document.querySelector('#upper-number');
        this.resultValue = document.querySelector('#result-number');
        this.reset = 0;
    }

    clearValues() {
        this.upperValue.textContent = '0';
        this.resultValue.textContent = '0';
    }

    checkLastDigit(input, upperValue, reg) {
        if(!reg.test(input) && !reg.test(upperValue.substr(upperValue.length - 1))) {
            // ex: 9 + + 
            return true;

        } else {
            return false;
        }
    }

    // resolução da operação
    resolution() {
        // explode string em um array
        let upperValueArray = (this.upperValue.textContent).split(' ');
        let l = upperValueArray.length;
        // resultado da operação
        let result = 0;

        for(let i = 0; i <= l; i++) {
            let actualItem = upperValueArray[i];

            if (actualItem == '/') {
                result = parseFloat(upperValueArray[i - 1]) / parseFloat(upperValueArray[i + 1]);
            }

            if (actualItem == 'x') {
                result = parseFloat(upperValueArray[i - 1]) * parseFloat(upperValueArray[i + 1]);
            }

            if (actualItem == '-') {
                result = parseFloat(upperValueArray[i - 1]) - parseFloat(upperValueArray[i + 1]);
            }

            if (actualItem == '+') {
                result = parseFloat(upperValueArray[i - 1]) + parseFloat(upperValueArray[i + 1]);
            }
        }

        // informa necessidade de reset 
        if(result) {
            calc.reset = 1;
        }

        this.upperValue.textContent = result;
        this.resultValue.textContent = result;
    }

    btnPress() {
        let input = this.textContent;
        let upperValue = calc.upperValue.textContent;
        
        // verifica se tem somente números
        var reg = new RegExp('^\\d+$');

        // limpa display para novas operações
        if(calc.reset && reg.test(input)) {
            upperValue = '0';
        }
        // retorna o reset para o valor padrão
        calc.reset = 0;
        
        // chama o método para limpar o display
        if(input == 'AC') {
            calc.clearValues();
            
        } else if(input == '=') {
            calc.resolution();

        } else {
            // verifica sinais de operação
            if(calc.checkLastDigit(input, upperValue, reg)) {
                return false;
            }

            // adiciona espaços para os operadores
            if(!reg.test(input)) {
                input = ` ${input} `;
            }        
            if(upperValue == '0') {
                calc.upperValue.textContent = input;

            } else {
                calc.upperValue.textContent += input;
            }
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