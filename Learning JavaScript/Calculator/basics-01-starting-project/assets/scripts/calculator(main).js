const defaultResult = 0;
let currentResult = 0;
let numberLog = [];
function getUserNumber() {
  return parseInt(userInput.value);
}
function forObject(
  operationIdentifier,
  prevResult,
  operationNumber,
  newResult
) {
  const logEntry = {
    operation: operationIdentifier,
    prevResult: prevResult,
    number: operationNumber,
    result: newResult,
  };
  numberLog.push(logEntry);
  console.log(numberLog);
}
function getDescription(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription);
}
function calculateResult(calculationType) {
  const userNumber = getUserNumber();
  if (
    calculationType !== 'ADD' &&
    calculationType !== 'SUBTRACT' &&
    calculationType !== 'MULTIPLY' &&
    calculationType !== 'DIVIDE' ||
    !userNumber
  ) {
    return;
  }
  const initialResult = currentResult;
  let mathOperator;
  if (calculationType === 'ADD') {
    currentResult += userNumber;
    mathOperator = '+';
  } else if (calculationType === 'SUBTRACT') {
    currentResult -= userNumber;
    mathOperator = '-';
  } else if (calculationType === 'MULTIPLY') {
    currentResult *= userNumber;
    mathOperator = '*';
  } else if (calculationType === 'DIVIDE') {
    currentResult /= userNumber;
    mathOperator = '/';
  }

  getDescription(mathOperator, initialResult, userNumber);
  forObject(calculationType, initialResult, userNumber, currentResult);
}
function add() {
  calculateResult('ADD');
}

function subtract() {
  calculateResult('SUBTRACT');
}

function multiply() {
  calculateResult('MULTIPLY');
}

function divide() {
  calculateResult('DIVIDE');
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);
