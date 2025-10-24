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

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayMovements(account1.movements);

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

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// currencies.forEach(function (value, key) {
//   console.log(`${key}: ${value}`);
// });

// FOREACH WITH SET

// const currenciesUnique = new Set(["USD", "GBP", "USD", "USD", "EUR", "EUR"]);

// currenciesUnique.forEach(function (value) {
//   console.log(value);
// });

// --------------------------

// mini exercise with insertAdjacentHTML()

// const comments = document.querySelector(".comments");
// const commentForm = document.querySelector(".comment-form");
// const commentInput = document.querySelector(".comment-input");
// const commentBtn = document.querySelector(".comment-btn");

// commentForm.addEventListener("submit", function (a) {
//   a.preventDefault();
//   console.log("Form subbmited");

//   const valueCom = commentInput.value.trim();

//   if (valueCom !== "") {
//     const newComment = `
//       <p class="newCom">
//         ${valueCom}
//       </p>
//     `;
//     comments.insertAdjacentHTML("beforeend", newComment);
//     commentInput.value = "";
//   }
// });

// -------------------------

// coding chalange #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const juliaData = [3, 2, 5, 12, 7];
// const kateData = [4, 1, 15, 8, 3];

// function checkDogs(dogsJulia, dogsKate) {
//   let correctedJuliaArr = [...dogsJulia].slice(1); // [2, 5, 12, 7]
//   correctedJuliaArr.splice(2, 2); // [2, 5]

//   let combinedArr = [...correctedJuliaArr, ...dogsKate];

//   console.log(combinedArr);

//   combinedArr.forEach(function (age, i) {
//     if (age >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is a puppy, and is ${age} years old`);
//     }
//   });
// }

// checkDogs(juliaData, kateData);

// ---------------------------------------------------------

// MAP

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;

// const movementsUsd = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// console.log(movements);

// console.log(movementsUsd);

// // using arrow function

// const movementsUsdArrow = movements.map((mov) => mov * eurToUsd);

// console.log(movementsUsdArrow);

// -------------------------------------

// exercise with map

// console.log(accounts);

// let splitedArr = [];

// accounts.forEach(function (key) {
//   console.log(key.owner);
//   let splited = key.owner.split();
//   console.log(splited);
//   splitedArr.push(splited);
// });
// console.log(splitedArr);
// splitedArr.forEach(function (key) {
//   console.log(key);
// });

// function createUserName(name) {
//   const userName = name
//     .toLowerCase()
//     .split(" ")
//     .map((str) => str[0])
//     .join("");
//   return userName;
// }

// console.log(createUserName("Mark John"));

const names = accounts.map((name) => name.owner.split(" "));

let maped = names.map((str) => str.map((letter) => letter[0]));

maped.forEach(function (key, i) {
  let joined = key.join("").toLowerCase();
  console.log(`${names[i].join(" ")} - ${joined}`);
});
