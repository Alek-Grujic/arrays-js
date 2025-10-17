"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// ----------------------------------------------

let arr = ["a", "b", "c", "d", "e"];

// SLICE

// let sliced = arr.slice(0, 3);
// let sliced = arr.slice(); // duplicated array
// let sliced = arr.slice(-1); // picking elements from the back

// console.log(arr); // doesn't change
// console.log(sliced);

// SPLICE

// let spliced = arr.splice(1); // deleted everything from the second element

// console.log(spliced); // ['b', 'c', 'd', 'd']
// console.log(arr); // ['a']

// let spliced = arr.splice(1, 2); // deleted two elements from second element(1)

// console.log(spliced); // ['b', 'c']
// console.log(arr); // ['a', 'd', 'e']

// let spliced = arr.splice(1, 2, "Smith"); // deleted two elements from second element(1) and adds new element to the original array

// console.log(spliced); // ['b', 'c']
// console.log(arr); // ['a', 'Smith', 'd', 'e']

// REVERSE

// let alphabet = ["e", "d", "c", "b", "a"];

// alphabet.reverse();

// console.log(alphabet); // ['a', 'b', 'c', 'd', 'e']

// CONCAT

// let moreLetters = ["f", "g", "h", "i", "j"];
// // let firstTenLetters = arr.concat(moreLetters);
// let firstTenLetters = [...arr, ...moreLetters]; // another way to combine two arrays

// console.log(firstTenLetters); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

// // JOIN

// let joined = firstTenLetters.join("-");

// console.log(joined);

// // AT

// let num = [1, 2, 3, 4, 5];

// let atMethod = num.at(-1);
// console.log(atMethod); // 5
// console.log(num.at(-1)); // last element

// console.log(num[-1]); // undefined

// FOREACH

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (let movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdraw ${Math.abs(movement)}`);
//   }
// }

// for (let [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}:You withdraw ${Math.abs(movement)}`);
//   }
// }

// forEach example
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdraw ${Math.abs(movement)}`);
//   }
// });

// forEack with second parameter - index

// movements.forEach(function (movement, i) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdraw ${Math.abs(movement)}`);
//   }
// });

// FOREACH WITH MAP

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (value, key) {
  console.log(`${key}: ${value}`);
});
