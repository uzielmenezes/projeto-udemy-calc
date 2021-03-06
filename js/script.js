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

    division(n1, n2) {
        return parseFloat(n1) / parseFloat(n2);
    }

    multiplication(n1, n2) {
        return parseFloat(n1) * parseFloat(n2);
    }

    minus(n1, n2) {
        return parseFloat(n1) - parseFloat(n2);
    }

    sum(n1, n2) {
        return parseFloat(n1) + parseFloat(n2);
    }

    // atualiza os valores
    refreshValues(total) {
        this.upperValue.textContent = total;
        this.resultValue.textContent = total;
    }

    // resolução da operação
    resolution() {
        // explode string em um array
        let upperValueArray = (this.upperValue.textContent).split(' ');
        let l = upperValueArray.length;
        // resultado da operação
        let result = 0;

        for(let i = 0; i <= l; i++) {
            let operation = 0;
            let actualItem = upperValueArray[i];
            let n1 = upperValueArray[i - 1];
            let n2 = upperValueArray[i + 1];

            if (actualItem == 'x') {
                result = calc.multiplication(n1, n2);
                // força passagem na condição após o primeiro cálculo
                operation = 1;

            } else if(actualItem == '/') {
                result = calc.division(n1, n2);
                operation = 1;

                // checa para manter multiplicação e divisão como prioridade
            } else if (!upperValueArray.includes('x') && !upperValueArray.includes('/')) {
                //soma e subtração
                if(actualItem == '+') {
                    result = calc.sum(n1, n2);
                    operation = 1;

                } else if(actualItem == '-') {
                    result = calc.minus(n1, n2);
                    operation = 1;
                }
            }
            
            // atualiza valores do array para próxima iteração
            if(operation) {
                // indice anterior para o resultado da operação
                upperValueArray[i - 1] = result;
                // remove os itens já utilizados na operação
                upperValueArray.splice(i, 2);
                // atualiza o valor do indice
                i = 0;
            }
        }

        // informa necessidade de reset 
        if(result) {
            calc.reset = 1;
        }

        // atualiza os totais 
        calc.refreshValues(result);
    }

    btnPress() {
        let input = this.textContent;
        let upperValue = calc.upperValue.textContent;
        let resultValue = calc.resultValue;        

        // verifica se tem somente números
        var reg = new RegExp('^\\d+$');

        // limpa display para novas operações
        if(calc.reset && reg.test(input)) {
            upperValue = '0';
            resultValue.textContent = '0';            
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
                if(reg.test(input)) {
                    calc.upperValue.textContent = input;
                } 
                    
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