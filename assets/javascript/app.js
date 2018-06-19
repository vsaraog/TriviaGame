// VIK_QUESTION: When to use this and when not to?

// To make sure changing constant gives error
"use strict";

// Max time in seconds
const MAX_TIME = 30;

$(document).ready(function() {
    initContainer();
})


function initContainer() {
    triviaGame.setContainer( $(document).find(".container") );
    // triviaGame.start(); // VIK_DEBUG: Uncomment later on
    createQuizNode();
}

// function timeChanged(timeLeft) {
//     console.log(timeLeft);
// }

var triviaGame = {
    container: null,
    timeDisplayElem: null,
    setContainer: function(param) {
        this.container = param;
        this.timeDisplayElem = $(this.container).find(".time-remaining");
    },
    start: function() {
        timer.setTimer(10, triviaGame.timeChanged);
    },
    timeChanged: function (timeLeft) {
        console.log(timeLeft);
        $(triviaGame.timeDisplayElem).text("Time Remaining: " +
            timeLeft +
            (timeLeft === 1 ? " second" : " seconds"));
    }

}

const triviaQuestions =
{
    "nj-capital": {
        question: "Capital of New Jersey",
        choices: [
            "Newark",
            "Jersey City",
            "Trenton",
            "Camden",
        ],
        correctChoice: "Trenton"
    },
    "ny-capital": {
        question: "Capital of New York",
        choices: [
            "New York City",
            "Albany",
            "Buffalo",
            "Rochester",
        ],
        correctChoice: "Albany"
    },
}

// VIK_QUESTION: How to assert that keys are unique
// VIK_TODO: Wrap it somewhere 
var questionKeys = []; 
var buildKeyArray = () => { for (let i in triviaQuestions) questionKeys.push(i); }
buildKeyArray();
// var buildOptionName = questionNum => "question" + questionNum;

$(document).on("click", ".btn-start", function() {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    for (let i = 0; i < questionKeys.length; ++i) {
        const qKey = questionKeys[i];
        const qVal = $('input[name=' + qKey + ']:checked').val();
        let qObj = triviaQuestions[qKey];
        console.assert(qObj !== undefined, "question object not found for key " + qKey);
        if (qVal === undefined)
            unanswered++;
        else if (qVal === qObj.correctChoice)
            correct++;
        else
            incorrect++;

        console.log(qVal);
    }
    $(".correct-answers").append(correct);
    $(".incorrect-answers").append(incorrect);
    $(".unanswered").append(unanswered);
})

function createQuizNode() {
    let questionListNode = $(".question-list");
    let formGroup = $("<div>").attr("class", "form-group");
    formGroup.appendTo(questionListNode);

    for (let i = 0; i < questionKeys.length; ++i) {
        let qKey = questionKeys[i];
        let qObj = triviaQuestions[qKey];

        // Build the question element
        let questionNode = $("<div>").
            attr("class", "text-center");
        let questionLblNode = $("<label>").text(qObj.question);
        questionNode.append(questionLblNode);
        formGroup.append(questionNode);

        // let optionName = buildOptionName(i);
        for (let j = 0; j < qObj.choices.length; ++j) {
            let optionVal = qObj.choices[j];

            // Build the top node of the radio button
            let radioNode = $("<div>").
                attr("class", "form-check form-check-inline");
            formGroup.append(radioNode);

            // Build the radio button
            let optionId = qKey + "-" + "radio" + j;
            let radioInput = $("<input>").
                attr("class", "form-check-input").
                attr("type", "radio").
                attr("name", qKey).
                attr("id", optionId).
                attr("value", optionVal);

            // Build the label element next to the radio button
            let radioLabel = $("<label>").
                attr("class", "form-check-label").
                attr("for", optionId).
                text(optionVal);

            radioNode.append(radioInput);
            radioNode.append(radioLabel);
        }
    }


}

function displayQuestions() {
    // Take randomly selected 5 questions
    // build the questions under .question-list


}

var timer = {
    // Take initial time to start from
    // Should start up or down (@todo: nice to have)
    // Time in seconds left in timer
    timeLeft: 0,
    // Callback function called when time is changed
    callbackFn: null,
    intervalId: null,
    setTimer: function(initialTime, callback) {
        this.timeLeft = initialTime;
        this.callbackFn = callback;
        // Reset any existing
        clearInterval(this.intervalId);
        this.intervalId = setInterval(timer.countDown.bind(this), 1000);
    },
    countDown: function() {
        this.callbackFn(--this.timeLeft);
        if (this.timeLeft <= 0) {
            clearInterval(this.intervalId);
        }
    },
}
