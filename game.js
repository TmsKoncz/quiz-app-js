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
        choice5: 'Válasz 5',
        answer: 1,
    },
    {
        question: "Kérdés2",
        choice1: "Válasz 1",
        choice2: "Válasz 2",
        choice3: "Válasz 3",
        choice4: "Válasz 4",
        choice5: 'Válasz 5',
        answer: 1,
    },
    {
        question: "Kérdés3",
        choice1: "Válasz 1",
        choice2: "Válasz 2",
        choice3: "Válasz 3",
        choice4: "Válasz 4",
        choice5: 'Válasz 5',
        answer: 1,
    },
    {
        question: "Kérdés4",
        choice1: "Válasz 1",
        choice2: "Válasz 2",
        choice3: "Válasz 3",
        choice4: "Válasz 4",
        choice5: 'Válasz 5',
        answer: 1,
    },
    {
        question: "Kérdés5",
        choice1: "Válasz 1",
        choice2: "Válasz 2",
        choice3: "Válasz 3",
        choice4: "Válasz 4",
        choice5: 'Válasz 5',
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







function countdown(minutes) {
    var seconds = 60;
    var mins = minutes
    function tick() {
        //This script expects an element with an ID = "counter". You can change that to what ever you want. 
        var counter = document.getElementById("counter");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            if(mins > 1){
                countdown(mins-1);           
            }

        if( mins == 2 ) {
            localStorage.setItem('mostRecentScore', score); 
        } else {
            window.location.href = "https://tmskoncz.github.io/virusok-kviz/end";
            e.preventDefault();
            highScores.push(score) }
        }

        if ( mins == 1 ) {
            audio.play();
        }
    }
    tick();
}
//You can use this script with a call to onclick, onblur or any other attribute you would like to use. 
countdown(6);//where n is the number of minutes required. 

var audio = new Audio('beep.mp3');