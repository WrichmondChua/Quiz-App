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
    question: "Find the square root of √144",
    options: [
      "11",
      "12",
      "13",
      "14",
    ],
    correct: "12",
  },

  {
    id: "1",
    question: "What is the value of 1/2 if it's converted to decimal?",
    options: [
      "0.1",
      "0.2",
      "0.3",
      "0.5",
    ],
    correct: "0.5",
  },

  {
    id: "2",
    question: "What is the value of pi?",
    options: [
      "3.15",
      "4.15",
      "8.10",
      "3.14",
    ],
    correct: "3.14",
  },

  {
    id: "3",
    question: "Find the value of x: x + 2 = 7",
    options: [
      "5",
      "4",
      "3",
      "2",
    ],
    correct: "5",
  },

  {
    id: "4",
    question: "Which of the following numbers are prime numbers?",
    options: [
      "10",
      "20",
      "7",
      "100",
    ],
    correct: "7",
  },

  {
    id: "5",
    question: "Which of the following numbers are composite numbers?",
    options: [
      "100",
      "1",
      "3",
      "5",
    ],
    correct: "100",
  },

  {
    id: "6",
    question: "How many sides does the Hexagon have?",
    options: [
      "4",
      "5",
      "6",
      "7",
    ],
    correct: "6",
  },

  {
    id: "7",
    question: "How many sides does the Hexagon have?",
    options: [
      "4",
      "5",
      "6",
      "7",
    ],
    correct: "6",
  },

  {
    id: "8",
    question: "What are the three measures of central tendency in statistics?",
    options: [
      "Mean, Median, Mode",
      "Main, Middle, Made",
      "Max, Min, Ceiling",
      "Floor, Ceiling, Round",
    ],
    correct: "Mean, Median, Mode",
  },

  {
    id: "9",
    question: "The Cartesian plane, also known as the Cartesian coordinate system, was developed by _______",
    options: [
      "Archimedes",
      "Euclid",
      "Pythagoras",
      "Rene Descartes",
    ],
    correct: "Rene Descartes",
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
  initial();
});

window.onload = () => {
  StartScreen.classList.remove("hide");
  DisplayContainer.classList.add("hide");
};

