let TimeLeft = document.querySelector(".time-left");
let QuizContainer = document.getElementById("container");
let NextBtn = document.getElementById("next-button");
let CountOfQuestion = document.querySelector(".number-of-question");
let DisplayContainer = document.getElementById("display-container");
let ScoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let UserScore = document.getElementById("user-score");
let StartScreen = document.querySelector(".start-screen");
let StartButton = document.getElementById("start-button");
let QuestionCount;
let ScoreCount = 0;
let count = 11;
let countdown;

//10 questions with options and answer array
const QuizArray = [
  {
    id: "0",
    question: "In MySQL, queries are always followed by what character?",
    options: [
      "Line Break",
      "Colon",
      "Semicolon",
      "Period",
    ],
    correct: "Semicolon",
  },

  {
    id: "1",
    question: "How can you remove a record using MySQL?",
    options: [
      "DELETE",
      "DELETE FROM",
      "REMOVE",
      "REMOVE FROM",
    ],
    correct: "DELETE FROM",
  },

  {
    id: "2",
    question: "Which MySQL command modifies data records in a table?",
    options: [
      "UPDATE",
      "MODIFY",
      "CHANGE",
      "ALTER",
    ],
    correct: "UPDATE",
  },

  {
    id: "3",
    question: "How does MySQL differ from SQL?",
    options: [
      "SQL is a standard language for retrieving and manipulating data from structured databases. MySQL is a nonrelational database management system that is used to manage SQL databases.",
      " SQL is a standard language for retrieving and manipulating data from structured databases. MySQL is a relational database management system that is used to manage SQL databases.",
      "They are not different. MySQL and SQL refer to the same thing.",
      "My SQL is a language, and SQL is a software application.",
    ],
    correct: "SQL is a standard language for retrieving and manipulating data from structured databases. MySQL is a relational database management system that is used to manage SQL databases.",
  },

  {
    id: "4",
    question: "If you need to order a table of movies by name, which query will work?",
    options: [
      "SELECT * FROM movies GROUP BY name",
      "SELECT * FROM movies ORDER BY name",
      "SELECT * FROM movies ORDER TABLE by name",
      "SELECT * FROM movies FILTER BY name",
    ],
    correct: "SELECT * FROM movies ORDER BY name",
  },

  {
    id: "5",
    question: "How do you select every row in a given table named “inventory”?",
    options: [
      "SELECT all FROM inventory;",
      "FROM inventory SELECT all;",
      "FROM inventory SELECT *;",
      "SELECT * FROM inventory;",
    ],
    correct: "SELECT * FROM inventory;",
  },

  {
    id: "6",
    question: "How would you retrieve data on all the customers where no phone number is stored?",
    options: [
      "SELECT * FROM customers WHERE PhoneNumber = NULL;",
      "SELECT * FROM customers WHERE PhoneNumber IS NOT VALID;",
      "SELECT * FROM customers WHERE PhoneNumber IS NULL;",
      "SELECT * FROM customers WHERE PhoneNumber IS UNKNOWN;",
    ],
    correct: "SELECT * FROM customers WHERE PhoneNumber IS NULL;",
  },

  {
    id: "7",
    question: "What function finds the current time or date in MySQL?",
    options: [
      "DATE()",
      "GETDATE()",
      "CURDATE()",
      "CURRENT()",
    ],
    correct: "CURDATE()",
  },

  {
    id: "8",
    question: "Which statement would you not use to filter data?",
    options: [
      "GROUP_BY",
      "MATCH",
      "WHERE",
      "LIKE",
    ],
    correct: "MATCH",
  },

  {
    id: "9",
    question: "What is the best type of query for validating the format of an email address in a MySQL table?",
    options: [
      "a SQL query using partitions",
      "a SQL query using IS NULL",
      "a SQL query using a regular expression",
      "a SQL query using LTRIM Or RTRIM",
    ],
    correct: "a SQL query using a regular expression",
  },



];

restart.addEventListener("click", () => {
  initial();
  DisplayContainer.classList.remove("hide");
  ScoreContainer.classList.add("hide");
});

NextBtn.addEventListener(
  "click",
  (DisplayNext = () => {
    QuestionCount += 1;

    if (QuestionCount == QuizArray.length) {
      DisplayContainer.classList.add("hide");
      ScoreContainer.classList.remove("hide");
      UserScore.innerHTML = "<span style='color: black'> Your score is " + ScoreCount + " out of " + QuestionCount + ".</span>";

    } else {
      CountOfQuestion.innerHTML =
        QuestionCount + 1 + " of " + QuizArray.length + " Question";

      QuizDisplay(QuestionCount);
      count = 11;
      clearInterval(countdown);
      TimerDisplay();
      NextBtn.disabled = true;
    }
  })
);

const TimerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    TimeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      DisplayNext();
    }
  }, 1000);
};

const QuizDisplay = (QuestionCount) => {
  let QuizCards = document.querySelectorAll(".container-mid");

  QuizCards.forEach((card) => {
    card.classList.add("hide");
  });
  QuizCards[QuestionCount].classList.remove("hide");
};

function QuizCreater() {
  QuizArray.sort(() => Math.random() - 0.5);

  for (let i of QuizArray) {
    i.options.sort(() => Math.random() - 0.5);
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");

    CountOfQuestion.innerHTML = 1 + " of " + QuizArray.length + " Question";

    let Question_DIV = document.createElement("p");
    Question_DIV.classList.add("question");
    Question_DIV.innerHTML = i.question;
    div.appendChild(Question_DIV);

    div.innerHTML += `
    <button class="option-div" onclick="checker(this)"> ${i.options[0]}</button>
    <button class="option-div" onclick="checker(this)"> ${i.options[1]}</button>
    <button class="option-div" onclick="checker(this)"> ${i.options[2]}</button>
    <button class="option-div" onclick="checker(this)"> ${i.options[3]}</button>
    `;

    QuizContainer.appendChild(div);
  }
}

function checker(UserOption) {
  let UserSolution = UserOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[QuestionCount];
  let options = question.querySelectorAll(".option-div");

  if (UserSolution === QuizArray[QuestionCount].correct) {
    UserOption.classList.add("correct");
    ScoreCount++;
  } else {
    UserOption.classList.add("incorrect");

    options.forEach((element) => {
      if (element.innerText == QuizArray[QuestionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  clearInterval(countdown);
  options.forEach((element) => {
    element.disabled = true;
  });

  let answered = Array.from(options).some((option) => option.classList.contains("correct"));
  if (answered) {
    NextBtn.disabled = false; // Enable the "Next" button
  }
}

function initial() {
  QuizContainer.innerHTML = "";
  QuestionCount = 0;
  ScoreCount = 0;
  ScoreCount = 0;
  count = 11;
  clearInterval(countdown);
  TimerDisplay();
  QuizCreater();
  QuizDisplay(QuestionCount);
}

StartButton.addEventListener("click", () => {
  StartScreen.classList.add("hide");
  DisplayContainer.classList.remove("hide");
  document.querySelector(".quiz-title").classList.add("hide");
  initial();
});


window.onload = () => {
  StartScreen.classList.remove("hide");
  DisplayContainer.classList.add("hide");
};

