const question = document.querySelector("#question");
const gameBoard = document.querySelector("#game-board");
const h2 = document.querySelector("h2");

function fillQuestionElements(data) {
  if (data.winner === true) {
    gameBoard.style.display = "none";
    h2.innerText = "WYGRAŁEŚ!!!";
    return;
  }

  if (data.loser === true) {
    gameBoard.style.display = "none";
    h2.innerText = "Nie poszło tym razem, spróbuj ponownie!!!";
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

function handleAnswerFeedback(data) {
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
      handleAnswerFeedback(data);
    });
}

const buttons = document.querySelectorAll(".answer-button");
for (const button of buttons) {
  button.addEventListener("click", e => {
    const answerIndex = e.target.dataset.answer;
    sendAnswer(answerIndex);
  });
}

const tipDiv = document.querySelector("#tip");

const handleFriendsAnswer = data => {
  tipDiv.innerText = data.text;
};

function callToAFirend() {
  fetch(`/help/friend`, {
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
      handleFriendsAnswer(data);
    });
}

document
  .querySelector("#callToAFriend")
  .addEventListener("click", callToAFirend);

const handleHalfOnHalfAnswer = data => {
  if (typeof data.text === "string") {
    tipDiv.innerText = data.text;
  } else {
    for (const button of buttons) {
      if (data.answersToRemove.indexOf(button.innerText) > -1) {
        button.innerText = "";
      }
    }
  }
};

function halfOnHalf() {
  fetch(`/help/half`, {
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
      handleHalfOnHalfAnswer(data);
    });
}

document.querySelector("#halfOnHalf").addEventListener("click", halfOnHalf);

const handleCrowdAnswer = data => {
  if (typeof data.text === "string") {
    tipDiv.innerText = data.text;
  } else {
    data.chart.forEach((percent, index) => {
      buttons[index].innerText =
        buttons[index].innerText + ": " + percent + "%";
    });
  }
};

function questionToTheCrowd() {
  fetch(`/help/crowd`, {
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
      handleCrowdAnswer(data);
    });
}

document
  .querySelector("#questionToTheCrowd")
  .addEventListener("click", questionToTheCrowd);
