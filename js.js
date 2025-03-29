const buttons = document.querySelector('.buttons');
const display = document.querySelector('.display span');
const operators = document.querySelectorAll('.operator');

let operandOne = '';
let operator = null;
let operandTwo = '';
let result = 0;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (a !== 0 ? a / b : 'Error');

const operate = (operandOne, operator, operandTwo) => {
	switch (operator) {
		case '+':
			return add(operandOne, operandTwo);
		case '-':
			return subtract(operandOne, operandTwo);
		case '*':
			return multiply(operandOne, operandTwo);
		case '/':
			return divide(operandOne, operandTwo);
		default:
			return display.textContent;
	}
};

const resetActiveOperators = () => {
	operators.forEach((op) => op.classList.remove('active'));
};

const addEffectBlink = (button) => {
	if (!button.classList.contains('operators')) {
		button.classList.add('blink');
		setTimeout(() => button.classList.remove('blink'), 200);
	}
};

const clickOperands = (e) => {
	if (e.target.classList.contains('operand')) {
		if (display.textContent.length < 18) {
			resetActiveOperators();
			addEffectBlink(e.target);
			if (!operator) {
				if (result !== null) {
					operandOne = '';
					result = null;
				}
				operandOne += e.target.textContent;
				display.textContent = operandOne;
			} else {
				operandTwo += e.target.textContent;
				display.textContent = operandTwo;
			}
		}
	}
};

const clickOperator = (e) => {
	if (e.target.classList.contains('operator')) {
		if (operandOne && operator && operandTwo) {
			result = operate(
				parseFloat(operandOne),
				operator,
				parseFloat(operandTwo),
			);
			operandOne = result;
			operandTwo = '';
			display.textContent = result;
		} else if (operandOne && operator && !operandTwo) {
			result = operate(
				parseFloat(operandOne),
				operator,
				parseFloat(operandOne),
			);
			operandOne = result;
			display.textContent = result;
		}
		resetActiveOperators();
		e.target.classList.add('active');
		operator = e.target.textContent;
		operandTwo = '';
	}
};

const clickEquals = (e) => {
	if (e.target.classList.contains('equals')) {
		resetActiveOperators();
		addEffectBlink(e.target);
		if (operandOne && operator) {
			result = operandTwo
				? operate(parseFloat(operandOne), operator, parseFloat(operandTwo))
				: operate(parseFloat(operandOne), operator, parseFloat(operandOne));
			operandOne = result;
			operandTwo = '';
			operator = null;
			display.textContent = result;
		}
	}
};

const updateDisplay = (e) => {
	clickOperands(e);
	clickOperator(e);
	clickEquals(e);
};

buttons.addEventListener('click', updateDisplay);
