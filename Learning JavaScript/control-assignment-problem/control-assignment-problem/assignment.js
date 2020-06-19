
const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)
if (randomNumber > 0.7) {
  alert('Random number is greater than 0.7');
}
const numberArray = [1, 4, 3, 9, 5, 6, 2, 0, 7, 4];
for (let i = 0; i <= numberArray.length; i++) {
  console.log(numberArray[i]);
}
let i = 10;
while (i >= 0) {
  console.log(numberArray[i]);
  i--;
}
const randomNumber2 = Math.random();
if ((randomNumber > 0.7 && randomNumber2 > 0.7) || randomNumber <= 0.2 || randomNumber2 <= 0.2) {
  alert ('Both the numbers are greater than 0.7 or smaller than 0.2');
}
console.log(`${randomNumber}
${randomNumber2}`);
