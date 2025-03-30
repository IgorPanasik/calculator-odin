const buttons = document.querySelector('.buttons');
const display = document.querySelector('.display span');
const operators = document.querySelectorAll('.operator');

let operandOne = '';
let operator = null;
let operandTwo = '';
let result = null;
let isPercentage = false;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
	if (b === 0) {
		display.textContent = 'lmao';
		operandOne = '';
		operandTwo = '';
		operator = null;
		result = null;
		return NaN;
	}
	return a / b;
};

const operate = (a, operator, b) => {
	let result;
	switch (operator) {
		case '+':
			result = add(a, b);
			break;
		case '-':
			result = subtract(a, b);
			break;
		case '*':
			result = multiply(a, b);
			break;
		case '/':
			result = divide(a, b);
			break;
		default:
			return display.textContent;
	}
	return parseFloat(result.toFixed(10));
};

// Function to clear active operators
const resetActiveOperators = () =>
	operators.forEach((op) => op.classList.remove('active'));

//  Visual effect of button blinking
const addEffectBlink = (button) => {
	if (!button.classList.contains('operators')) {
		button.classList.add('blink');
		setTimeout(() => button.classList.remove('blink'), 100);
	}
};

const clickOperands = (e) => {
	if (
		e.target.classList.contains('operand') &&
		display.textContent.length < 18
	) {
		resetActiveOperators();
		addEffectBlink(e.target);
		if (!operator) {
			if (result !== null) (operandOne = ''), (result = null);
			operandOne = operandZero(operandOne, e.target.textContent);
			display.textContent = operandOne;
		} else {
			operandTwo = operandZero(operandTwo, e.target.textContent);
			display.textContent = operandTwo;
		}
	}
};

const clickOperator = (e) => {
	if (!e.target.classList.contains('operator')) return;
	if (isPercentage) isPercentage = false;

	if (operator && !operandTwo) {
		operator = e.target.textContent;
		resetActiveOperators();
		e.target.classList.add('active');
		return;
	}

	if (operandOne && operandTwo) {
		result = operate(parseFloat(operandOne), operator, parseFloat(operandTwo));
		operandOne = result;
		operandTwo = '';
		display.textContent = result;
	}

	resetActiveOperators();
	e.target.classList.add('active');
	operator = e.target.textContent;
};

const clickEquals = (e) => {
	if (!e.target.classList.contains('equals')) return;
	resetActiveOperators();
	addEffectBlink(e.target);

	if (operandOne && operator) {
		result = operate(
			parseFloat(operandOne),
			operator,
			parseFloat(operandTwo || operandOne),
		);

		if (isNaN(result)) return;
		operandOne = result;
		operandTwo = '';
		operator = null;
		display.textContent = result;
	}
};

// Function for handling leading zeros in numbers
const operandZero = (operand, input) =>
	operand === '0' ? input : operand + input;

const addDecimal = (e) => {
	if (e.target.textContent !== '.') return;
	addEffectBlink(e.target);

	if (!operator) {
		if (!operandOne.includes('.')) operandOne += operandOne ? '.' : '0.';
		display.textContent = operandOne;
	} else {
		if (!operandTwo.includes('.')) operandTwo += operandTwo ? '.' : '0.';
		display.textContent = operandTwo;
	}
};

// Changing sign and percentage
const modifyNumber = (e) => {
	if (
		!e.target.classList.contains('sign') &&
		!e.target.classList.contains('percent')
	)
		return;
	let modifier = e.target.classList.contains('sign') ? -1 : 0.01;

	if (!operator) {
		operandOne = (parseFloat(operandOne) * modifier).toString();
		display.textContent = operandOne;
	} else {
		operandTwo = (parseFloat(operandTwo) * modifier).toString();
		display.textContent = operandTwo;
	}

	if (e.target.classList.contains('percent')) isPercentage = true;
};

const allClear = (e) => {
	if (!e.target.classList.contains('clear')) return;
	operandOne = operandTwo = '';
	operator = result = null;
	display.textContent = '0';
};

// Function to refresh the display on click
const updateDisplay = (e) => {
	clickOperands(e);
	clickOperator(e);
	clickEquals(e);
	addDecimal(e);
	modifyNumber(e);
	allClear(e);
};

buttons.addEventListener('click', updateDisplay);
