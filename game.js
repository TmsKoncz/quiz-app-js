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
        question: "Kérdés3",
        choice1: "Válasz 1",
        choice2: "Válasz 2",
        choice3: "Válasz 3",
        choice4: "Válasz 4",
        answer: 1,
    },
    {
        question: "Kérdés4",
        choice1: "Válasz 1",
        choice2: "Válasz 2",
        choice3: "Válasz 3",
        choice4: "Válasz 4",
        answer: 1,
    },
    {
        question: "Kérdés5",
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

//Ha kész a countdown, korrigálni kell az if-et és akkor elvileg működnie kell!
answersave = () => {
    e.preventDefault();
    function countdown() {
    if(seconds < 0){
    localStorage.setItem('mostRecentScore', score); 
    window.location.href = "https://tmskoncz.github.io/virusok-kviz/end" }
    }
}

// COUNTDOWN
function countdown( countdown, minutes, seconds ) //elementname van eredetile a cd. helyett
{
    var element, endTime, hours, mins, msLeft, time;

    function twoDigits( n )
    {
        return (n <= 9 ? "0" + n : n);
    }

    function updateTimer()
    {
        msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
            element.innerHTML = "Az idő lejárt!";
        } else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
            setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }

    element = document.getElementById( countdown );
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    updateTimer();
}

countdown( "countdown", 0, 30 );
