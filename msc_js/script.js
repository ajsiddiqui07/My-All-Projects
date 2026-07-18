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

let qsnum=0;
let ansnum = 0;
let opncounter=0;
let result = 0;

let qst = 1;
let flqst =0;
document.querySelector("#qstn").innerText=`Q-No is:-${qst} `
document.querySelector("#count").innerText=`${qst} `;


let btn = document.querySelector(".btn")


   
    


function questionn(){
    // let qsn = jsMCQ[qsnum].question
    // document.querySelector(".question").innerText=qsn;

    document.querySelector(".question").innerText=jsMCQ[qsnum].question;


}
let updata = document.querySelector("#updateddata")

     
function answer(){
    let ans = jsMCQ[qsnum].answer
    let userans = document.querySelectorAll(".answer")
    for(let option of userans){
      let opn = jsMCQ[qsnum].options
      if(option.checked){
          // console.log(option.nextElementSibling.innerText);
          // console.log(ans);
          flqst++;
          if(option.nextElementSibling.innerText == ans){
                        let div = document.createElement("div")
                        div.innerHTML=`<div><label style="height:100px;" class="list-group-item p-3">
                        <h4>${jsMCQ[qsnum].question}</h4>
                        <p style="color:green;"> Your Ans is True:- <b >${ans}</b></p>
                        </label></div>`
                        div.style.border="1px solid lightgray";
                        div.style.borderRadius="10px";
                        updata.appendChild(div)
            // console.log(option.nextElementSibling.innerText);
            result++;
          }else{
                        let div = document.createElement("div")
                        div.innerHTML=`<div><label style="height:150px;" class="list-group-item p-3">
                        <h4>${jsMCQ[qsnum].question}</h4>
                        <p style="color:red;"> Your Ans is false:- <b>${option.nextElementSibling.innerText}</b></p>
                        <p style="color:green;"> Correct Ans is :- <b >${ans}</b></p>
                        </label></div>`
                        div.style.border="1px solid lightgray";
                        div.style.borderRadius="10px";
                        updata.appendChild(div)
          }
          
              
      }
      if(option.checked){
          option.checked=false;
      }
    }
          
}







function option(){
    let opn = jsMCQ[qsnum].options
    document.querySelector("#op1").innerHTML=opn[0];
    document.querySelector("#op2").innerHTML=opn[1];
    document.querySelector("#op3").innerHTML=opn[2];
    document.querySelector("#op4").innerHTML=opn[3];
}



function finalresult(){
  let fl = document.querySelector(".flresult")
  fl.style.display="none";
  let user_result = document.querySelector("#user_result").innerHTML=`<h1>all correct answer is :${result}</h1>`;
  document.querySelector(".qs").innerText=`all attempt Question is:-${flqst} `
}

let timer = document.querySelector("#timer")

let timeLeft = 1 * 60; // 30 minutes in seconds

    let intervel = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

        timer.innerText =
        `${minutes}:${seconds.toString().padStart(2, "0")}`;

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(intervel);
        timer.innerText="";
       
        
        alert("Time's Out")
        finalresult()
    }
}, 1000);

btn.addEventListener("click",()=>{
        
        answer();

        qsnum++;
        qst++;
        document.querySelector("#count").innerText=`${qst} `;
        document.querySelector("#qstn").innerText=`Q-No is:-${qst} `;
        if(qsnum<=19){
          questionn();
          option();
          progressbar();
        }else{
          clearInterval(intervel);
          alert("all question complet")
          finalresult()
            
        }
        
        
    })

function progressbar(){

  let progres = (qst/jsMCQ.length)*100;
  // console.log(progres);
  document.querySelector(".progress-persent").innerText=`${progres}% Completed`
  document.querySelector(".progress-bar").style.width =`${progres}%`;

  
}
questionn();
option();
progressbar();

