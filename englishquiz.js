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
    question: "Which of the following is a pronoun?",
    options: [
      "We",
      "Under",
      "Beautiful",
      "Apple",
    ],
    correct: "We",
  },

  {
    id: "1",
    question: "Who wrote the book Romeo and Juliet?",
    options: [
      "Mark Twain",
      "Edgar Allan Poe",
      "William Shakespeare",
      "J.K. Rowling",
    ],
    correct: "William Shakespeare",
  },

  {
    id: "2",
    question: "What's the past participle of Write?",
    options: [
      "Wrote",
      "Writed",
      "Wroted",
      "Written",
    ],
    correct: "Written",
  },

  {
    id: "3",
    question: "Which of the following is an example of a compound word?",
    options: [
      "Dog",
      "House",
      "Playground",
      "Jump",
    ],
    correct: "Playground",
  },

  {
    id: "4",
    question: 'What is the past tense of the verb "go"?',
    options: [
      "Went",
      "Gone",
      "Goes",
      "Going",
    ],
    correct: "Gone",
  },

  {
    id: "5",
    question: 'What is the correct spelling of the word meaning "having a fear of spiders"?',
    options: [
      "Arachnaphobia",
      "Aracnophobia",
      "Arachnophobia",
      "Aracnaphobia",
    ],
    correct: "Arachnophobia",
  },

  {
    id: "6",
    question: 'What is the correct plural form of the word "child"?',
    options: [
      "Childs",
      "Childrens",
      "Childes",
      "Children",
    ],
    correct: "Children",
  },

  {
    id: "7",
    question: 'Who is the author of the novel "Pride and Prejudice"?',
    options: [
      "Jane Austen",
      "Jack Krauser",
      "Jean Valjean",
      "Victor Hugo",
    ],
    correct: "Jane Austen",
  },

  {
    id: "8",
    question: "In J.R.R. Tolkien's 'The Lord of the Rings,' what is the name of the powerful ring?",
    options: [
      "The One Ring",
      "The Precious Ring",
      "The Ring of Power",
      "The Eternal Ring",
    ],
    correct: "The One Ring",
  },

  {
    id: "9",
    question: '"Shall I compare thee to a summer' + "'s " + 'day?" is the opening line of which Shakespearean sonnet?',
    options: [
      "Sonnet 18",
      "Sonnet 29",
      "Sonnet 116",
      "Sonnet 130",
    ],
    correct: "Sonnet 18",
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
      UserScore.innerHTML = "<span style='color: white'> Your score is " + ScoreCount + " out of " + QuestionCount + ".</span>";

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

