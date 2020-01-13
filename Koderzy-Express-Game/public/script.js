const question = document.querySelector("#question");
const gameBoard = document.querySelector("#game-board");
const h2 = document.querySelector("h2");

function fillQuestionElements(data) {
  if (data.winner === true) {
    gameBoard.getElementsByClassName.display = "none";
    h2.innerText = "WYGRAŁEŚ!!!";
    return;
  }
  question.innerText = data.question;
  for (const i in data.answers) {
    const answerEl = document.querySelector(`#answer${Number(i) + 1}`);
    answerEl.innerText = data.answers[i];
  }
}

function showNextQuestion() {
  fetch("/question", {
    method: "GET"
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Cannot fetch data");
      }
    })
    .then(data => {
      fillQuestionElements(data);
    });
}

showNextQuestion();

const goodAnswersSpan = document.querySelector("#good-answers");

function handleANswerFeedback(data) {
  goodAnswersSpan.textContent = data.goodAnswers;
  showNextQuestion();
}

function sendAnswer(answerIndex) {
  fetch(`/answer/${answerIndex}`, {
    method: "POST"
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Cannot fetch data");
      }
    })
    .then(data => {
      handleANswerFeedback(data);
    });
}

const buttons = document.querySelectorAll("button");
for (const button of buttons) {
  button.addEventListener("click", e => {
    const answerIndex = e.target.dataset.answer;
    sendAnswer(answerIndex);
  });
}
