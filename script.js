const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar"); 

const quizQuestions = [
    {
        question: "Do you Love me?" ,
        answers : [
            {text:"Yes , I do ."  ,correct : true} ,
            {text: "Ye kiunn puch rahe ho?" , correct : false},
            {text : "Mujhe nahin pata" , correct : false} ,
            {text : "Kiunn bataaunn?" , correct :false},
        ],
    },
    {
        question: "What is the favorite thing to eat for Muhammad?" , 
        answers : [
            {text : "Chicken Karahi" , correct : false},
            {text : "Anything related to chicken" , correct : false}, 
            {text : "Zara" , correct : true},
            {text : "Haleem" , correct : false},
        ],
    },
    {
        question : "What way of burning calories Muhammad will prefer after getting married to You? ",
        answers : [
            {text: " By Going to Gym" ,correct : false} ,
            {text : "By going on a long session of running" , correct : false},
            {text : "By having Sard Hex with you" , correct : true },
            {text : "Due to long fasting" , correct : false},
        ],
    }, 
    {
        question : "What's the best thing about you Muhammad is in true love?" , 
        answers : [
            {text : "Your Voice" , correct : false} ,
            {text : "Your Boobies" , correct : false} , 
            {text : "Your Smile" , correct : false} , 
            {text : "Every Single thing about You" , correct : true } , 
         ],
    },
    {
        question : "Do You think Muhammad can leave you?" , 
        answers : [
            {text: "Yes" , correct : false} ,
            {text : "No" , correct : false} , 
             {text : "Nahin wo to marjaega mere bagheir" , correct : true},
            {text : "Hoskta he" , correct : false}, 
           
        ],   
    },
   {
    question : "What are you to Muhammad?" , 
    answers : [
        {text:"Uski biwi", correct : false},
        {text : "Uski guuggguu si jaaanu" , correct : false}, 
        {text : "Uski munnii si baby " , correct : false}, 
        {text : "All of them" , correct : true},
    ],
   },
   {
    question : "Where & when do you think He will crave for Sard Hex after marriage?",
    answers : [
        {text : "At night , on bed" , correct : false} , 
        {text : "In kitchen while preparing for Dinner" , correct : false},
         {text : "On the Table if bed is Broken " , correct : false}, 
         {text : "Kahin bhi Kabhi bhi" , correct : true} , 
    ],
   }, 
   
] ; 


let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;
  if (percentage === 100) {
    resultMessage.textContent = "Meri guggguu ! YAAYAY I LOVEE YOUU BABYY";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! YAAYAY I LOVEE YOUU BABYY ";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Sharam karlo bachounn walay sawal thy yaar!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Ni matlab sharam ati hai?";
  } else {
    resultMessage.textContent = "Allah hu AKBARR?!?!?!??!?!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}