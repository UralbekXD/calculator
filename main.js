const Operators = Object.freeze({
    Add: "+",
    Subtract: "-",
    Multiply: "*",
    Divide: "/",
    Modulo: "%",
    SquareRoot: "sqrt",
    Power: "<span>x<sup>y</sup></span>",
});

class BasicCalculator {
    constructor() {
        this.number1 = null;
        this.number2 = null;
        this.result = 0;
    }

    add() {
        this.result = this.number1 + this.number2;
    }

    subtract() {
        this.result = this.number1 - this.number2;
    }

    multiply() {
        this.result = this.number1 * this.number2;
    }

    divide() {
        if (this.number2 > 0) {
            this.result = this.number1 / this.number2;
        }

        throw new Error('Division by zero!');
    }
}


class Calculator extends BasicCalculator {
    constructor() {
        super();
        this.turn = "left";
        this.operator = null;
        this.display = document.querySelector(".display");
        this.numbers = document.querySelectorAll(".number");
        this.operators = document.querySelectorAll(".operator");
        this.functions = document.querySelectorAll(".function");
        this.equalButton = document.querySelector("#equal");
        this.clearButton = document.querySelector("#clear");
    }

    getDisplayValueInNumber() {
        return parseInt(this.display.textContent);
    }

    setDisplay(e) {
        this.display.textContent += e.target.textContent;
    }

    clearDisplay() {
        this.display.textContent = "";
    }

    switchTurn() {
        if (this.turn === "left") {
            this.turn = "right";
        } else {
            this.turn = "left";
        }
    }

    setOperator(e) {
        this.operator = e.target.textContent;
        if (this.turn === "left") {
            this.number1 = this.getDisplayValueInNumber();
            this.clearDisplay();
        }

        this.switchTurn();
    }

    setResult() {
        this.clearDisplay();
        this.display.textContent = this.result;
    }

    operate(e) {
        if (this.turn === "right") {
            this.number2 = this.getDisplayValueInNumber();
            this.switchTurn();
        }

        switch (this.operator) {
            case Operators.Add:
                this.add(this.number1, this.number2);
                break;
            case Operators.Subtract:
                this.subtract(this.number1, this.number2);
                break;
            case Operators.Multiply:
                this.multiply(this.number1, this.number2);
                break;
            case Operators.Divide:
                try {
                    this.divide(this.number1, this.number2);
                } catch (e) {
                    console.error(e);
                    this.result = "Error";
                }
                break;
        }

        this.setResult();
    }

    init() {
        console.log(this.display);
        this.numbers.forEach((numberButton) => {
            numberButton.addEventListener("click", (e) => this.setDisplay(e));
        });

        this.operators.forEach((operatorButton) => {
            operatorButton.addEventListener("click", (e) => this.setOperator(e));
        })

        this.equalButton.addEventListener("click", (e) => this.operate(e));
        this.clearButton.addEventListener("click", () => this.clearDisplay());
    }
}

let calculator = new Calculator();
calculator.init();