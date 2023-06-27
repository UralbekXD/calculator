const Operators = Object.freeze({
    Add: "+",
    Subtract: "-",
    Multiply: "*",
    Divide: "/",
    Modulo: "%",
    SquareRoot: "sqrt",
    Power: "<span>x<sup>y</sup></span>",
});

class BasicMath {
    add(number1, number2) {
        return number1 + number2;
    }

    subtract(number1, number2) {
        return number1 - number2;
    }

    multiply(number1, number2) {
        return number1 * number2;
    }

    divide(number1, number2) {
        if (this.number2 > 0) {
            return number1 / number2;
        }

        throw new Error('Division by zero!');
    }

    decideThenOperate(operator, number1, number2) {
        switch (operator) {
            case Operators.Add:
                return this.add(number1, number2);
            case Operators.Subtract:
                return this.subtract(number1, number2);
            case Operators.Multiply:
                return this.multiply(number1, number2);
            case Operators.Divide:
                try {
                    return this.divide(number1, number2);
                } catch (e) {
                    console.error(e);
                    return "Error";
                }
        }
    }
}


class Calculator extends BasicMath {

    /*
        TODO:
            Add max length of numbers user can enter
            Add decimal numbers
            Round result like: 3.(3) => 10 / 3
     */

    constructor() {
        super();
        this.number1 = null;
        this.number2 = null;
        this.operator = null;
        this.result = 0;
        this.turn = "left";
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

    clear() {
        this.display.textContent = "";
        this.turn = "left";
        this.number1 = null;
        this.number2 = null;
        this.result = 0;
        this.operator = null;
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
        if (this.turn === "left") {
            this.operator = e.target.textContent;
            this.number1 = this.getDisplayValueInNumber();
            this.clearDisplay();
            this.switchTurn();
        } else {
            this.number1 = this.decideThenOperate(
                this.operator,
                this.number1,
                this.getDisplayValueInNumber(),
            );

            this.operator = e.target.textContent;
            this.clearDisplay();
        }
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

        this.result = this.decideThenOperate(this.operator, this.number1, this.number2);
        this.setResult();
    }

    init() {
        this.numbers.forEach((numberButton) => {
            numberButton.addEventListener("click", (e) => this.setDisplay(e));
        });

        this.operators.forEach((operatorButton) => {
            operatorButton.addEventListener("click", (e) => this.setOperator(e));
        })

        this.equalButton.addEventListener("click", (e) => this.operate(e));
        this.clearButton.addEventListener("click", () => this.clear());
    }
}

let calculator = new Calculator();
calculator.init();