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

        return window.location.assign('https://tmskoncz.github.io/virusok-kviz/end')
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

//Visszaszámláló és pittyegés START//
var countdown;
var countdown_number;
var mySoundObject;

function countdown_trigger() {
    if (countdown_number > 0) {
        countdown_number--;
        document.getElementById('countdown_text').innerHTML = countdown_number;
        if (countdown_number > 0) {
            countdown = setTimeout(countdown_trigger, 1000);
        }

        if (countdown_number === 0) {
            mySoundObject.play();
        }
    }
}

function countdown_clear() {
    clearTimeout(countdown);
}

function countdown_init() {
    countdown_number = 11;
    countdown_trigger();
}

document.getElementById('start').onclick = countdown_init;
document.getElementById('stop').onclick = countdown_clear;

soundManager.setup({
    url: 'http://ivdemo.chaseits.co.uk/SoundManager2-2.97a.20131201/swf/soundmanager2_flash_xdomain/soundmanager2_flash9_debug.swf',
    flashVersion: 9,
    useHTML5Audio: true,
    html5Test: 'maybe',
    preferFlash: false,
    onready: function () {
        mySoundObject = soundManager.createSound({
            id: 'mySound',
            url: 'https://proxy.notificationsounds.com/message-tones/pristine-609/download/file-sounds-1150-pristine.mp3'
        });
    }
});
