function addition(a,b) {
  return Number(a)+Number(b);
}
function subtraction(a,b) {
  return a-b;
}
function division(a,b) {
  if (b==0) {
      return 'UNDEFINED';
  } else {
      return a/b;
  }
}
function multiplication(a,b) {
  return a*b;
}
function exponential(a,b) {
  return a**b;
}
function negative(a) {
  return -1*a;
}
function operate(a,b,operand) {
  if (operand == 'add') {
    return addition(a,b);
  } else if (operand == 'minus') {
    return subtraction(a,b);
  } else if (operand == 'divide') {
    return division(a,b);
  } else if (operand == 'multiply') {
    return multiplication(a,b);
  } else if (operand == 'exponent') {
    return exponential(a,b);
  } 
}
shouldStartOver = true;
let buttons = {
    clear: {charToAdd: "AC", class1: "clear", class2: "key", stylingClass: "clearKey"},
    negative: {charToAdd: "+/-", class1: "negative", class2: "key", stylingClass: "opKey"},
    exponent: {charToAdd: "^", operand: "exponent", class1: "operat", class2: "key", stylingClass: "opKey"},
    divide: {charToAdd: "÷", operand: "divide", class1: "operat", class2: "key", RightBorder: "needsRightBorder", stylingClass: "opKey"},
    seven: {charToAdd: "7", operand: "nothing", class1: "num", class2: "key"},
    eight: {charToAdd: "8", operand: "nothing", class1: "num", class2: "key"},
    nine: {charToAdd: "9", operand: "nothing", class1: "num", class2: "key"},
    multiply: {charToAdd: "x", operand: "multiply", class1: "operat", class2: "key", RightBorder: "needsRightBorder", stylingClass: "opKey"},
    four: {charToAdd: "4", operand: "nothing", class1: "num", class2: "key"},
    five: {charToAdd: "5", operand: "nothing", class1: "num", class2: "key"},
    six: {charToAdd: "6", operand: "nothing", class1: "num", class2: "key"},
    minus: {charToAdd: "-", operand: "minus", class1: "operat", class2: "key", RightBorder: "needsRightBorder", stylingClass: "opKey"},
    one: {charToAdd: "1", operand: "nothing", class1: "num", class2: "key"},
    two: {charToAdd: "2", operand: "nothing", class1: "num", class2: "key"},
    three: {charToAdd: "3", operand: "nothing", class1: "num", class2: "key"},
    plus: {charToAdd: "+", operand: "add", class1: "operat", class2: "key", RightBorder: "needsRightBorder", stylingClass: "opKey"},
    zero: {charToAdd: "0", operand: "nothing", class1: "num", class2: "key", BottomBorder: "needsBottomBorder"},
    decimal: {charToAdd: ".", class1: "decimal", class2: "key", BottomBorder: "needsBottomBorder"},
    delete: {charToAdd: "del", class1: "delete", class2: "key", BottomBorder: "needsBottomBorder", stylingClass: "delKey"},
    equals: {charToAdd: "=", class1: "equals", class2: "key", BottomBorder: "needsBottomBorder", RightBorder: "needsRightBorder", stylingClass: "equalKey"}
  };
let objectLength = Object.keys(buttons).length;
function createPad() {
  for (i=0; i<objectLength; i++) {
    let cell = document.createElement('div');
    let cellParent = document.getElementById('calculator-keypad');
    cellParent.appendChild(cell);
    cell.classList.add(buttons[Object.keys(buttons)[i]].class1, buttons[Object.keys(buttons)[i]].class2, buttons[Object.keys(buttons)[i]].operand, buttons[Object.keys(buttons)[i]].BottomBorder, buttons[Object.keys(buttons)[i]].RightBorder, buttons[Object.keys(buttons)[i]].stylingClass);
    cell.id = buttons[Object.keys(buttons)[i]].charToAdd;
    cell.textContent = cell.id;
    let operand = buttons[Object.keys(buttons)[i]].operand;
    cell.addEventListener('click', e => {
      if ((cell.classList.contains('num')) && (shouldStartOver == true)) {
        document.getElementById('incomingNum').textContent = cell.id;
        shouldStartOver = false;
      } else if ((cell.classList.contains('num')) && (shouldStartOver == false)) {
        document.getElementById('incomingNum').textContent += cell.id;        
        //Rework next line
      } else if ((cell.classList.contains('operat')) && (document.getElementById('numToDoWith').textContent == '')) {
        document.getElementById('numToDoWith').textContent = document.getElementById('incomingNum').textContent;
        document.getElementById('operandHolder').textContent = operand;
        document.getElementById('operand').textContent = cell.id;
        shouldStartOver = true;
        document.getElementById('incomingNum').textContent = '';
        //Rework next line
      } else if ((cell.classList.contains('operat')) && (document.getElementById('numToDoWith').textContent != '')) {
        document.getElementById('numToDoWith').textContent = operate(document.getElementById('numToDoWith').textContent, document.getElementById('incomingNum').textContent, document.getElementById('operandHolder').innerHTML);
        document.getElementById('operand').textContent = operand;
        shouldStartOver = true;
      } else if (cell.classList.contains('delete')) {
        document.getElementById('incomingNum').textContent = document.getElementById('incomingNum').textContent.slice(0,-1);
      } else if (cell.classList.contains('negative')){
        document.getElementById('incomingNum').textContent = negative(document.getElementById('incomingNum').textContent);
      //Rework next line
      } else if ((cell.classList.contains('equals')) && (document.getElementById('numToDoWith').textContent != '')) {
        document.getElementById('incomingNum').textContent = operate(document.getElementById('numToDoWith').textContent, document.getElementById('incomingNum').textContent, document.getElementById('operandHolder').innerHTML);
        shouldStartOver = true;
        document.getElementById('operand').textContent = '';
        document.getElementById('numToDoWith').textContent = '';
        document.getElementById('operandHolder').textContent = '';
      } else if (cell.classList.contains('clear')) {
        //Rework next line
        document.getElementById('numToDoWith').textContent = '';
        document.getElementById('incomingNum').textContent = '';
        document.getElementById('operand').textContent = '';
        shouldStartOver = true;
      } else if (cell.classList.contains('decimal')) {
        if (document.getElementById('incomingNum').textContent.includes('.') == false) {
          document.getElementById('incomingNum').textContent += '.';
        }
      }
    })
  }
}
createPad();
let keysToShade = document.getElementsByClassName('key');
for (i=0;i<keysToShade.length;i++) {
    keysToShade[i].addEventListener('mouseenter', e=> {
        e.target.style.filter = 'brightness(70%)';
    });
    keysToShade[i].addEventListener('mousedown', e => {
        e.target.style.filter = 'brightness(35%)';
        e.target.style.fontSize = '12px';
    })
    keysToShade[i].addEventListener('mouseup', e => {
        e.target.style.filter = 'brightness(70%)';
        e.target.style.fontSize = '20px';
})
    keysToShade[i].addEventListener('mouseleave', e=> {
        e.target.style.filter = 'brightness(100%)';
    })
}; 