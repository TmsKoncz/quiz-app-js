const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem("highScores")) || [] //ITT KELL VALAMIT ÁLLÍTANI localstorage az eredeti

highScoresList.innerHTML =
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score} pont</li>`
}).join("")