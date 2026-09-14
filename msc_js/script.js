const jsMCQ = [
  {
    question: "JavaScript kis type ki language hai?",
    options: ["Programming Language", "Markup Language", "Database", "Operating System"],
    answer: "Programming Language"
  },
  {
    question: "JavaScript file ka extension kya hota hai?",
    options: [".java", ".js", ".py", ".html"],
    answer: ".js"
  },
  {
    question: "JavaScript mein variable declare karne ke liye kaunsa keyword use hota hai?",
    options: ["var", "let", "const", "All of these"],
    answer: "All of these"
  },
  {
    question: "JavaScript ko browser mein kaun execute karta hai?",
    options: ["Compiler", "JavaScript Engine", "Database", "Server"],
    answer: "JavaScript Engine"
  },
  {
    question: "JavaScript mein string ko kis quotes mein likh sakte hain?",
    options: ["''", "\"\"", "``", "All of these"],
    answer: "All of these"
  },
  {
    question: "JavaScript mein strict equality operator kaunsa hai?",
    options: ["==", "===", "=", "!="],
    answer: "==="
  },
  {
    question: "console.log() ka use kya hai?",
    options: ["Data Print Karna", "Data Delete Karna", "Variable Banana", "Loop Chalana"],
    answer: "Data Print Karna"
  },
  {
    question: "JavaScript mein array ka index kis number se start hota hai?",
    options: ["1", "0", "-1", "10"],
    answer: "0"
  },
  {
    question: "Array ki length nikalne ke liye kya use karte hain?",
    options: ["size()", "count()", "length", "len()"],
    answer: "length"
  },
  {
    question: "JavaScript mein function define karne ke liye kaunsa keyword use hota hai?",
    options: ["func", "function", "define", "method"],
    answer: "function"
  },
  {
    question: "DOM ka full form kya hai?",
    options: ["Document Object Model", "Data Object Method", "Document Oriented Model", "Digital Object Model"],
    answer: "Document Object Model"
  },
  {
    question: "JavaScript mein popup message dikhane ke liye kya use hota hai?",
    options: ["alert()", "print()", "prompt()", "console.log()"],
    answer: "alert()"
  },
  {
    question: "let aur const kis ES version mein aaye the?",
    options: ["ES3", "ES5", "ES6", "ES7"],
    answer: "ES6"
  },
  {
    question: "JavaScript mein NaN ka matlab kya hai?",
    options: ["Not a Number", "New Number", "Null and Number", "No Assigned Number"],
    answer: "Not a Number"
  },
  {
    question: "JavaScript mein object create karne ke liye kis bracket ka use hota hai?",
    options: ["()", "[]", "{}", "<>"],
    answer: "{}"
  },
  {
    question: "Array mein naya element add karne ke liye kaunsa method use hota hai?",
    options: ["push()", "pop()", "shift()", "slice()"],
    answer: "push()"
  },
  {
    question: "Array se last element remove karne ke liye kya use hota hai?",
    options: ["push()", "shift()", "pop()", "splice()"],
    answer: "pop()"
  },
  {
    question: "JavaScript asynchronous programming ke liye kya use karta hai?",
    options: ["Promise", "Callback", "Async/Await", "All of these"],
    answer: "All of these"
  },
  {
    question: "JavaScript mein null ka matlab kya hai?",
    options: ["Empty Value", "Undefined Variable", "Boolean", "Number"],
    answer: "Empty Value"
  },
  {
    question: "JavaScript ka latest standard kis naam se jaana jaata hai?",
    options: ["ECMAScript", "JavaScript Pro", "JS Standard", "NodeScript"],
    answer: "ECMAScript"
  }
];


let qsnum = 0;
let result = 0;
let flqst = 0;
let qst = 1;

// ========================================
// USER ANSWERS STORE KARNE KE LIYE ARRAY
// ========================================

let userAnswers = [];


// ========================================
// ELEMENTS
// ========================================

let btn = document.querySelector(".btn");
let updata = document.querySelector("#updateddata");
const userdata = document.querySelector("#userresult");


// ========================================
// QUESTION NUMBER
// ========================================

document.querySelector("#qstn").innerText = `Q-No is:-${qst}`;
document.querySelector("#count").innerText = `${qst}`;


// ========================================
// SHOW QUESTION
// ========================================

function questionn() {

    document.querySelector(".question").innerText =
        jsMCQ[qsnum].question;
}


// ========================================
// SHOW OPTIONS
// ========================================

function option() {

    let opn = jsMCQ[qsnum].options;

    document.querySelector("#op1").innerText = opn[0];
    document.querySelector("#op2").innerText = opn[1];
    document.querySelector("#op3").innerText = opn[2];
    document.querySelector("#op4").innerText = opn[3];
}


// ========================================
// SAVE USER ANSWER
// ========================================

function answer() {

    let correctAnswer = jsMCQ[qsnum].answer;

    let userOptions = document.querySelectorAll(".answer");

    let selectedAnswer = null;

    // Selected option find karo
    for (let option of userOptions) {

        if (option.checked) {

            selectedAnswer =
                option.nextElementSibling.innerText;

            break;
        }
    }


    // Agar user ne answer select nahi kiya
    if (selectedAnswer === null) {

        alert("Please select an answer!");

        return false;
    }


    // Attempted question count
    flqst++;


    // Check correct answer
    let isCorrect = selectedAnswer === correctAnswer;


    if (isCorrect) {
        result++;
    }


    // ========================================
    // ANSWER ARRAY ME STORE KARO
    // ========================================

    userAnswers.push({

        question: jsMCQ[qsnum].question,

        userAnswer: selectedAnswer,

        correctAnswer: correctAnswer,

        isCorrect: isCorrect

    });


    // Radio button uncheck
    for (let option of userOptions) {
        option.checked = false;
    }


    return true;
}


// ========================================
// FINAL RESULT
// ========================================

function finalresult() {

    document.querySelector(".flresult").style.display = "none";
    document.querySelector(".card-footer").style.display = "none";

    let totalQuestions = jsMCQ.length;
    let percentage = Math.round((result / totalQuestions) * 100);
    let wrong = flqst - result;
    let unattempted = totalQuestions - flqst;


    // ========================================
    // FINAL RESULT
    // ========================================

    document.querySelector("#user_result").innerHTML = `

        <div class="container py-4">

            <div class="card border-0 shadow-sm rounded-3">

                <div class="card-body p-4 text-center">

                    <h1 class="text-success fw-bold mb-2">
                        Test Completed!
                    </h1>

                    <p class="text-muted mb-4">
                        Great job! Your test has been completed.
                    </p>


                    <!-- SCORE -->

                    <div class="bg-success text-white rounded-3 p-4 mb-4">

                        <div class="small text-uppercase mb-1">
                            Your Score
                        </div>

                        <div class="display-4 fw-bold">
                            ${result}

                            <span class="fs-4 fw-normal">
                                / ${totalQuestions}
                            </span>
                        </div>

                        <span class="badge bg-light text-success mt-2">
                            ${percentage}% Score
                        </span>

                    </div>


                    <!-- DETAILS -->

                    <div class="row g-3">

                        <div class="col-6 col-md-3">
                            <div class="border rounded-3 p-3">
                                <h4 class="text-primary fw-bold mb-1">
                                    ${totalQuestions}
                                </h4>

                                <small class="text-muted">
                                    Total
                                </small>
                            </div>
                        </div>


                        <div class="col-6 col-md-3">
                            <div class="border rounded-3 p-3">
                                <h4 class="text-success fw-bold mb-1">
                                    ${result}
                                </h4>

                                <small class="text-muted">
                                    Correct
                                </small>
                            </div>
                        </div>


                        <div class="col-6 col-md-3">
                            <div class="border rounded-3 p-3">
                                <h4 class="text-danger fw-bold mb-1">
                                    ${wrong}
                                </h4>

                                <small class="text-muted">
                                    Wrong
                                </small>
                            </div>
                        </div>


                        <div class="col-6 col-md-3">
                            <div class="border rounded-3 p-3">
                                <h4 class="text-warning fw-bold mb-1">
                                    ${unattempted}
                                </h4>

                                <small class="text-muted">
                                    Unattempted
                                </small>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    `;


    // ========================================
    // ANSWER REVIEW
    // ========================================

    userdata.innerHTML = `

        <div class="container pb-5">

            <div class="card border-0 shadow-sm rounded-3">

                <div class="card-body p-4">

                    <h2 class="text-center fw-bold mb-4">
                        Answer Review
                    </h2>


                    ${userAnswers.map((item, index) => {

                        return `

                            <div class="card mb-3 shadow-sm border">

                                <div class="card-body p-3">

                                    <h5 class="fw-bold mb-3">
                                        Q${index + 1}. ${item.question}
                                    </h5>


                                    <p class="mb-2">
                                        <strong>
                                            Your Answer:
                                        </strong>

                                        <span class="${
                                            item.isCorrect
                                            ? 'text-success'
                                            : 'text-danger'
                                        }">

                                            ${item.userAnswer}

                                        </span>
                                    </p>


                                    <p class="mb-2 text-success">

                                        <strong>
                                            Correct Answer:
                                        </strong>

                                        ${item.correctAnswer}

                                    </p>


                                    <p class="mb-0">

                                        <strong>
                                            Result:
                                        </strong>

                                        ${
                                            item.isCorrect

                                            ? `<span class="text-success">
                                                Correct ✓
                                               </span>`

                                            : `<span class="text-danger">
                                                Wrong ✗
                                               </span>`
                                        }

                                    </p>

                                </div>

                            </div>

                        `;

                    }).join("")}

                </div>

            </div>

        </div>

    `;


    document.querySelector(".qs").innerText =
        `All Attempted Questions: ${flqst}`;
}


// ========================================
// TIMER
// ========================================

let timer = document.querySelector("#timer");

let timeLeft = 1 * 60;

let intervel = setInterval(() => {

    let minutes = Math.floor(timeLeft / 60);

    let seconds = timeLeft % 60;


    timer.innerText =
        `${minutes}:${seconds.toString().padStart(2, "0")}`;


    timeLeft--;


    if (timeLeft < 0) {

        clearInterval(intervel);

        timer.innerText = "";

        alert("Time's Out!");

        finalresult();
    }

}, 1000);


// ========================================
// NEXT BUTTON
// ========================================

btn.addEventListener("click", () => {


    // Answer save karo
    let saved = answer();


    // Agar answer select nahi kiya
    if (!saved) {
        return;
    }


    // Next question
    qsnum++;

    qst++;


    // ========================================
    // CHECK QUESTIONS COMPLETE
    // ========================================

    if (qsnum < jsMCQ.length) {

        document.querySelector("#count").innerText = `${qst}`;

        document.querySelector("#qstn").innerText =
            `Q-No is:-${qst}`;


        questionn();

        option();

        progressbar();

    }

    else {

        clearInterval(intervel);

        alert("All Questions Completed!");

        finalresult();

    }

});


// ========================================
// PROGRESS BAR
// ========================================

function progressbar() {

    let progres =
        (qst / jsMCQ.length) * 100;


    document.querySelector(".progress-persent").innerText =
        `${progres}% Completed`;


    document.querySelector(".progress-bar").style.width =
        `${progres}%`;
}


// ========================================
// INITIAL LOAD
// ========================================

questionn();

option();

progressbar();