const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language"
    ],
    answer: 0
  },

  {
    question: "Which language is used to style web pages?",
    options: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python"
    ],
    answer: 1
  },

  {
    question: "Which language is used to make web pages interactive?",
    options: [
      "CSS",
      "HTML",
      "JavaScript",
      "SQL"
    ],
    answer: 2
  },

  {
    question: "Which HTML tag creates a hyperlink?",
    options: [
      "<link>",
      "<a>",
      "<href>",
      "<url>"
    ],
    answer: 1
  },

  {
    question: "Which symbol is used for an ID selector in CSS?",
    options: [
      ".",
      "#",
      "*",
      "@"
    ],
    answer: 1
  }
];


let currentQuestion = 0;
let score = 0;


const questionElement =
  document.getElementById("question");

const optionsElement =
  document.getElementById("options");

const questionNumber =
  document.getElementById("question-number");

const progress =
  document.getElementById("progress");

const nextButton =
  document.getElementById("next-btn");

const quiz =
  document.getElementById("quiz");

const result =
  document.getElementById("result");

const scoreElement =
  document.getElementById("score");

const messageElement =
  document.getElementById("message");

const restartButton =
  document.getElementById("restart-btn");


function loadQuestion() {

  const current = questions[currentQuestion];

  questionNumber.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  questionElement.textContent =
    current.question;

  progress.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  optionsElement.innerHTML = "";

  nextButton.style.display = "none";


  current.options.forEach((option, index) => {

    const button =
      document.createElement("button");

    button.classList.add("option");

    button.textContent = option;

    button.addEventListener(
      "click",
      () => selectAnswer(button, index)
    );

    optionsElement.appendChild(button);

  });
}


function selectAnswer(
  selectedButton,
  selectedIndex
) {

  const correctIndex =
    questions[currentQuestion].answer;

  const allOptions =
    document.querySelectorAll(".option");


  allOptions.forEach(button => {
    button.disabled = true;
  });


  if (selectedIndex === correctIndex) {

    selectedButton.classList.add("correct");

    score++;

  } else {

    selectedButton.classList.add("wrong");

    allOptions[correctIndex]
      .classList.add("correct");
  }


  nextButton.style.display = "block";
}


nextButton.addEventListener(
  "click",
  () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

      loadQuestion();

    } else {

      showResult();

    }

  }
);


function showResult() {

  quiz.style.display = "none";

  result.style.display = "block";

  scoreElement.textContent =
    `${score} / ${questions.length}`;


  const percentage =
    (score / questions.length) * 100;


  if (percentage === 100) {

    messageElement.textContent =
      "Perfect score! Excellent work!";

  } else if (percentage >= 60) {

    messageElement.textContent =
      "Great job! Keep practicing.";

  } else {

    messageElement.textContent =
      "Keep learning and try again!";
  }


  restartButton.style.display =
    "inline-block";
}


restartButton.addEventListener(
  "click",
  () => {

    currentQuestion = 0;

    score = 0;

    quiz.style.display = "block";

    result.style.display = "none";

    loadQuestion();

  }
);


loadQuestion();
