// VIK_QUESTION: When to use this and when not to?

// To make sure changing constant gives error
"use strict";

// Max time in seconds
const MAX_TIME = 5;

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

$(document).ready(function() {
    initContainer();
})


function initContainer() {
    triviaGame.setContainer( $(document).find(".container") );
}


$(document).on("click", ".btn-start", function() {
    $(this).remove();
    createQuestionsView();
    triviaGame.start();
})

$(document).on("click", ".btn-done", function() {
    // VIK_TODO: Probably move to the "timesUp" function so the whole cleanup is 
    // done in one place
    $(this).remove();
    // VIK_TODO: Give the function better name
    triviaGame.timesUp();
})

var triviaGame = {
    container: null,
    timeDisplayElem: null,
    setContainer: function(param) {
        this.container = param;
    },
    start: function() {
        this.timeDisplayElem = $(this.container).find(".time-remaining");
        this.intervalId = timer.setTimer(MAX_TIME, triviaGame.timeChanged.bind(this));
    },

    timeChanged: function (timeLeft) {
        $(triviaGame.timeDisplayElem).text("Time Remaining: " +
            timeLeft +
            (timeLeft === 1 ? " second" : " seconds"));

            if (timeLeft <= 0) {
                this.timesUp();
            }
    },
    timesUp : function() {
        timer.clearTimer();

        getResult();
        removeQuestions();
        showResult();
    }
}

function showResult()
{
    let parentNode = $(".back-layer");
    $("<div>").text("All Done!").
        appendTo(parentNode);

    $("<div>").
        attr("class", "result-item").
        text("Correct Answers: " + result.correct).
        appendTo(parentNode);

    $("<div>").
        attr("class", "result-item").
        text("Incorrect Answers: " + result.incorrect).
        appendTo(parentNode);

    $("<div>").
        attr("class", "result-item").
        text("Unanswered: " + result.unanswered).
        appendTo(parentNode);
}

function removeQuestions()
{
    $(".question-list").remove();
}

var result = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
}

function getResult() {
    for (let i = 0; i < questionKeys.length; ++i) {
        const qKey = questionKeys[i];
        const qVal = $('input[name=' + qKey + ']:checked').val();
        let qObj = triviaQuestions[qKey];
        console.assert(qObj !== undefined, "question object not found for key " + qKey);
        if (qVal === undefined)
            result.unanswered++;
        else if (qVal === qObj.correctChoice)
            result.correct++;
        else
            result.incorrect++;

        // console.log(qVal);
    }
}

function createQuestionsView() {
    let questionListNode = $(".question-list");

    $("<div>").attr("class", "time-remaining").text("Time Remaining").appendTo(questionListNode);

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

    $("<button>").
        attr("type", "button").
        attr("class", "btn btn-done").
        text("Done").
        appendTo(questionListNode);


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
    clearTimer() {
        clearInterval(this.intervalId);
    }
}
