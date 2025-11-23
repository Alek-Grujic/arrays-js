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

// add username to each account
function createUsernames(accs) {
  accs.forEach(function (key) {
    // console.log(key);
    key.username = key.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
}
createUsernames(accounts);

// display movements function
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
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

// display summary function
function displaySummary(account) {
  const sumIn = account.movements
    .filter((num) => num > 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${sumIn}€`;

  const sumOut = account.movements
    .filter((num) => num < 0)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(sumOut)}€`;

  const sumInterest = account.movements
    .filter((int) => int > 0)
    .map((num) => (num * account.interestRate) / 100)
    .filter((n) => n >= 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${sumInterest}€`;
}

// display balance function
function displayBalance(accountBal) {
  accountBal.balance = accountBal.movements.reduce(
    (acc, curr) => acc + curr,
    0
  );
  labelBalance.textContent = `${accountBal.balance}€`;
}

// update UI function

function updateUI(acc) {
  // display movements and summary
  displayMovements(acc.movements, acc.interestRate);

  // display summary
  displaySummary(acc);

  // display balance
  displayBalance(acc);
}

// event handler
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log("login");
  }

  // display UI and message

  labelWelcome.textContent = `Welcome back ${
    currentAccount.owner.split(" ")[0]
  }`;
  containerApp.style.opacity = 1;

  // clear input fields
  inputLoginUsername.value = inputLoginPin.value = "";

  updateUI(currentAccount);
});

// transfer button functionalitie
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  if (
    recieverAcc &&
    amount > 0 &&
    amount <= currentAccount.balance &&
    recieverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
  inputTransferAmount.value = inputTransferTo.value = "";
});

// request loan functionalitie

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }

  inputLoanAmount.value = "";
});

// closing account function
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const deletedAcc = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(deletedAcc, 1);

    // hide UI
    containerApp.style.opacity = 0;

    inputCloseUsername.value = inputClosePin.value = "";

    labelWelcome.textContent = "Log in to get started";
  }
});

// sort button

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);

  sorted = !sorted;
});

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

// let arr = ["a", "b", "c", "d", "e"];

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

// const names = accounts.map((name) => name.owner.split(" "));

// let maped = names.map((str) => str.map((letter) => letter[0]));

// maped.forEach(function (key, i) {
//   let joined = key.join("").toLowerCase();
//   console.log(`${names[i].join(" ")} - ${joined}`);
// });

// function createUsernames(accs) {
//   accs.forEach(function (key) {
//     console.log(key);
//     key.username = key.owner
//       .toLowerCase()
//       .split(" ")
//       .map((name) => name[0])
//       .join("");
//   });
// }

// createUsernames(accounts);

// FILTER

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposits = movements.filter(function (mov) {
//   return mov < 0;
// });

// console.log(deposits);

// REDUCE

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const balance = movements.reduce(function (acc, curr, i) {
//   return acc + curr;
// }, 0);

// console.log(balance);

// const maxValue = movements.reduce((acc, curr) => (acc > curr ? acc : curr));

// console.log(maxValue);

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

*/

// function calcAverageHumanAge(ages) {
//   let humanAge = ages
//     .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter((filteredAge) => filteredAge >= 18);
//   // .reduce((acc, curr) => acc + curr);
//   let reduced = humanAge.reduce((acc, curr) => acc + curr, 0);
//   let average;
//   if (humanAge.length !== 0) {
//     average = reduced / humanAge.length;
//     return average;
//   }
// }

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// function calcAverageHumanAge(ages) {
//   let humanAge = ages
//     .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter((filteredAge) => filteredAge >= 18)
//     .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
//   return humanAge;
// }

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// ------------------------------------

// CHAINING

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;

// const totalDepositUSD = movements
//   .filter((num) => num > 0)
//   .map((mov, i, arr) => {
//     console.log(arr);
//     return mov * eurToUsd;
//   })
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositUSD);

// ------------------------------------

// FIND

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const withdrawal = movements.find((mov) => mov < 0);

// console.log(withdrawal);

// const account = accounts.find((acc) => acc.owner === "Jessica Davis");

// console.log(account);

// for (let key of accounts) {
//   if (key.owner === "Jessica Davis") console.log(key);
// }

// FINDLAST AND FINDLASTINDEX

// const movements = [200, 450, -400, 3000, -650, -130, 2500, 70, 1300];

// const largeMov = movements.findLastIndex((mov) => mov >= 2000);

// console.log(largeMov);

// let formula = movements.length - largeMov - 1;

// console.log(
//   `Your latest large movement was (${movements[largeMov]}€) ${formula} movements ago `
// );

// EVERY

// const movements = [200, 450, -400, 3000, -650, -130, 2500, 70, 1300];

// const deposit = (mov) => mov > 0;

// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// FLAT AND FLATMAP

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

// console.log(arr.flat());

// // depper level

// const deepArr = [[[1, 2], 3], [[4, 5], 6], 7];

// console.log(deepArr.flat());
// console.log(deepArr.flat(2));

// // accounts flat and flatMap

// const accountsMovements = accounts.map((acc) => acc.movements);
// console.log(accountsMovements);
// const allMovements = accountsMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, curr) => acc + curr, 0);
// console.log(overallBalance);

// // chaining

// const overallBalanceChain = accounts
//   .map((acc) => acc.movements)
//   .flat()
//   .reduce((acc, curr) => acc + curr, 0);

// console.log(overallBalanceChain);

// // flatMap

// const overallBalanceFlatMap = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((acc, curr) => acc + curr, 0);
// console.log(overallBalanceFlatMap);

// ------------------------------------------------------------

// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/

// const breeds = [
//   {
//     breed: "German Shepherd",
//     averageWeight: 32,
//     activities: ["fetch", "swimming"],
//   },
//   {
//     breed: "Dalmatian",
//     averageWeight: 24,
//     activities: ["running", "fetch", "agility"],
//   },
//   {
//     breed: "Labrador",
//     averageWeight: 28,
//     activities: ["swimming", "fetch"],
//   },
//   {
//     breed: "Beagle",
//     averageWeight: 12,
//     activities: ["digging", "fetch"],
//   },
//   {
//     breed: "Husky",
//     averageWeight: 26,
//     activities: ["running", "agility", "swimming"],
//   },
//   {
//     breed: "Bulldog",
//     averageWeight: 36,
//     activities: ["sleeping"],
//   },
//   {
//     breed: "Poodle",
//     averageWeight: 18,
//     activities: ["agility", "fetch"],
//   },
// ];

// // 1. task

// let huskyWeight = breeds
//   .filter((hus) => hus.breed === "Husky")
//   .map((weight) => weight.averageWeight)
//   .join();

// console.log(huskyWeight);

// // better version - find

// huskyWeight = breeds.find((hus) => hus.breed === "Husky").averageWeight;

// console.log(huskyWeight);

// console.log("------------");

// // 2. task

// let dogBothActivities;

// breeds.forEach((value) => {
//   if (
//     value.activities.includes("running") &&
//     value.activities.includes("fetch")
//   ) {
//     dogBothActivities = `${value.breed} is only dog that loves fetch and running.`;
//   }
// });

// console.log(dogBothActivities);

// // better version - find

// dogBothActivities = breeds.find(
//   (breed) =>
//     breed.activities.includes("running") && breed.activities.includes("fetch")
// ).breed;

// console.log(`Dog that loves running and fetch is ${dogBothActivities}`);

// console.log("------------");

// // 3. task

// let allActivities = breeds.flatMap((breedAct) => breedAct.activities);

// console.log(allActivities);

// console.log("------------");

// // 4. task

// let uniqueActivities = [...new Set(allActivities)];

// console.log(uniqueActivities);

// console.log("------------");

// // 5. task
// //  Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".

// // let breedsLikeSwimming = breeds
// //   .filter((str) => str.activities.includes("swimming"))
// //   .flatMap((other) => other.activities);

// // let swimmingAdjacent = [...new Set(breedsLikeSwimming)];

// // let indexOfSwimming = [...swimmingAdjacent].indexOf("swimming");

// // swimmingAdjacent.splice(indexOfSwimming, 1);

// // console.log(swimmingAdjacent);

// // better version

// let swimmingAdjacent = [
//   ...new Set(
//     breeds
//       .filter((str) => str.activities.includes("swimming"))
//       .flatMap((other) => other.activities)
//       .filter((swimm) => swimm !== "swimming")
//   ),
// ];

// console.log(swimmingAdjacent);

// console.log("------------");

// // 6. task
// // Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".

// console.log(breeds.every((wh) => wh.averageWeight >= 10));

// console.log("------------");

// // 7. task
// // Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

// console.log(breeds.some((active) => active.activities.length >= 3));

// console.log("------------");

// // Bonus task
// // What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

// // let breedLikeFetch = breeds
// //   .filter((fetch) => fetch.activities.includes("fetch"))
// //   .reduce((acc, curr) => (acc.averageWeight > curr.averageWeight ? acc : curr));

// // console.log(
// //   `${breedLikeFetch.breed} is heaviest dog that likes to fetch. His average weight is - ${breedLikeFetch.averageWeight}kg`
// // );

// // Math.max version

// let heaviestBreed = breeds
//   .filter((fetch) => fetch.activities.includes("fetch"))
//   .map((hw) => hw.averageWeight);

// console.log(`${Math.max(...heaviestBreed)}kg`);

// // without variable

// console.log(
//   `${Math.max(
//     ...breeds
//       .filter((fetch) => fetch.activities.includes("fetch"))
//       .map((hw) => hw.averageWeight)
//   )}kg`
// );

// --------------------------------------------------------------

// SORT

// const owners = ["Jonas ", "Zack", "Adam", "Martha"];

// console.log(owners.sort());

// const movements = [200, 450, -400, 3000, -650, -130, 2500, 70, 1300];

// movements.sort();

// console.log(movements);

// const arr = [...movements].sort((a, b) => a - b);

// console.log(arr);

// OBJECTGROUPBY

// const movements = [200, 450, -400, 3000, -650, -130, 2500, 70, 1300];

// const grouped = Object.groupBy(movements, (mov) =>
//   mov > 0 ? "Deposit" : "Withdrawal"
// );

// console.log(grouped);

// // exercise 1.
// const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const oddsAndEven = Object.groupBy(nums, (num) =>
//   num % 2 === 0 ? "even" : "odds"
// );

// console.log(oddsAndEven);

// // exercise 2.
// const people = [
//   { name: "Ana", age: 20 },
//   { name: "Marko", age: 20 },
//   { name: "Nikola", age: 30 },
//   { name: "Sara", age: 25 },
//   { name: "Dunja", age: 30 },
// ];

// const age = Object.groupBy(people, (age) => age.age);

// console.log(age);

// // exercise 3.
// const dogs = [
//   { name: "Rex", age: 5 },
//   { name: "Bella", age: 1 },
//   { name: "Max", age: 3 },
//   { name: "Luna", age: 1 },
//   { name: "Rocky", age: 0.5 },
// ];

// const statusDogs = Object.groupBy(dogs, (statusDog) => {
//   if (statusDog.age > 3) return "adult";
//   if (statusDog.age >= 1 && statusDog.age <= 3) return "young";
//   if (statusDog.age < 1) return "puppy";
// });

// console.log(statusDogs);

// // FILL

// let x = [1, 2, 3];

// x.fill(1);

// console.log(x);

// x = new Array(5).fill(1);

// console.log(x);

// x = new Array(5).fill(0).map((_, i) => i + 1);

// console.log(x);

// // ARRAY.FROM

// let y = Array.from({ length: 10 }, (_, i) => Math.trunc(Math.random() * 10));

// console.log(y);

// labelBalance.addEventListener("click", function () {
//   const movementUI = Array.from(
//     document.querySelectorAll(".movements__value"),
//     (el) => el.textContent.replace("€", "")
//   );
//   console.log(movementUI);
// });

// // NON-DESTRUCTIVE ALTERNATIVES

// const arr = [10, 20, 30, 40];

// const updated = arr.with(2, 999);

// console.log(updated); // [10, 20, 999, 40]
// console.log(arr); // [10, 20, 30, 40]  ← original ostaje isti

// // changing last element
// let numbers = [1, 2, 3, 4, 5];

// const lastChanged = numbers.with(numbers.length - 1, 999);

// console.log(lastChanged);

// ---------------------------------------------------
// small chalanges

// 1.

// let sumOfDeposits1000 = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((acc) => acc >= 1000).length;

// let sumOfDeposits1000 = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0);

// console.log(sumOfDeposits1000);

// // 2.

// const { deposits, withdrawals } = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce(
//     (sums, curr) => {
//       // curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += curr);
//       sums[curr > 0 ? "deposits" : "withdrawals"] += curr;
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(deposits, withdrawals);

// // 3.

// // this is a nice title -> This Is a Nice Title
// const convertTitleCase = function (title) {
//   const capitilazed = (str) => str[0].toUpperCase() + str.slice(1);

//   const exceptions = ["a", "an", "the", "but", "or", "on", "in", "with", "and"];

//   const titleCase = title
//     .toLowerCase()
//     .split(" ")
//     .map((word) => (exceptions.includes(word) ? word : capitilazed(word)))
//     .join(" ");

//   return capitilazed(titleCase);
// };

// console.log(convertTitleCase("this is a nice title"));
// console.log(convertTitleCase("this is a LONG title but not too long"));
// console.log(convertTitleCase("and here is another title with an EXAMPLE"));

// ---------------------------------------------------

// Coding Challenge #5

/*
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

YOUR TASKS:

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
9. Group the dogs by the number of owners they have
10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
{ weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
{ weight: 8, curFood: 200, owners: ['Matilda'] },
{ weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
{ weight: 18, curFood: 244, owners: ['Joe'] },
{ weight: 32, curFood: 340, owners: ['Michael'] },
];

GOOD LUCK 😀
*/
