let calculator = {
    expression: '',
    result: 0,
    leftOperand: '',
    rightOperand: '',
    operator: '',
    sum: function() {
        return (+this.leftOperand + +this.rightOperand);
    },
    sub: function() {
        return (+this.leftOperand - +this.rightOperand);
    },
    mul: function() {
        return (+this.leftOperand * +this.rightOperand);
    },
    div: function() {
        return (+this.leftOperand / +this.rightOperand);
    },
    eql: function() {
        let exp = document.querySelector('.output__expression');
        let res = document.querySelector('.output__result');
        if(exp.classList.contains('output__expression_active')) {
            exp.classList.remove('output__expression_active');
            res.classList.add('output__result_active');
        } else {
            exp.classList.add('output__expression_active');
            res.classList.remove('output__result_active');
        }

        
    },
    printExpression: function() {
        document.querySelector('.output__expression').innerHTML = this.expression;
    },
    printResult: function() {
        switch (this.operator) {
            case '+':
                this.result = this.sum();
                document.querySelector('.output__result').innerHTML = '= ' + this.result;
                break;
            case '-':
                this.result = this.sub();
                document.querySelector('.output__result').innerHTML = '= ' + this.result;
                break;
            case '*':
                this.result = this.mul();
                document.querySelector('.output__result').innerHTML = '= ' + this.result;
                break;
            case '/':
                this.result = this.div().toFixed(6);
                document.querySelector('.output__result').innerHTML = '= ' + this.result;
                break;
            case '':
                document.querySelector('.output__result').innerHTML = '= ' + this.result;
                break;
            default:
                break;
            }
    },
    clearAll: function() {
        this.expression = '';
        this.result = 0;
        this.leftOperand = '';
        this.rightOperand = '';
        this.operator = '';
        this.printExpression();
        this.printResult();
    },
    set add(input) {
        let regExpNumber = /\d/;
        let regExpOperator = /\-|\+|\%|\*|\/|\=/;
        let regExpOption = /AC|del/;
        switch (input) {
            case input.match(regExpNumber) ? input : null:
                if(this.operator == '=') {
                    this.expression = input;
                    this.leftOperand = input;
                    this.rightOperand = '';
                    this.result = 0;
                    this.operator = '';
                    this.eql();
                    this.printExpression();
                    this.printResult();
                } else if (this.operator) {
                    this.expression += input;
                    this.rightOperand += input;
                    this.printExpression();
                    this.printResult();
                }
                else {
                    this.expression += input;
                    this.leftOperand += input;
                    this.printExpression();
                }
                break;
            case input.match(regExpOperator) ? input : null:
                if (input == '=') {
                    if (this.operator != '=') {
                        this.eql();
                        this.operator = '=';
                    }
                } else if (!this.expression.slice(-1).match(regExpOperator))
                {
                    if (this.operator == '') {
                        this.expression += input;
                        this.operator = input;
                        this.printExpression();
                    } else if (this.operator == '=') {
                        this.operator = input;
                        this.expression = this.result + this.operator;
                        this.leftOperand = this.result;
                        this.rightOperand = '';
                        this.printExpression();
                        this.printResult();
                        this.eql();
                    } else {
                        this.leftOperand = this.result;
                        this.rightOperand = '';
                        this.expression += input;
                        this.operator = input;
                        this.printExpression();
                    }
                }
                break;
            case input.match(regExpOption) ? input : null:
                this.clearAll();
            break;

        };
    },
};

let input = document.querySelector('.calc-app');

input.onclick = function(event) {
    console.log(event.target);
    if(event.target.classList.contains('button')) {
        calculator.add = event.target.getAttribute('data-input');
    }
};
