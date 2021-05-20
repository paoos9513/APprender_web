const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Reintentar'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: '3x^2 -3x = x -1 es una ecuacion de: ',
    answers: [
      { text: 'Primer grado', correct: false },
      { text: 'Segundo grado', correct: true }
    ]
  },
  {
    question: 'La solucion de 5x + 2 = x + 10 es: ',
    answers: [
      { text: 'X=2', correct: true },
      { text: 'X=-2', correct: false },
      { text: 'X=1', correct: false },
      { text: 'X=5', correct: false }
    ]
  },
  {
    question: 'La forma correcta de respresenta una ecuaciones de primer grado es: ',
    answers: [
      { text: 'a + bx = 0', correct: false },
      { text: 'ax + b = 0', correct: true },
      { text: 'ax + bx = 0', correct: false },
      { text: 'Ninguna de las anteriores', correct: false }
    ]
  },
  {
    question: 'La solucion de 8x = -2 es: ',
    answers: [
      { text: 'X = 1/4', correct: false },
      { text: 'X = -1/2', correct: true }
    ]
  }
]