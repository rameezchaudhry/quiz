var db = firebase.database().ref('/questions/');
//admin pannal
var questionNo = document.getElementById("num");
var question = document.getElementById("question");
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var ans = document.getElementById("ans");
//set question on database
function quizSetting() {
    var questions = {
        questionNo: questionNo.value,
        question: question.value,
        option1: option1.value,
        option2: option2.value,
        option3: option3.value,
        ans: ans.value,

    }
    db.child(questions.questionNo).set(questions)

    questionNo.value = "";
    question.value = "";
    option1.value = "";
    option2.value = "";
    option3.value = "";
    ans.value = "";
}

function del() {


    var remo = document.getElementById("remove");
    console.log(db)
    db.child(remove.value).remove();
    remo.value ="";
}

