const questions = [
{
q:"JavaScript is a ________ language.",
options:["Styling","Markup","Programming","Database"],
answer:2
},
{
q:"What does HTML stand for?",
options:["Hyper Text Markup Language","High Text Machine Language","Hyper Tool Multi Language","None of These"],
answer:0
},
{
q:"How many types of CSS Selectors are there?",
options:["2","1","4","3"],
answer:2
},
{
q:"Choose the correct HTML element for the largest heading.",
options:["head","heading","h1","h4"],
answer:2
},
{
q:"What is the correct HTML element for inserting a line break?",
options:["ib","br","break","none of these"],
answer:1
},
{
q:"What is the correct HTML for adding a background color?",
options:[
"body style='background-color: yellow'",
"background yellow /background",
"body bg='yellow'",
"none of these"
],
answer:0
}
]

let index = 0
let correct = 0
let wrong = 0

const app = document.getElementById("app")
const startBtn = document.getElementById("startBtn")

startBtn.addEventListener("click",startQuiz)

function startQuiz(){
    index = 0
    correct = 0
    wrong = 0
    renderQuestion()
}

function renderQuestion(){
    const q = questions[index]
    app.innerHTML = `
        <h1>JavaScript Quiz</h1>
        <div class="status">Wrong Answers: ${wrong}</div>
        <div class="question">${q.q}</div>
        <div class="options">
            ${q.options.map((opt,i)=>`<button class="option" data-i="${i}">${opt}</button>`).join("")}
        </div>
        <div class="controls">
            <button class="btn secondary" id="quitBtn">Quit</button>
            <button class="btn primary" id="nextBtn">Next</button>
        </div>
    `

    document.querySelectorAll(".option").forEach(btn=>{
        btn.addEventListener("click",()=>selectAnswer(btn))
    })

    document.getElementById("nextBtn").addEventListener("click",nextQuestion)
    document.getElementById("quitBtn").addEventListener("click",resetQuiz)
}

function selectAnswer(btn){
    const selected = Number(btn.dataset.i)
    const correctIndex = questions[index].answer

    document.querySelectorAll(".option").forEach(b=>b.disabled=true)

    if(selected === correctIndex){
        btn.classList.add("correct")
        correct++
    }else{
        btn.classList.add("wrong")
        document.querySelectorAll(".option")[correctIndex].classList.add("correct")
        wrong++
    }
}

function nextQuestion(){
    index++
    if(index < questions.length){
        renderQuestion()
    }else{
        showResult()
    }
}

function showResult(){
    app.innerHTML = `
        <div class="result">
            <h2>Quiz Completed 🎉</h2>
            <p><b>Correct:</b> ${correct}</p>
            <p><b>Wrong:</b> ${wrong}</p>
            <button class="btn primary" id="restartBtn">Try Again</button>
        </div>
    `
    document.getElementById("restartBtn").addEventListener("click",startQuiz)
}

function resetQuiz(){
    app.innerHTML = `
        <h1>JavaScript Quiz</h1>
        <button class="btn primary" id="startBtn">Start Quiz</button>
    `
    document.getElementById("startBtn").addEventListener("click",startQuiz)
}
