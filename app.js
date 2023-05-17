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
    question: "HTML stands for _______?",
    options: [
      "How to Make Lumpia",
      "HyperText and Links Markup Language",
      "HyperText Markup Language",
      "No idea",
    ],
    correct: "HyperText Markup Language",
  },

  {
    id: "1",
    question: "1 + 1 = _____",
    options: [
      "1",
      "2",
      "3",
      "4",
    ],
    correct: "2",
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
    question: "Which of the following is not a continent?",
    options: [
      "Asia",
      "South America",
      "Brazil",
      "Europe",
    ],
    correct: "Brazil",
  },

  {
    id: "4",
    question: "When did the D-Day operation in Normandy happened?",
    options: [
      "June 1, 1944",
      "June 2, 1944",
      "June 3, 1944",
      "June 6, 1944",
    ],
    correct: "June 6, 1944",
  },

  {
    id: "5",
    question: "In what year when World War 2 began and in what year when it ended?",
    options: [
      "1939-1942",
      "1939-1945",
      "1920-1933",
      "1940-1944",
    ],
    correct: "1939-1945",
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

