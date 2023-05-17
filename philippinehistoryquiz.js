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
    question: "Which axis country conquered the Philippines during World War II?",
    options: [
      "Germany",
      "Italy",
      "Japan",
      "No idea",
    ],
    correct: "Japan",
  },

  {
    id: "1",
    question: "Who was the first president of the Philippines?",
    options: [
      "Emilio Aguinaldo",
      "Andres Bonifacio",
      "Manuel L. Quezon",
      "Carlos P. Garcia",
    ],
    correct: "Emilio Aguinaldo",
  },

  {
    id: "2",
    question: "What is the oldest university in the Philippines and in Asia?",
    options: [
      "Saint Louis University",
      "University of Pangasinan",
      "University of Santo Thomas",
      "University of the Philippines",
    ],
    correct: "University of Santo Thomas",
  },

  {
    id: "3",
    question: "Where was the first mass in the Philippines celebrated?",
    options: [
      "Cavite",
      "Manila",
      "Pangasinan",
      "Limasawa",
    ],
    correct: "Limasawa",
  },

  {
    id: "4",
    question: 'Who is known as the "Father of the Philippine Revolution"?',
    options: [
      "Jose Rizal",
      "Andres Bonifacio",
      "Emilio Aguinaldo",
      "Apolinario Mabini",
    ],
    correct: "Andres Bonifacio",
  },

  {
    id: "5",
    question: 'Who was the Philippine President who underwent impeachment proceedings and was ousted from power in 2001?',
    options: [
      "Gloria Macapagal Arroyo",
      "Fidel Ramos",
      "Joseph Estrada",
      "Ramon Magsaysay",
    ],
    correct: "Joseph Estrada",
  },

  {
    id: "6",
    question: 'Who composed the National Anthem of the Philippines?',
    options: [
      "Julian Felipe",
      "Jose Rizal",
      "Juan Luna",
      "Antonio Luna",
    ],
    correct: "Julian Felipe",
  },

  {
    id: "7",
    question: 'Who led the longest revolt in the Philippines during the Spanish times?',
    options: [
      "Diego Silang",
      "Francisco Balagtas",
      "Francisco Dagohoy",
      "Jose Rizal",
    ],
    correct: "Francisco Dagohoy",
  },

  {
    id: "8",
    question: "For how many years did Spanish rule last in the Philippines?",
    options: [
      "333 years",
      "444 years",
      "555 years",
      "777 years",
    ],
    correct: "333 years",
  },

  {
    id: "9",
    question: "In what year did the Philippines gain independence from the United States?",
    options: [
      "1945",
      "1942",
      "1943",
      "1946",
    ],
    correct: "1946",
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

