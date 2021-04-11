//https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator

function add (num1, num2) {
	return num1 + num2;
}

function subtract (num1, num2) {
	return num1 - num2;
}

function sum (arr) {
	let total = 0;
  
  for (let item of arr) {
    total += item;
  }
  
  return total;
}

function multiply (a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function power(num, power) {
  let result = 1;
  
	for (let i=0; i<power; i++) {
    result = result * num;
  }
  
  return result;
}

function factorial(num) {
  let result = 1;
  
  for (let i=1; i<num+1; i++) {
    result = result * i;
  }
  
  return result;
}

function operate(operator, a, b) {
  switch (operator) {
    case 'add' :
      return add(a, b);
    case 'subtract' :
      return subtract(a, b);
    case 'multiply' :
      return multiply(a, b);
    case 'divide' :
      return divide(a, b);
    case 'power' :
      return power(a, b);
  }
}

var numbers = document.querySelectorAll('.number');
var operators = document.querySelectorAll('.operator');
let calculate = document.querySelector('.calculate')
var display = document.querySelector('.display');
var clear = document.querySelector('.clear');
var del = document.querySelector('.delete');
var decimal = document.querySelector('.decimal');
var displayValue = 0;
var arr = [];

numbers.forEach((number) => {
  number.addEventListener('click', (e) => {
    console.log('Attemping to add ' + e.target.textContent);
    console.log(arr);
    if (typeof (arr[arr.length - 1]) === 'number') { //if last is a number, then append this new number to it e.g. 5, 6 makes 56
      console.log('I have reach here where arr[last] is a number');
      console.log(arr[arr.length - 1]);
      newValue = parseFloat(arr[arr.length - 1].toString() + e.target.textContent);
      arr[arr.length - 1] = parseFloat(newValue.toFixed(3));
      displayNumber(arr[arr.length - 1] )
    } else { //if last is not a number
        //if its empty or if last val is operator just display and append
        if (arr.length === 0 ) {
            displayNumber(e.target.textContent)
            arr.push(parseFloat(e.target.textContent));
        } else if (arr[arr.length - 1].endsWith('.')) { //if it's last value is a decimal (nb it will be a string already), append new number
            console.log('Trying to append after decimal:' + arr[arr.length - 1] + e.target.textContent);
            console.log('setting last value of array to the below: ');
            console.log(parseFloat(arr[arr.length - 1] + e.target.textContent));
            arr[arr.length - 1] = parseFloat(arr[arr.length - 1] + e.target.textContent);
            displayNumber(arr[arr.length - 1]);
        } else { //if last is an operator just display and append
            displayNumber(e.target.textContent)
            arr.push(parseFloat(e.target.textContent));
        }
    }
    console.log(arr);
  });
});

decimal.addEventListener('click', (e) => {
  //convert arr[last] to a string and append .
  console.log(arr);
  let str = arr[arr.length - 1].toString();
  if (!str.includes('.')) {
    arr[arr.length - 1] = arr[arr.length - 1].toString() + '.';
    displayNumber(arr[arr.length - 1]);
  }
  console.log(arr);
});

operators.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    console.log(e.currentTarget.id);
    if(readyToCompute(arr)) {
      compute(arr);
      displayNumber(arr[arr.length - 1]);
    }
    
    arr.push(e.currentTarget.id);
    console.log(arr);
  });
});

calculate.addEventListener('click', (e) => {
  console.log(e.target.textContent);
  if(readyToCompute(arr)) {
    compute(arr);
    displayNumber(arr[arr.length - 1]);
  }
});

clear.addEventListener('click', (e) => {
  console.log('Clearing array.');
  arr.splice(0, arr.length);
  display.textContent = '';
});

del.addEventListener('click', (e) => {
  if(isFinite(arr[arr.length - 1])) { //if last is a number
    if(arr[arr.length - 1].toString().length > 1) { //if number has >1 digit then delete last digit
      let newVal = arr[arr.length - 1].toString().slice(0,-1);
      arr[arr.length - 1] = parseFloat(newVal);
      displayNumber(arr[arr.length - 1]);
    } else { //if number is just one digit, delete it from array and from display
        while (isFinite(arr[arr.length - 1])) {
          arr.pop();
        }
        displayNumber('');
    }
  }
});

function readyToComputeFactorial(arr) {
    if ( isFinite(arr[arr.length - 2]) && arr[arr.length - 1] === 'factorial') {
      console.log('Ready to operate factorial');
      return true;
  }
}

function readyToCompute(arr) {
  if (isFinite(arr[arr.length - 1]) && (typeof arr[arr.length - 2] === 'string') && isFinite(arr[arr.length - 3])) {
    console.log(arr);
    console.log('Ready to operate');
    return true;
  } else { 
    console.log('Not ready to operate');
    return false;
  }
}

function compute(arr) {
  let result = operate(arr[arr.length - 2], arr[arr.length - 3], arr[arr.length - 1]);
  result = parseFloat(result.toFixed(3));
  arr.push(result);
  console.log(result);
  return result;
}

function displayNumber(number) {
  display.textContent = number;
}