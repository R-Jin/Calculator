// Add keyboard support

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        return "MATH ERROR, DIVISION WITH 0";
    } else {
        return a / b;
    }
}

function operate(operation, a, b) {
    switch (operation) {
        case "division":
            return divide(a, b);
        case "multiplication":
            return multiply(a, b);
        case "subtraction":
            return subtract(a, b);
        case "addition":
            return add(a, b);
    }
}

let result = 0;
let a = 0,
    b = 0;
let init = true;
let firstOperation = true;
let operation;

const display = document.getElementById("display");
const equals = document.querySelector(".equals");
const ac = document.querySelector(".ac");
const del = document.querySelector(".delete");
const numberBtns = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));

numberBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (init) {
            if (btn.textContent == 0) {
                display.textContent = 0;
            } else {
                if (btn.textContent == ".") {
                    display.textContent += btn.textContent;
                } else {
                    display.textContent = btn.textContent;
                }
                init = false;
            }
        } else {
            if (btn.textContent == ".") {
                if (!display.textContent.includes(".")) {
                    display.textContent += btn.textContent;
                }
            } else {
                display.textContent += btn.textContent;
            }
        }
    });
});

ac.addEventListener("click", () => {
    result = 0;
    a = 0;
    b = 0;
    init = true;
    firstOperation = true;
    display.textContent = 0;
});

del.addEventListener("click", () => {
    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
    } else if (display.textContent.length == 1) {
        display.textContent = 0;
        init = true;
    }
});

function getDisplayNumber() {
    return parseFloat(display.textContent);
}

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        if (firstOperation) {
            a = getDisplayNumber();
            init = true;
            commaInDisplay = false;
            operation = operator.dataset.operation;
            firstOperation = false;
        } else {
            init = true;
            commaInDisplay = false;
            operation = operator.dataset.operation;
            firstOperation = false;
            b = getDisplayNumber();
            result = operate(operation, a, b);
            display.textContent = result;
            a = result;
        }
    });
});

equals.addEventListener("click", () => {
    b = getDisplayNumber();
    result = operate(operation, a, b);
    display.textContent = result;
    a = result;
});
