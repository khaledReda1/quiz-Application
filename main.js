
// Select Elments  

let countspan = document.querySelector(" .count span");

let elemntBullets = document.querySelector(".bullets");
let bulltesSpanContainer = document.querySelector(".bullets .spans");

let quizarea = document.querySelector(".quiz-area");

let answersrea  = document.querySelector(".answers-area");

let submitButton = document.querySelector(".submit-button");
let theresults = document.querySelector(".results");
let countdownSpan = document.querySelector(".countdown");



// set opation

let currentIndex = 0;
let rightAnswer = 0;
let countdownInterval;


function getQuestions() {

    let myrequest = new XMLHttpRequest();

    myrequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let questionObject = JSON.parse(this.responseText);
            let qCount = questionObject.length;
            

            // create Bullets + Set Questions 
            createBullets(qCount)

            // add question date

            addQustionDate(questionObject[currentIndex], qCount);

            // start countdown
            countdown(5,qCount);

            // Click on submit 

            submitButton.onclick = () => {     // اول متشيل دي كلها الاختبار بيشتغل 
                // Get Right answer

                let theRightAnswer = questionObject[currentIndex].right_answer;
                // console.log(theRightAnswer)  // this the Error 
                currentIndex++;
                // checked the Answer 
                checkAnswer(theRightAnswer, qCount);

                // remove previes 
                quizarea.innerHTML = "";
                answersrea.innerHTML = "";
                // add question date

            addQustionDate(questionObject[currentIndex], qCount);

            // handel class 
            handelBullets();
            // start countdown 
            clearInterval(countdownInterval);
                countdown(9,qCount);

            // show Results
            showResult(qCount);

            };

        }
    };
    myrequest.open("GET","html-question.json", true );
    myrequest.send();

}

getQuestions();


function createBullets(num) {

    countspan.innerHTML = num;

    // create Spans 

    for (let i =0; i<num; i++) {
        // create span 
        let theBullet = document.createElement("span");

        // check if Its frist span
            if (i === 0 ) {
            theBullet.className = "on";
            }


        // appned bullets to main container 
        bulltesSpanContainer.appendChild(theBullet);
    }

}

function addQustionDate(obj, count) {
    if(currentIndex < count) {
        // Create H2 question 

        let questionTitle = document.createElement("h2");

        // Create Question Text 
        let questionText = document.createTextNode(obj['title']);
    
        // Append Text To H2
        questionTitle.appendChild(questionText);
    
        // Appned The H2 THe quizarea
    
        quizarea.appendChild(questionTitle);
        
        // Create The Answer 
        for(let i = 1; i<=4; i++) {
            // create Min Div Answer 
            let mainDiv = document.createElement("div");
            // Add Class To Main Div
            mainDiv.className = 'answer';
    
            // Create REdieo 
            let radioInput = document.createElement("input");
    
            // Add Type +  name + id  + Date Attribute 
            radioInput.name = 'question';
            radioInput.type = 'radio';
            radioInput.id = `answer_${i}`;
            radioInput.dataset.answer = obj[`answer_${i}`];

            // make first Opation Cheked
            if(i === 1) {
            radioInput.checked = true;
            }
            // Create label
        
            let TheLebel = document.createElement("label");
    
            // add for attributes
            TheLebel.htmlFor = `answer_${i}`;
    
            // create label text 
            let ThelabelText = document.createTextNode(obj[`answer_${i}`]);
    
            // Add The TExt TO Label
            TheLebel.appendChild(ThelabelText);
    
            // Add input + label TO main Div
            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(TheLebel);
            
            // Append All nswersarea
            answersrea.appendChild(mainDiv);
            
        }
    }
    }



function checkAnswer(rAnswer, Count) {
    let answer = document.getElementsByName("question");
    let theChoosenanswer;

    for (let i =0; i<answer.length; i++) {
    if(answer[i].checked) {
        theChoosenanswer = answer[i].dataset.answer;
    }
    }

    if(rAnswer === theChoosenanswer) {
        rightAnswer++;
        // console.log('Good Answer');
    }
}


 function handelBullets () {
    let bulletsSpan = document.querySelectorAll(".bullets .spans span");
    let ArrayOfSpan = Array.from(bulletsSpan);
    ArrayOfSpan.forEach((span, index)=>{
        if(currentIndex === index) {
            span.className = "on";
        }
    })
 }

 function showResult(count) {
    let theresult;
    if(currentIndex === count) {
        quizarea.remove();
        answersrea.remove();
        submitButton.remove();
        elemntBullets.remove();

        if (rightAnswer > (count / 2)&&rightAnswer < count) {
        theresult = `<span class = "good">Good</span>${rightAnswer} From ${count} `;
        }else if (rightAnswer === count) {
            theresult = `<span class = "Perfect">Perfect</span>, All Answer Is Good`;
        }else {
            theresult = `<span class = "bad">Bad</span>, ${rightAnswer} From ${count} `;
        }
        theresults.innerHTML = theresult;
        theresults.style.padding = "10px";
        theresults.style.backgroundColor = "white";
        theresults.style.marginTop = "10px";
    }
 }

    function countdown(duration, count) {
        if(currentIndex < count) {
        let minutes, seconds;
        countdownInterval = setInterval(function(){
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);

        minutes = minutes < 10 ? `0${minutes}`: minutes;
        seconds = seconds < 10 ? `0${seconds}`: seconds;

        countdownSpan.innerHTML = `${minutes}:${seconds}`;

        if (--duration < 0){
            clearInterval(countdownInterval);
            submitButton.click();
        }

        },1000);
        }
    }