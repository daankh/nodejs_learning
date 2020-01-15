function gameRoutes(app) {
  let goodAnswers = 0;
  let isGameOver = false;
  let callToAFriendUsed = false;
  let questionToTheCrowdUsed = false;
  let halfOnHalfUsed = false;

  const questions = [
    {
      question: "Jaki jest najlepszy język programowania na świecie wg mnie?",
      answers: ["C++", "Fortran", "JavaScript", "Java"],
      corectAnswer: 2
    },
    {
      question: "Czy ten kurs jest fajny?",
      answers: ["Nie wiem", "Oczywiście, że tak", "Nie", "Jest najlepszy"],
      corectAnswer: 3
    },
    {
      question: "Czy chcesz zjeść pizzę?",
      answers: [
        "Nawet dwie!",
        "Jestem na diecie",
        "Nie, dziękuję.",
        "Wolę brokuły"
      ],
      corectAnswer: 0
    }
  ];

  app.get("/question", (req, res) => {
    if (goodAnswers === questions.length) {
      res.json({
        winner: true
      });
    } else if (isGameOver) {
      res.json({
        loser: true
      });
    } else {
      const nextQuestion = questions[goodAnswers];
      const { question, answers } = nextQuestion;

      res.json({
        question,
        answers
      });
    }
  });

  app.post("/answer/:index", (req, res) => {
    if (isGameOver)
      res.json({
        loser: true
      });

    const { index } = req.params;

    const question = questions[goodAnswers];
    const isGoodAnswer = question.corectAnswer === Number(index);

    if (isGoodAnswer) {
      goodAnswers++;
    } else {
      isGameOver = true;
    }

    res.json({
      correct: isGoodAnswer,
      goodAnswers
    });
  });

  app.get("/help/friend", (req, res) => {
    if (callToAFriendUsed) {
      return res.json({
        text: "To koło ratunkowe było już wykorzystane"
      });
    }

    callToAFriendUsed = true;
    const doesFriendKnowAnswer = Math.random() < 0.5;
    const question = questions[goodAnswers];

    res.json({
      text: doesFriendKnowAnswer
        ? `Hmm, wydaje mi się, że odpowiedź to ${
            question.answers[question.corectAnswer]
          }`
        : "Mhh, no nie wiem..."
    });
  });

  app.get("/help/half", (req, res) => {
    if (halfOnHalfUsed) {
      return res.json({
        text: "To koło ratunkowe było już wykorzystane"
      });
    }

    halfOnHalfUsed = true;
    const question = questions[goodAnswers];
    const answersCopy = question.answers.filter(
      (s, index) => index !== question.corectAnswer
    );
    answersCopy.splice(~~(Math.random() * answersCopy.length), 1);

    res.json({
      answersToRemove: answersCopy
    });
  });
}

module.exports = gameRoutes;
