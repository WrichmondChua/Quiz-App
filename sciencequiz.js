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
    question: "What are the three states of matter?",
    options: [
      "Solid, Liquid, and Gas",
      "Solid Snake, Liquid Snake, and Gas",
      "Metal, Gear, and Solid",
      "No idea",
    ],
    correct: "Solid, Liquid, and Gas",
  },

  {
    id: "1",
    question: "What was the name of the first man-made satellite launched by the Soviet Union in 1957?",
    options: [
      "Sputnik 1",
      "Hubble Space Telescope",
      "NASA",
      "Vodka",
    ],
    correct: "Sputnik 1",
  },

  {
    id: "2",
    question: "What does DNA stand for?",
    options: [
      "Deoxyribonucleic acetone",
      "Deoxyribonucleic acid",
      "Deoxyribonucleic airconditioner",
      "No idea",
    ],
    correct: "Deoxyribonucleic acetone",
  },

  {
    id: "3",
    question: "How many bones are in the human body?",
    options: [
      "200",
      "202",
      "204",
      "206",
    ],
    correct: "206",
  },

  {
    id: "4",
    question: "Which is the main gas that makes up the Earth's atmosphere?",
    options: [
      "Oxygen",
      "Nitrogen",
      "Tear gas",
      "Gasoline",
    ],
    correct: "Nitrogen",
  },

  {
    id: "5",
    question: "The concept of gravity was discovered by which famous physicist?",
    options: [
      "Isaac Newton",
      "Aristotle",
      "David Brewster",
      "Albert Einstein",
    ],
    correct: "Isaac Newton",
  },

  {
    id: "6",
    question: 'What do the letters in the word, "LASER" stand for?',
    options: [
      "Life Amplifier Such Ease Ready",
      "Look At Something Enthusiastic Radio",
      "Light Amplification by Stimulated Emission of Radiation",
      "It doesn't mean anything lol.",
    ],
    correct: "Light Amplification by Stimulated Emission of Radiation",
  },

  {
    id: "7",
    question: "What is the first law of motion by Isaac Newton?",
    options: [
      "Law of Inertia",
      "Law of Acceleration",
      "Law of Action-Reaction",
      "Law of Laws",
    ],
    correct: "Law of Inertia",
  },

  {
    id: "8",
    question: "Who invented the telephone?",
    options: [
      "Alexander the Great",
      "Albert Einstein",
      "Alexander Graham Bell",
      "Blaise Pascal",
    ],
    correct: "Alexander Graham Bell",
  },

  {
    id: "9",
    question: "What is the hardest natural substance on Earth?",
    options: [
      "Ruby",
      "Emerald",
      "Platinum",
      "Diamond",
    ],
    correct: "Diamond",
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
  initial();
});

window.onload = () => {
  StartScreen.classList.remove("hide");
  DisplayContainer.classList.add("hide");
};

