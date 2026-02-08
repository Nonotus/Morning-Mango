
const questions = [
  {
    question: "This is a greeting used when you meet a person at night.",
    choices: ["Hello", "Good Morning", "Good Evening"],
    answer: 2,
    image: "image-removebg-preview (22).png"
  },
  {
    question: "This is a greeting used in the morning.",
    choices: ["Good Night", "Good Morning", "Good Evening"],
    answer: 1,
    image: "image-removebg-preview (23).png"
  },
  {
    question: "This is a casual greeting.",
    choices: ["Goodbye", "Hello", "Good Night"],
    answer: 1,
    image: "download (11).png"
  },
  {
    question: "This word is used when you or someone else is leaving.",
    choices: ["Hello", "Thank You", "Goodbye"],
    answer: 2,
    image: "image-removebg-preview (24).png"
  },
  {
    question: "This is used to ask politely.",
    choices: ["Please", "Sorry", "Thanks"],
    answer: 0,
    image: "image-removebg-preview (29).png"
  },
  {
    question: "This is a greeting used in the afternoon.",
    choices: ["Good Afternoon", "Good Night", "Good Morning"],
    answer: 0,
    image: "image-removebg-preview (25).png"
  },
  {
    question: "This word is used when someone helps you.",
    choices: ["Sorry", "Thank You", "Hello"],
    answer: 1,
    image: "image-removebg-preview (30).png"
  },
  {
    question: "This is said when someone arrives.",
    choices: ["Goodbye", "Welcome", "Sorry"],
    answer: 1,
    image: "image-removebg-preview (24).png"
  },
  {
    question: "This greeting is used before you sleep.",
    choices: ["Good Morning", "Good Night", "Hello"],
    answer: 1,
    image: "image-removebg-preview (26).png"
  },
  {
    question: "This word means you agree.",
    choices: ["No", "Yes", "Maybe"],
    answer: 1,
    image: "image-removebg-preview (27).png"
  },
  {
    question: "This word means you disagree.",
    choices: ["Yes", "Okay", "No"],
    answer: 2,
    image: "image-removebg-preview__27.5_-removebg-preview.png"
  },
  {
    question: "This word is used to get attention politely.",
    choices: ["Please", "Excuse me", "Thanks"],
    answer: 1,
    image: "image-removebg-preview (28).png"
  },
  {
    question: "This is said when you did something wrong.",
    choices: ["Welcome", "Sorry", "Hello"],
    answer: 1,
    image: "image-removebg-preview (31).png"
  },
  {
    question: "This word is used when you accept something.",
    choices: ["No", "Okay", "Goodbye"],
    answer: 1,
    image: "image-removebg-preview (27).png"
  },
  {
    question: "This is said after someone says 'Thank you'.",
    choices: ["Sorry", "You’re welcome", "Goodbye"],
    answer: 1,
    image: "image-removebg-preview (30).png"
  }
];

let currentUtterance = null;
let currentQuestion = 0;
let answered = false;
let isSpeaking = false;
let userActivatedSpeech = false;
let voicesReady = false;

// Load voices properly (Chrome needs this)
function loadVoices() {
  const voices = speechSynthesis.getVoices();
  if (voices.length > 0) {
    voicesReady = true;
  }
}

loadVoices();
speechSynthesis.onvoiceschanged = loadVoices;

const buttons = document.querySelectorAll(".choicebox");

function speak(text, delay = 0, force = false) {
  if (!text || !userActivatedSpeech || !voicesReady) return;

  // 🚫 Block hover spam unless forced
  if (isSpeaking && !force) return;

  // 🔥 Immediately stop previous speech
  speechSynthesis.cancel();
  isSpeaking = false;

  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtterance = utterance;

    const voices = speechSynthesis.getVoices();
    utterance.voice = voices.find(v => v.lang.startsWith("en")) || voices[0];

    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    isSpeaking = true;
    utterance.onend = () => {
      if (currentUtterance === utterance) {
        isSpeaking = false;
      }
    };

    speechSynthesis.speak(utterance);
  }, delay);
}

function loadQuestion() {
  const q = questions[currentQuestion];
  answered = false;

  document.getElementById("question-text").textContent =
    `${currentQuestion + 1}. ${q.question}`;

  document.getElementById("question-image").src = q.image;

  buttons.forEach((btn, index) => {
    btn.textContent = q.choices[index];
    btn.disabled = false;
    btn.classList.remove("correct", "wrong");
  });
}

function checkAnswer(index) {
  if (answered) return;
  answered = true;

  const correctIndex = questions[currentQuestion].answer;

  if (index === correctIndex) {
    buttons[index].classList.add("correct");
    speak("Good job!");

    buttons.forEach(btn => btn.disabled = true);
    setTimeout(nextQuestion, 1200);
  } else {
    buttons[index].classList.add("wrong");
    speak("Try again");

    setTimeout(() => {
      buttons[index].classList.remove("wrong");
      answered = false;
    }, 600);
  }
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("question-text").textContent =
      "🎉 You finished the quiz!";
    document.querySelector(".choices").innerHTML = "";
  }
}

// 🔘 Click handling
buttons.forEach((button, index) => {
  button.addEventListener("click", () => checkAnswer(index));

  // 🔊 Hover pronunciation (no stacking)
  button.addEventListener("mouseenter", () => {
    if (isSpeaking) return;
    speak(button.textContent.replace(/^.\.\s*/, ""));
  });
});

// 🚀 START GAME
loadQuestion();

const speakBtn = document.getElementById("speakQuestionBtn");

speakBtn.addEventListener("click", () => {
  userActivatedSpeech = true;
  speak(questions[currentQuestion].question, 0, true); // force
});