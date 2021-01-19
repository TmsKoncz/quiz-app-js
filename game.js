const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Kérdés',
        choice1: 'Válasz 1',
        choice2: 'Válasz 2',
        choice3: 'Válasz 3',
        choice4: 'Válasz 4',
        answer: 1,
    },
    {
        question: "Kérdés2",
        choice1: "Válasz 1",
        choice2: "Válasz 2",
        choice3: "Válasz 3",
        choice4: "Válasz 4",
        answer: 1,
    },
    {
        question: "Kérdés",
        choice1: "Válasz 1",
        choice2: "Válasz 2",
        choice3: "Válasz 3",
        choice4: "Válasz 4",
        answer: 1,
    },
    {
        question: "Kérdés",
        choice1: "Válasz 1",
        choice2: "Válasz 2",
        choice3: "Válasz 3",
        choice4: "Válasz 4",
        answer: 1,
    },
    {
        question: "Kérdés",
        choice1: "Válasz 1",
        choice2: "Válasz 2",
        choice3: "Válasz 3",
        choice4: "Válasz 4",
        answer: 1,
    }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}



getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('https://tmskoncz.github.io/virusok-kviz/end') //ha a countdown véget ér, ez legyen a végeredmény
    }

    questionCounter++
    progressText.innerText = `${questionCounter}/${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()


document.getElementById('timer').innerHTML =
    000 + ":" + 40; //perc és mpx0
startTimer();

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  //if(m<0){alert('timer completed')}
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;
  console.log(m)
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

function endTimer() {
    if(min < 0 && sec < 0) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('https://tmskoncz.github.io/virusok-kviz/end') //ha a countdown véget ér, dobjon a beadáshoz
    }
}
