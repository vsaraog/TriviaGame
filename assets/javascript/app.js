// VIK_QUESTION: When to use this and when not to?

// To make sure changing constant gives error
"use strict";

// Max time in seconds
const QUESTION_NUM  = 6;
const QUESTION_TIME = 15;
const MAX_TIME = QUESTION_TIME * QUESTION_NUM;
const QUESTION_TRANSTION_TIME = 5;
const IMAGE_LINK =  "http://www.abflags.com/_flags/flags-of-the-world/states/usa/<state>%20flag/<state>%20flag-XL-anim.gif";


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
            "Montgomery",
            "Little Rock",
            "Springfield",
        ],
        correctChoice: "Montgomery"
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
var TriviaQuestions = (function() {
    let _quizQuestions = QUESTIONS;
    let _sessionKeys = [];
    let my = {};

    // this.questionKeys = function() {
    function questionKeys() {
        // keys of the questions from question object
        let keys = [];
        for (let i in _quizQuestions) {
            keys.push(i);
        }
        
        return keys;
    }

    // Keys of questions asked during a session
     my.sessionQuestionKeys = function() {
         // Already populated
         if (_sessionKeys.length > 0)
            return _sessionKeys;

         let qKeys = questionKeys();
        let randomIndices = getUniqueRandomNumbers( {min:0, max: qKeys.length}, 
            QUESTION_NUM);
        console.assert(qKeys.length > 0, "question keys is not populated");
        // Get random question keys using the random array
        for (let i=0; i < randomIndices.length; ++i) {
            _sessionKeys.push( qKeys[randomIndices[i]] );
        }
        return _sessionKeys;
    }

    my.getQuestionObj = function(key) {
        console.assert(this.sessionQuestionKeys().includes(key), key + " is not in questions");
        if ( _quizQuestions[key] )
            return _quizQuestions[key];
    }

    return my;
}());
 
 
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

var triviaGame = {
    // container: null,
    timeDisplayElem: null,
    setContainer: function(param) {
        this.container = param;
    },
    start: function() {
        triviaGame.timeDisplayElem = $(document).find(".time-remaining");

        var tm = timer;
        tm.setTimer(QUESTION_TIME, triviaGame.timeChanged, buildQuestionResultView)

        createQuestionView();
    },

    timeChanged: function (timeLeft) {
        $(triviaGame.timeDisplayElem).text("Time Remaining: " +
            timeLeft +
            (timeLeft === 1 ? " second" : " seconds"));
    },
}

function buildFinalResult()
{
    let parentNode = $("#page-content").html("");

    // let parentNode = $(".back-layer");
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
    $(".page-content").remove();
}

var result = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
}

var timer = ( function() {
    // Take initial time to start from
    // Should start up or down (@todo: nice to have)
    
    let my = {};
    // Time in seconds left in timer
    let _timeLeft = 0;
    // Callback function called when time is changed
    let _callbackFn = null;
    // Callback called when timer has expired
    let _expiredCallbackFn = null
    let _intervalId = null;

    my.setTimer = function(initialTime, callback, expiredCallback) {
        _timeLeft = initialTime;
        _callbackFn = callback;
        _expiredCallbackFn = expiredCallback;
        // Reset any existing
        clearInterval(_intervalId);
        _intervalId = setInterval(countDown, 1000);
    }

    my.clearTimer = function() {
        clearInterval(_intervalId);
    }

    function countDown() {
        --_timeLeft;
        if (_callbackFn)
            _callbackFn(_timeLeft);
        if (_timeLeft <= 0) {
            clearInterval(_intervalId);
            if (_expiredCallbackFn)
                _expiredCallbackFn();
        }
    }

    return my;
}());


$(document).ready(function() {
    initContainer();
})


function initContainer() {
    // triviaGame.setContainer( $(document).find(".container") );
}


$(document).on("click", ".vs-btn-start", function() {
    $("<div>").
        addClass("time-remaining").
        appendTo($("#always-visible-nodes"));
    
    triviaGame.start();
})

$(document).on("click", ".row-choice", function() {
    console.log("row-choice clicked " + $(this).attr("data-value"));
    console.log($(this).attr("data-question-key"));
    
    const userChoice = $(this).attr("data-value");
    buildQuestionResultView(userChoice);
})

function buildQuestionResultView(userChoice) {
    const key = $(document).
        find(".vs-table-head").
        attr("data-question-key");

    const qObj = TriviaQuestions.getQuestionObj(key);
    let heading;
    let correct = false;
    if (!userChoice) {
        heading = "Out of Time!";
        result.unanswered++;
    }
    else if (userChoice === qObj.correctChoice) {
        heading = "Correct";
        correct = true;
        result.correct++;
    }
    else {
        heading = "Nope";
        result.incorrect++;
    }

    let pageNode = $("#page-content").html("");

    $("<div>").text(heading).appendTo(pageNode);
    if (!correct) {
        $("<div>").
            text("The correct answer was: " + qObj.correctChoice).
            appendTo(pageNode);
    }

    const state = extractState(qObj.question);
    $("<img>").
        attr("src", buildUrl(state)).
        appendTo(pageNode);

    const callbackFn = nextQuestionnaire.isAnyQuestionLeft() ? 
        triviaGame.start : buildFinalResult;

    var tm = timer;
    tm.setTimer(QUESTION_TRANSTION_TIME, null, callbackFn);
}

function extractState(stateString) {
    const reg = new RegExp("Capital of ", "gi");
    return ( stateString.replace(reg, "") );
}

function buildUrl(state) {
    let s = state.replace(" ", "%20");
    const reg = new RegExp("<state>", "gi");
    return ( IMAGE_LINK.replace(reg, s) );
}
  

var nextQuestionnaire = (function() {
    let _currentQuestion = 0;

    console.log(TriviaQuestions.sessionQuestionKeys());
    let my = {};
    
    my.get =  function() {
        console.assert(this.isAnyQuestionLeft(), "Index for current question is not valid");

        const qKey = TriviaQuestions.sessionQuestionKeys()[_currentQuestion];
        console.log(qKey);

        ++_currentQuestion;
        
        let o = {};
        o[qKey] = TriviaQuestions.getQuestionObj(qKey);
        return o;
    }

    my.isAnyQuestionLeft = function() {
        return (_currentQuestion < TriviaQuestions.sessionQuestionKeys().length);
    }

    return my;
}())

function createQuestionView() {
    const qItem = nextQuestionnaire.get();
    const questionKey = Object.keys(qItem)[0];
    const qObj = qItem[questionKey];

    console.log(qObj);
    $("#page-content").html("");

    let tbl = $("<table>").
        attr("class", "table table-hover text-center vs-table-borderless").
        appendTo($("#page-content"));
    
    let tHead = $("<thead>").
        attr("data-question-key", questionKey).
        addClass("vs-table-head").
        appendTo(tbl);

    let tRow = $("<tr>").appendTo(tHead);   
    let tH = $("<th>").
        attr("scope", "col").
        text(qObj.question).
        appendTo(tRow);

    let tBody = $("<tbody>").appendTo(tbl);
    console.assert(questionKey !== undefined, "Object key not found");
    for (let i = 0; i < qObj.choices.length; ++i) {
        const choiceVal = qObj.choices[i];

        tRow = $("<tr>").appendTo(tBody);
        let tD = $("<td>").
            attr({
                "class": "row-choice vs-table-data-row",
                "scope": "row",
                "data-value": choiceVal,
            }).
            text(choiceVal).
            appendTo(tRow);
    }
}

// Start button initially
// Timer at top
// Array of questions
// show first question and make the choices clickable
// When clicked or when times up
// Give whether correct or wrong
// Display a video/image too
// After a set time (maybe 5 seconds), move to next question
// Once all questions are done, show the final result

