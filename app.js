
var count = 0;
var number = 0;
var questionUpdate;
var pause;
var d;
var remarks;
var lenght = 0;
var db = firebase.database().ref('/questions/');
//update question to the indexpage from database
db.on('child_added', function (data) {
    questionUpdate = {
        questionNo: data.val().questionNo,
        question: data.val().question,
        option1: data.val().option1,
        option2: data.val().option2,
        option3: data.val().option3,
        answer: data.val().ans,
        lenght: lenght++
    }
    //get main div
    var main = document.getElementById("quesionSection")
    // create para for question
    var p = document.createElement("p")
    //append p tag in main div
    main.appendChild(p);
    // append question from database to para
    p.innerText = questionUpdate.questionNo + ") " + questionUpdate.question;
    //create label  
    var label1 = document.createElement("label")
    var label2 = document.createElement("label")
    var label3 = document.createElement("label")
    // append label in to main   
    main.appendChild(label1)
    main.appendChild(label2)
    main.appendChild(label3)
    //create radio button
    var radio1 = document.createElement("input")
    var radio2 = document.createElement("input")
    var radio3 = document.createElement("input")
    // set attribute to radio button
    radio3.setAttribute("type", "radio")
    radio2.setAttribute("type", "radio")
    radio1.setAttribute("type", "radio")
    //set another attribute for name to radio
    radio1.setAttribute("name", questionUpdate.lenght + "same")
    radio2.setAttribute("name", questionUpdate.lenght + "same")
    radio3.setAttribute("name", questionUpdate.lenght + "same")

    //append radio to label 
    label1.appendChild(radio1)
    label2.appendChild(radio2)
    label3.appendChild(radio3)

    //create texr note for radio button
    var t1 = document.createTextNode(questionUpdate.option1)
    var t2 = document.createTextNode(questionUpdate.option2)
    var t3 = document.createTextNode(questionUpdate.option3)

    //append text into radio option text
    label1.appendChild(t1)
    label2.appendChild(t2)
    label3.appendChild(t3)


    //set value to radio for gettng answer
    radio1.setAttribute("value", "1")
    radio2.setAttribute("value", "2")
    radio3.setAttribute("value", "3")

})


function result() {
    //for getting value and match answer from radio to object

    d = document.getElementsByTagName("input")
    for (var i = 0; i < d.length; i++) {
        if (d[i].checked && d[i].value == questionUpdate.answer) {
            ++count;

        }
    }
    console.log(count)


    // calculation of result
    var marks = (100 / lenght) * count;
    var marksObtained = document.getElementById("mobtained")
    var percentage = document.getElementById("percentage")
    remarks = document.getElementById("remarks")
    marksObtained.innerText = marks.toFixed(2);
    console.log(number)
    percentage.innerText = ((Number(marksObtained.innerText) / 100) * 100).toFixed(2);
    if (percentage.innerHTML < 40) {
        remarks.innerText = "Fail, Sorry try again"
    }
    else {
        remarks.innerText = "Pass"

    }
    document.getElementById("startpage").innerHTML = "";
    document.getElementById("starttest").style.display = "none";
    document.getElementById("result").style.display = "block";
}








function disable() {
    var next = document.getElementById("next");
    next.disabled = true;
    next.style.backgroundColor = "grey";
}

function enable() {
    var next = document.getElementById("next");
    next.disabled = false;
    next.style.backgroundColor = "rgb(43, 168, 199)";
}
//restart button working
function restart() {
    window.location.href = "index.html"
}
//start button working
function start() {

    document.getElementById("startpage").innerHTML = " ";
    document.getElementById("starttest").style.display = "block";
    document.getElementById("result").style.display = "none";
    document.getElementById("adminPannel").style.display = "none";
}
//timer working
function timer() {

    var min = Number(document.getElementById("min").innerText);
    var sec = Number(document.getElementById("sec").innerText);
    var mili = Number(document.getElementById("mili").innerText);

    if (mili >= 0) {
        if (mili > 0) {
            --mili;
            var displaymili = document.getElementById("mili");
            displaymili.innerText = Number(mili);
        }
        else if (sec > 0 && mili == 0) {
            --sec;
            mili = 100;
            var displaymili = document.getElementById("mili");
            displaymili.innerText = Number(mili);
            var displaysec = document.getElementById("sec");
            displaysec.innerText = Number(sec);

        }
        else if (min > 0 && sec == 0) {
            --min
            sec = 60;
            var displaysec = document.getElementById("sec");
            displaysec.innerText = Number(sec);
            var displaymin = document.getElementById("min");
            displaymin.innerText = Number(min);
        }
        else if (sec == 0 && mili == 0 && min == 0) {

            stopTimer();
            result();
            remarks.innerText = "Time over";
        }


    }




}
//timer working every 10 mili sec
function startTimer() {
    pause = setInterval(timer, 10);
}
//pause timer
function stopTimer() {
    clearInterval(pause);
}
