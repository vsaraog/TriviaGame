// VIK_QUESTION: When to use this and when not to?

// To make sure changing constant gives error
"use strict";

// Max time in seconds
const QUESTION_NUM  = 6;
const MAX_TIME = 5 * QUESTION_NUM;

const QUESTIONS =
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

    "al-capital": {
        question: "Capital of Alabama",
        choices: [
            "Mobile",
            "Birigham",
            "Little Rock",
            "Springfield",
        ],
        correctChoice: "Birigham"
    },
    "ak-capital": {
        question: "Captal of Alaska",
        choices: [
            "Denali",
            "Juneau",
            "Anchorage",
            "Ketchikan",
            
        ],
        correctChoice: "Juneau"
    },

        "az-capital": {
        question: "Capital of Arizona",
        choices: [
            "Pheonix",
            "Sedona" ,
            "Tucson",
            "Scottsdale",

        ],
        correctChoice: "Pheonix"
    },
    "ca-capital": {
        question: "Capital of California",
        choices: [
            "Berkeley",
            "Sacramento",
            "Palo Alto",
            "Los Angeles",
        ],
        correctChoice: "Sacramento"
    },
    "fl-capital": {
        question: "Capital of Flordia",
        choices: [
            "Tallahassee",
            "Tampa",
            "Destin",
            "Jacsonville",
        ],
        correctChoice: "Tallahassee"
    },
    "tx-capital": {
        question: "Capital of Texas",
        choices: [
            "Houston",
            "Dallas",
            "Austin",
            "San Antonio",
        ],
        correctChoice: "Austin"
    },

    "sc-capital": {
        question: "Capital of South Carolina",
        choices: [
            "Columbia",
            "Greenville",
            "Chareston",
            "Lexington",
        ],
        correctChoice: "Columbia"
    },

    "nc-capital": {
        question: "Capital of North Carolina",
        choices: [
            "Raleigh",
            "Charolette",
            "Greensboro",
            "Wilmington",
        ],
        correctChoice: "Raleigh"
    },
 
    "ks-capital": {
        question: "Capital of Kansas",
        choices: [
            "Kansas City",
            "Wichita",
            "Lawrence",
            "Topeka",
        ],
        correctChoice: "Topeka"
    },

    "nb-capital": {
        question: "Capital of Nebraska",
        choices: [
            "Lincoln",
            "Kearney",
            "Scottsbluff",
            "Omaha",
        ],
        correctChoice: "Lincoln"
    },

    "nv-capital": {
        question: "Capital of Nevada",
        choices: [
            "Las Vegas",
            "Henderson",
            "Reno",
            "Carson City",
        ],
        correctChoice: "Carson City"
    },

    "vg-capital": {
        question: "Capital of Virginia",
        choices: [
            "Norfolk",
            "Williamsburg",
            "Richmond",
            "Alexandria",
        ],
        correctChoice: "Richmond"
    },

    "ws-capital": {
        question: "Capital of Washington",
        choices: [
            "Tacoma",
            "Seattle",
            "Olympia",
            "Bellingham",
        ],
        correctChoice: "Olympia"
    },

    "my-capital": {
        question: "Capital of Maryland",
        choices: [
            "Annapolis",
            "Fredrick",
            "Baltimore",
            "Hagerstown",
        ],
        correctChoice: "Annapolis"
    },

    "il-capital": {
        question: "Capital of Illinois",
        choices: [
            "Springfield",
            "Chicago",
            "Peoria",
            "Bloomington",
        ],
        correctChoice: "Springfield"
    },

    "hw-capital": {
        question: "Capital of Hawaii",
        choices: [
            "Honolulu",
            "Hilo",
            "Pahoa",
            "Kailua",
        ],
        correctChoice: "Honolulu"
    },

    "ri-capital": {
        question: "Capital of Rhode Island",
        choices: [
            "Newport",
            "Westerly",
            "Providence",
            "Warwick",
        ],
        correctChoice: "Providence"
    },

    "ts-capital": {
        question: "Capital of Tennessee",
        choices: [
            "Gatlinburg",
            "Knoxville",
            "Memphis",
            "Nashville",
        ],
        correctChoice: "Nashville"
    },

    "og-capital": {
        question: "Capital of Oregon",
        choices: [
            "Salem",
            "Medford",
            "Portland",
            "Bend",
        ],
        correctChoice: "Salem"
    },

    "go-capital": {
        question: "Capital of Georgia",
        choices: [
            "Macon",
            "Augusta",
            "Atlanta",
            "Savannah",
        ],
        correctChoice: "Atlanta"
    },
}
 
// VIK_TODO: assert that keys are unique
var TriviaQuestions = new function() {
    let _quizQuestions = QUESTIONS;
    let _sessionKeys = [];

    this.questionKeys = function() {
        // keys of the questions from question object
        let keys = [];
        for (let i in _quizQuestions) {
            keys.push(i);
        }
        
        return keys;
    }

    // Keys of questions asked during a session
     this.sessionQuestionKeys = function() {
         // Already populated
         if (_sessionKeys.length > 0)
            return _sessionKeys;

         let qKeys = this.questionKeys();
        let randomIndices = getUniqueRandomNumbers( {min:0, max: qKeys.length}, 
            QUESTION_NUM);
        console.assert(qKeys.length > 0, "question keys is not populated");
        // Get random question keys using the random array
        for (let i=0; i < randomIndices.length; ++i) {
            _sessionKeys.push( qKeys[randomIndices[i]] );
        }
        return _sessionKeys;
    }

    this.getQuestionObj = function(key) {
        console.assert(this.sessionQuestionKeys().includes(key), key + " is not in questions");
        if ( _quizQuestions[key] )
            return _quizQuestions[key];
    }
}
 
 
function randomGenerator(min, max, roundToNearest)
{
    if (roundToNearest === undefined) {
        roundToNearest = 1;
    }

    let num = ( min + Math.round(Math.random() * (max-min) ) );
    return ( Math.round(num/roundToNearest) * roundToNearest );
}   

// Returns an array containing unique number between a range,
// including the range min and max. Note min and max can be same
function getUniqueRandomNumbers(range, size) {
    let arr = [];
    size = parseInt(size);
    console.assert(range.max >= range.min);
    console.assert(size <= range.max - range.min, "range is less than the required length of array");
    console.assert(!!size, "passed invalid length argument")
    while (!!size && (size <= range.max - range.min) && arr.length != size) {
        let rand = randomGenerator(range.min, range.max);
        if (!arr.includes(rand)) {
            arr.push(rand);
        }
    }
    return arr;
}        


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
    let sesQKeys = TriviaQuestions.sessionQuestionKeys();
    for (let i = 0; i < sesQKeys.length; ++i) {
        const qKey = sesQKeys[i];
        const qVal = $('input[name=' + qKey + ']:checked').val();
        
        const qObj = TriviaQuestions.getQuestionObj(qKey);
        const correctAns = qObj && qObj.correctChoice;
        if (qVal === undefined)
            result.unanswered++;
        else if (qVal === correctAns)
            result.correct++;
        else
            result.incorrect++;
    }
}

function createQuestionsView() {
    let questionListNode = $(".question-list");

    $("<div>").attr("class", "time-remaining").text("Time Remaining").appendTo(questionListNode);

    let formGroup = $("<div>").attr("class", "form-group");
    formGroup.appendTo(questionListNode);

    // Random unique indicies of the question array
    // let questionKeyIndicies = getUniqueRandomNumbers( {min:0, max:triviaQuestions.questionKeys.length}, QUESTION_NUM);
    const sesQKeys = TriviaQuestions.sessionQuestionKeys();
    for (let i = 0; i < sesQKeys.length; ++i) {
        // Get the index, for which we will get the key and find the 
        // question object using that key
        // const index = questionKeyIndicies[i];
        const qKey = sesQKeys[i];
        const qObj = TriviaQuestions.getQuestionObj(qKey);

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
