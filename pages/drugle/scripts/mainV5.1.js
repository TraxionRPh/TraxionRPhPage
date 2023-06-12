// following changes null to 0 so other functions/trackers work on first visit
if (JSON.parse(localStorage.getItem("currentStreak")) === null) {
	localStorage.setItem("currentStreak", 0);
	document.getElementById("current-streak").innerHTML = 0;
}
if (JSON.parse(localStorage.getItem("gamesPlayed")) === null || JSON.parse(localStorage.getItem("gamesPlayed")) === 0) {
	localStorage.setItem("gamesPlayed", 0);
	document.getElementById("games-played").innerHTML = 0;
	document.getElementById("win-percentage").innerHTML = 0 + "%";
} else {
	let winPercentage = JSON.parse(localStorage.getItem("gamesWon")) / JSON.parse(localStorage.getItem("gamesPlayed")) * 100;
	document.getElementById("win-percentage").innerHTML = winPercentage.toPrecision(3) + "%";
}
if (JSON.parse(localStorage.getItem("gamesWon")) === null) {
	localStorage.setItem("gamesWon", 0);
}
if (JSON.parse(localStorage.getItem("maxStreak")) === null) {
	localStorage.setItem("maxStreak", 0);
	document.getElementById("max-streak").innerHTML = 0;
}
if (JSON.parse(localStorage.getItem("oneGuess")) === null || JSON.parse(localStorage.getItem("oneGuess")) === 0) {
	localStorage.setItem("oneGuess", 0);
	document.getElementById("one").innerHTML = 0;
};
if (JSON.parse(localStorage.getItem("twoGuesses")) === null || JSON.parse(localStorage.getItem("twoGuesses")) === 0) {
	localStorage.setItem("twoGuesses", 0);
	document.getElementById("two").innerHTML = 0;
};
if (JSON.parse(localStorage.getItem("threeGuesses")) === null || JSON.parse(localStorage.getItem("threeGuesses")) === 0) {
	localStorage.setItem("threeGuesses", 0);
	document.getElementById("three").innerHTML = 0;
};
if (JSON.parse(localStorage.getItem("fourGuesses")) === null || JSON.parse(localStorage.getItem("fourGuesses")) === 0) {
	localStorage.setItem("fourGuesses", 0);
	document.getElementById("four").innerHTML = 0;
};
if (JSON.parse(localStorage.getItem("fiveGuesses")) === null || JSON.parse(localStorage.getItem("fiveGuesses")) === 0) {
	localStorage.setItem("fiveGuesses", 0);
	document.getElementById("five").innerHTML = 0;
};
if (JSON.parse(localStorage.getItem("sixGuesses")) === null || JSON.parse(localStorage.getItem("sixGuesses")) === 0) {
	localStorage.setItem("sixGuesses", 0);
	document.getElementById("six").innerHTML = 0;
};
if (JSON.parse(localStorage.getItem("sevenGuesses")) === null || JSON.parse(localStorage.getItem("sevenGuesses")) === 0) {
	localStorage.setItem("sevenGuesses", 0);
	document.getElementById("seven").innerHTML = 0;
};
if (JSON.parse(localStorage.getItem("eightGuesses")) === null || JSON.parse(localStorage.getItem("eightGuesses")) === 0) {
	localStorage.setItem("eightGuesses", 0);
	document.getElementById("eight").innerHTML = 0;
};
if (JSON.parse(localStorage.getItem("tableCounter")) === null) {
	localStorage.setItem("tableCounter", 0);
};
if (localStorage.getItem("winToday") === null) {
	localStorage.setItem("winToday","no");
};
if (JSON.parse(localStorage.getItem("currentGuess")) === null) {
	localStorage.setItem("currentGuess", 1);
}
graphHeights();

function restoreNormalMode() {
    addNormalPictures();
    tableCounter = JSON.parse(localStorage.getItem("tableCounter"));
    if (tableCounter === 8 && localStorage.getItem("winToday") === "no") {
        guessArea.disabled = true;
        guessArea.value = "";
        guessArea.placeholder = "Try again tomorrow!";
        btnImage.onclick = function() {
            modalGameOver.style.display = "block";
            gameOverStatus.addEventListener("animationend", function() {
                modalGameOver.style.display = "block";
            });
        };
        document.getElementById("wrongAnswer").innerHTML =`${printAnswerDrug}` + " was the correct answer";
        document.getElementById("table").innerHTML = JSON.parse(localStorage.getItem("table"));
        document.getElementById("table").style.display = "block";
    } else if (localStorage.getItem("winToday") === "yes") {
        guessArea.disabled = true;
        guessArea.value = "";
        guessArea.placeholder = "Great job!";
        btnImage.onclick = function() {
            modalCorrect.style.display = "block";
            correctStatus.addEventListener("animationend", function() {
                modalCorrect.style.display = "block";
            });
        };
        document.getElementById("correctAnswer").innerHTML =`${printAnswerDrug}`;
        document.getElementById("table").innerHTML = JSON.parse(localStorage.getItem("table"));
        document.getElementById("table").style.display = "block";
    } else {
        if (JSON.parse(localStorage.getItem("tableCounter")) > 0) {
            document.getElementById("table").innerHTML = JSON.parse(localStorage.getItem("table"));
            document.getElementById("table").style.display = "block";
        } else {
            document.getElementById("table").style.display = "none";
        }
        guessArea.placeholder = "Guess " + `${currentGuess}` + " of 8";
        btnImage.onclick = function() {
            modalImage.style.display = "block";
            imageStatus.addEventListener("animationend", function() {
                modalImage.style.display = "block";
            });
        }
        currentGuess = JSON.parse(localStorage.getItem("currentGuess"));
    }
}

// Drug of the day
var today = new Date();
var originNew = new Date(2023,1,25,0,0,0,0);
var difference = (today - originNew);
var days = Math.floor(difference / 864e5);
var answerDrugIndexNumber = randomizedIndexes[days]; /* Array index number of answer */
var answerDrug = drugs[answerDrugIndexNumber]; /* array of answer drug name*/
var printAnswerDrug = listDrugs[answerDrugIndexNumber];

// Drug of the day class and indication
var answerClassIndex = drugClass[answerDrugIndexNumber]; /* answer class in array */
var answerIndicationIndex = drugIndication[answerDrugIndexNumber]; /* answer indication in array */
var answerDosageFormsIndex = drugDosageForms[answerDrugIndexNumber]; /* answer dosage forms in array */
var answerDrugImage = '<img class="images" src="images/answers/index' + answerDrugIndexNumber + 'AnswerV1.webp">';
var answerHintImage = '<img class="images" src="images/hints/index' + answerDrugIndexNumber + 'HintV1.webp">';
addNormalPictures();

let currentGuessUnlimited = 1;
var answerDrugIndexNumberUnlimited = null
var answerDrugUnlimited = null;
var printAnswerDrugUnlimited = null;
var answerClassIndexUnlimited = null;
var answerIndicationIndexUnlimited = null;
var answerDosageFormsIndexUnlimited = null;
var answerDrugImageUnlimited = null;
var answerHintImageUnlimited = null;

// Resets the game if it is no longer the same day
if (days > JSON.parse(localStorage.getItem("previousDay")) || JSON.parse(localStorage.getItem("previousDay")) == null) {
    localStorage.setItem("winToday", "no");
    localStorage.setItem("tableCounter", 0);
    localStorage.setItem("table","");
    localStorage.setItem("currentGuess", 1);
    localStorage.setItem("previousDay", days);
    localStorage.setItem("unlimitedTableBase", JSON.stringify(document.getElementById("table").innerHTML))
};

// adds pictures to modals
function addNormalPictures() {
    document.getElementById("correct-answer-image").innerHTML = answerDrugImage;
    document.getElementById("wrong-answer-image").innerHTML = answerDrugImage;
    document.getElementById("image-blur").innerHTML = answerHintImage;
}

function addUnlimitedPictures() {
    document.getElementById("correct-answer-image").innerHTML = answerDrugImageUnlimited;
    document.getElementById("wrong-answer-image").innerHTML = answerDrugImageUnlimited;
    document.getElementById("image-blur").innerHTML = answerHintImageUnlimited;
}

// Mode selection
var box = document.getElementById("switch")
let gameMode = "Normal"
// listens for switch change, evaluates after change happens
box.addEventListener("change", (e) => {
    if(e.currentTarget.checked) {
        gameMode = "Unlimited";
        currentGuessUnlimited = 1;
        answerDrugIndexNumberUnlimited = randomizedIndexes[Math.floor(Math.random() * randomizedIndexes.length)];
        answerDrugUnlimited = drugs[answerDrugIndexNumberUnlimited];
        printAnswerDrugUnlimited = listDrugs[answerDrugIndexNumberUnlimited];
        answerClassIndexUnlimited = drugClass[answerDrugIndexNumberUnlimited];
        answerIndicationIndexUnlimited = drugIndication[answerDrugIndexNumberUnlimited];
        answerDosageFormsIndexUnlimited = drugDosageForms[answerDrugIndexNumberUnlimited];
        answerDrugImageUnlimited = '<img class="images" src="images/answers/index' + answerDrugIndexNumberUnlimited + 'AnswerV1.webp">';
        answerHintImageUnlimited = '<img class="images" src="images/hints/index' + answerDrugIndexNumberUnlimited + 'HintV1.webp">';
        addUnlimitedPictures();
        document.getElementById("table").innerHTML = JSON.parse(localStorage.getItem("unlimitedTableBase"));
        document.getElementById("table").style.display = "none";
        guessArea.value = "";
        guessArea.placeholder = "Guess " + `${currentGuessUnlimited}` + " of 8";
        guessArea.disabled = false;
        btnImage.onclick = function() {
            modalImage.style.display = "block";
            imageStatus.addEventListener("animationend", function() {
                modalImage.style.display = "block";
            });
        }
    } else {
        gameMode= "Normal";
        restoreNormalMode();
    }
})

// HTML naming
var table = document.getElementById("table");
var tableBody = document.getElementById("tableBody");
var guessArea = document.getElementById("type-guess");
var currentGuess = JSON.parse(localStorage.getItem("currentGuess"));
let gamesPlayed = JSON.parse(localStorage.getItem("gamesPlayed"));
let gamesWon = JSON.parse(localStorage.getItem("gamesWon"));
let currentStreak = JSON.parse(localStorage.getItem("currentStreak"));
let maxStreak = JSON.parse(localStorage.getItem("maxStreak"));
let oneGuess = JSON.parse(localStorage.getItem("oneGuess"));
let twoGuesses = JSON.parse(localStorage.getItem("twoGuesses"));
let threeGuesses = JSON.parse(localStorage.getItem("threeGuesses"));
let fourGuesses = JSON.parse(localStorage.getItem("fourGuesses"));
let fiveGuesses = JSON.parse(localStorage.getItem("fiveGuesses"));
let sixGuesses = JSON.parse(localStorage.getItem("sixGuesses"));
let sevenGuesses = JSON.parse(localStorage.getItem("sevenGuesses"));
let eightGuesses = JSON.parse(localStorage.getItem("eightGuesses"));

// Checks if first time ever visiting site
if (! localStorage.noFirstVisit) {
    document.getElementById("question-mark-popup").style.display = "block";
    localStorage.setItem("unlimitedTableBase", JSON.stringify(document.getElementById("table").innerHTML))

    // check this flag for escaping this if block next time
    localStorage.noFirstVisit = "1";
};

// When page loads, gets the current guess player is on or initializes it
let tableCounter = JSON.parse(localStorage.getItem("tableCounter"));

let tableCounterUnlimited = 0;

// checks if the game is over or not
if (tableCounter === 8 && localStorage.getItem("winToday") === "no") {
	guessArea.disabled = true;
	guessArea.value = "";
	guessArea.placeholder = "Try again tomorrow!";
};
if (localStorage.getItem("winToday") === "yes") {
	guessArea.disabled = true;
	guessArea.value = "";
	guessArea.placeholder = "Great job!";
};

// Bar Graph Modal
var modalGraph = document.getElementById("graph-popup");

var btnGraph = document.getElementById("bar-graph");

var closeGraph = document.getElementById("graph-close");

btnGraph.onclick = function() {
	modalGraph.style.display = "block";
}

closeGraph.onclick = function() {
	modalGraph.style.display = "none";
}

// Question Mark Modal
var modalQuestionMark = document.getElementById("question-mark-popup");

var btnQuestionMark = document.getElementById("question-mark");

var closeQuestionMark = document.getElementById("question-close");

btnQuestionMark.onclick = function() {
	modalQuestionMark.style.display = "block";
}

closeQuestionMark.onclick = function() {
	modalQuestionMark.style.display = "none";
}

// Image Hint Modal
var modalImage = document.getElementById("image-hint-popup");

var btnImage = document.getElementById("image-hint");

var closeImage = document.getElementById("image-close");

// if player lost for the day, image hint button shows the game over screen
if (tableCounter === 8 && localStorage.getItem("winToday") === "no") {
	btnImage.onclick = function() {
		modalGameOver.style.display = "block";
		gameOverStatus.addEventListener("animationend", function() {
			modalGameOver.style.display = "block";
		});
	};
	document.getElementById("wrongAnswer").innerHTML =`${printAnswerDrug}` + " was the correct answer";
	} else {
	btnImage.onclick = function() {
		modalImage.style.display = "block";
		imageStatus.addEventListener("animationend", function() {
			modalImage.style.display = "block";
		});
	}
};

// if player won for the day, image hint button shows the game won screen
if (localStorage.getItem("winToday") === "yes") {
	btnImage.onclick = function() {
		modalCorrect.style.display = "block";
		correctStatus.addEventListener("animationend", function() {
			modalCorrect.style.display = "block";
		});
	};
	document.getElementById("correctAnswer").innerHTML =`${printAnswerDrug}`;
} else {
	btnImage.onclick = function() {
		modalImage.style.display = "block";
		imageStatus.addEventListener("animationend", function() {
			modalImage.style.display = "block";
		});
	};
};

// Initializes Image Hint Modal to enter animation. Switches to exit id for outward animation
var imageStatus = document.getElementById("image-hint-content-enter");

closeImage.onclick = function() {
	imageStatus.id = "image-hint-content-exit"
	imageStatus.addEventListener("animationend", function() {
		modalImage.style.display = "none";
		imageStatus.id = "image-hint-content-enter";
	});
}

// Game over modal
var modalGameOver = document.getElementById("game-over-popup");

var closeGameOver = document.getElementById("lose-close");

var gameOverStatus = document.getElementById("wrong-content-enter");

closeGameOver.onclick = function() {
	gameOverStatus.id = "wrong-content-exit";
	gameOverStatus.addEventListener("animationend", function() {
		gameOverStatus.id = "wrong-content-enter";
		modalGameOver.style.display = "none";
	});
}

// Correct modal
var modalCorrect = document.getElementById("correct-popup");

var closeCorrect = document.getElementById("win-close");

var correctStatus = document.getElementById("correct-content-enter");

closeCorrect.onclick = function() {
	correctStatus.id = "correct-content-exit";
	correctStatus.addEventListener("animationend", function() {
		correctStatus.id = "correct-content-enter";
		modalCorrect.style.display = "none";
	});
}

// Close Modals By Clicking Outside Of The Modals
window.onclick = function(event) {
	if (event.target == modalQuestionMark) {
		modalQuestionMark.style.display = "none";
	}
	if (event.target == modalGraph) {
		modalGraph.style.display = "none";
	}
	if (event.target == modalImage) {
		modalImage.style.display = "none";
		imageStatus.id = "image-hint-content-enter";
	}
	if (event.target == modalGameOver) {
		modalGameOver.style.display = "none";
		gameOverStatus.id = "wrong-content-enter";
	}
	if (event.target == modalCorrect) {
		modalCorrect.style.display = "none";
		correctStatus.id = "correct-content-enter";
	}
};

// open stats page when opening site after winning or directions if first visit
window.onload = function() {
	if (tableCounter === 8 && localStorage.getItem("winToday") === "no") {
		guessArea.disabled = true;
        guessArea.value = "";
        guessArea.placeholder = "Try again tomorrow!";
		modalGraph.style.display = "block";
		btnImage.onclick = function() {
            modalGameOver.style.display = "block";
			gameOverStatus.addEventListener("animationend", function() {
				modalGameOver.style.display = "block";
			});
        };
	};
	if (localStorage.getItem("winToday") === "yes") {
		modalGraph.style.display = "block";
		guessArea.disabled = true;
        guessArea.value = "";
        guessArea.placeholder = "Great job!";
		btnImage.onclick = function() {
            modalCorrect.style.display = "block";
			correctStatus.addEventListener("animationend", function() {
				modalCorrect.style.display = "block";
			});
        };
	};

	// scrolls to top of page automatically
	document.getElementById("table").scrollTo(0, document.getElementById("table").scrollHeight);
};

// Share results
var btnShare = document.getElementById("share");

var copyMessage = document.getElementById("copybox");

btnShare.onclick = function () {
	var copyOptionsGuess1 = [`I got today's Drugle in ${currentGuess} guess! I'm on a ${currentStreak} win streak now, try for yourself at https://drugle.today/!`,
							`I got today's Drugle in ${currentGuess} guess! My highest streak is ${maxStreak} wins in a row! Try for yourself at https://drugle.today/!`,
							`I got today's Drugle in ${currentGuess} guess! I've won ${winPercentage}% of my games, try for yourself at https://drugle.today/!`,
							`I got today's Drugle in ${currentGuess} guess! I've played ${gamesPlayed} times, try for yourself at https://drugle.today/!`]
	var copyOptions = [`I got today's Drugle in ${currentGuess} guesses! I'm on a ${currentStreak} win streak now, try for yourself at https://drugle.today/!`,
					`I got today's Drugle in ${currentGuess} guesses! My highest streak is ${maxStreak} wins in a row! Try for yourself at https://drugle.today/!`,
					`I got today's Drugle in ${currentGuess} guesses! I've won ${winPercentage}% of my games, try for yourself at https://drugle.today/!`,
					`I got today's Drugle in ${currentGuess} guesses! I've played ${gamesPlayed} times, try for yourself at https://drugle.today/!`]
	if (currentGuess === 1) {
		navigator.clipboard.writeText(copyOptionsGuess1[Math.floor(Math.random() * copyOptionsGuess1.length)])
	} else {
		navigator.clipboard.writeText(copyOptions[Math.floor(Math.random() * copyOptions.length)])
	}
	if (copyMessage.style.animationName === "fadeOut") {
		copyMessage.style.animationName = "fadeOut2";
	} else {
		copyMessage.style.animationName = "fadeOut";
	};
	copyMessage.id = "copyboxOn";
	copyMessage.addEventListener("animationend", function() {
		copyMessage.id = "copybox";
	});
};

// Changes text in input box with each guess
guessArea.placeholder = "Guess " + `${currentGuess}` + " of 8";

// enter to select
guessArea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && listDrugs.includes(guessArea.value)) {
        if (gameMode === "Normal") {
            checkGuessNormal(e);
        } else if (gameMode === "Unlimited") {
            checkGuessUnlimited(e);
        }
    }
})

// click to select
document.getElementById("awesomplete_list_1").onclick = function(e) {
    if (listDrugs.includes(guessArea.value)) {
        if (gameMode === "Normal") {
            checkGuessNormal(e);
        } else if (gameMode === "Unlimited") {
            checkGuessUnlimited(e);
        }
    }
}

// Display Statistics
document.getElementById("games-played").innerHTML = gamesPlayed;
document.getElementById("current-streak").innerHTML = currentStreak;
document.getElementById("max-streak").innerHTML = maxStreak;
document.getElementById("one").innerHTML = oneGuess;
document.getElementById("two").innerHTML = twoGuesses;
document.getElementById("three").innerHTML = threeGuesses;
document.getElementById("four").innerHTML = fourGuesses;
document.getElementById("five").innerHTML = fiveGuesses;
document.getElementById("six").innerHTML = sixGuesses;
document.getElementById("seven").innerHTML = sevenGuesses;
document.getElementById("eight").innerHTML = eightGuesses;

//////// Named functions  //////////
// updates max streak
function record() {
    if (currentStreak > maxStreak) {
        localStorage.setItem("maxStreak", currentStreak);
        localStorage.getItem("maxStreak");
    }
}

// Change heights of bar graphs
function graphHeights() {
	let oneHeight = JSON.parse(localStorage.getItem("oneGuess"));
	let twoHeight = JSON.parse(localStorage.getItem("twoGuesses"));
	let threeHeight = JSON.parse(localStorage.getItem("threeGuesses"));
	let fourHeight = JSON.parse(localStorage.getItem("fourGuesses"));
	let fiveHeight = JSON.parse(localStorage.getItem("fiveGuesses"));
	let sixHeight = JSON.parse(localStorage.getItem("sixGuesses"));
	let sevenHeight = JSON.parse(localStorage.getItem("sevenGuesses"));
	let eightHeight = JSON.parse(localStorage.getItem("eightGuesses"));
	var fullBar = Math.max(oneHeight, twoHeight, threeHeight, fourHeight, fiveHeight, sixHeight, sevenHeight, eightHeight);
	// guess one bar
	if (oneHeight === fullBar) {
		document.getElementById("oneGuess").style.height = "100%";
		document.getElementById("one").style.position = "absolute";
	} else if (oneHeight > 0 && oneHeight !== fullBar) {
		document.getElementById("oneGuess").style.height = oneHeight / fullBar * 100 + "%";
		document.getElementById("one").style.position = "absolute";
	} else {
		document.getElementById("oneGuess").style.height = "3.5vh";
		document.getElementById("one").style.position = "absolute";
	};
	// guess two bar
	if (twoHeight === fullBar) {
		document.getElementById("twoGuess").style.height = "100%";
		document.getElementById("two").style.position = "absolute";
	} else if (twoHeight > 0 && twoHeight !== fullBar) {
		document.getElementById("twoGuess").style.height = twoHeight / fullBar * 100 + "%";
		document.getElementById("two").style.position = "absolute";
	} else {
		document.getElementById("twoGuess").style.height = "3.5vh";
		document.getElementById("two").style.position = "absolute";
	};
	// guess three bar
	if (threeHeight === fullBar) {
		document.getElementById("threeGuess").style.height = "100%";
		document.getElementById("three").style.position = "absolute";
	} else if (threeHeight > 0 && threeHeight !== fullBar) {
		document.getElementById("threeGuess").style.height = threeHeight / fullBar * 100 + "%";
		document.getElementById("three").style.position = "absolute";
	} else {
		document.getElementById("threeGuess").style.height = "3.5vh";
		document.getElementById("three").style.position = "absolute";
	};
	// guess four bar
	if (fourHeight === fullBar) {
		document.getElementById("fourGuess").style.height = "100%";
		document.getElementById("four").style.position = "absolute";
	} else if (fourHeight > 0 && fourHeight !== fullBar) {
		document.getElementById("fourGuess").style.height = fourHeight / fullBar * 100 + "%";
		document.getElementById("four").style.position = "absolute";
	} else {
		document.getElementById("fourGuess").style.height = "3.5vh";
		document.getElementById("four").style.position = "absolute";
	};
	// guess five bar
	if (fiveHeight === fullBar) {
		document.getElementById("fiveGuess").style.height = "100%";
		document.getElementById("five").style.position = "absolute";
	} else if (fiveHeight > 0 && fiveHeight !== fullBar) {
		document.getElementById("fiveGuess").style.height = fiveHeight / fullBar * 100 + "%";
		document.getElementById("five").style.position = "absolute";
	} else {
		document.getElementById("fiveGuess").style.height = "3.5vh";
		document.getElementById("five").style.position = "absolute";
	};
	// guess six bar
	if (sixHeight === fullBar) {
		document.getElementById("sixGuess").style.height = "100%";
		document.getElementById("six").style.position = "absolute";
	} else if (sixHeight > 0 && sixHeight !== fullBar) {
		document.getElementById("sixGuess").style.height = sixHeight / fullBar * 100 + "%";
		document.getElementById("six").style.position = "absolute";
	} else {
		document.getElementById("sixGuess").style.height = "3.5vh";
		document.getElementById("six").style.position = "absolute";
	};
	// guess seven bar
	if (sevenHeight === fullBar) {
		document.getElementById("sevenGuess").style.height = "100%";
		document.getElementById("seven").style.position = "absolute";
	} else if (sevenHeight > 0 && sevenHeight !== fullBar) {
		document.getElementById("sevenGuess").style.height = sevenHeight / fullBar * 100 + "%";
		document.getElementById("seven").style.position = "absolute";
	} else {
		document.getElementById("sevenGuess").style.height = "3.5vh";
		document.getElementById("seven").style.position = "absolute";
	};
	// guess eight bar
	if (eightHeight === fullBar) {
		document.getElementById("eightGuess").style.height = "100%";
		document.getElementById("eight").style.position = "absolute";
	} else if (eightHeight > 0 && eightHeight !== fullBar) {
		document.getElementById("eightGuess").style.height = eightHeight / fullBar * 100 + "%";
		document.getElementById("eight").style.position = "absolute";
	} else {
		document.getElementById("eightGuess").style.height = "3.5vh";
		document.getElementById("eight").style.position = "absolute";
	};
	// minimum bar height
	if (oneHeight === 0 && twoHeight === 0 && threeHeight === 0 && fourHeight === 0 && fiveHeight === 0 && sixHeight === 0 && sevenHeight === 0 && eightHeight === 0) {
		document.getElementById("oneGuess").style.height = "3.5vh";
		document.getElementById("twoGuess").style.height = "3.5vh";
		document.getElementById("threeGuess").style.height = "3.5vh";
		document.getElementById("fourGuess").style.height = "3.5vh";
		document.getElementById("fiveGuess").style.height = "3.5vh";
		document.getElementById("sixGuess").style.height = "3.5vh";
		document.getElementById("sevenGuess").style.height = "3.5vh";
		document.getElementById("eightGuess").style.height = "3.5vh";
	};
}

// only allows current guess to be saved if it is not game over
function currentGuessMax() {
	if (currentGuess <= 8) {
		localStorage.setItem("currentGuess", currentGuess);
	};
}

// Loads table's current progress
if (JSON.parse(localStorage.getItem("tableCounter")) > 0) {
    document.getElementById("table").innerHTML = JSON.parse(localStorage.getItem("table"));
    document.getElementById("table").style.display = "block";
}

// runs every time a guess is submitted
function checkGuessNormal() {
    let guess = guessArea.value;
    let guessIndexNumber = listDrugs.indexOf(guess); /* Array index number of guess */
    let guessDrug = drugs[guessIndexNumber]; /* array of guess drug name */
    let spannedGuessDrug = guessDrug.slice(0); /* copy of guessDrug array to span matches */
    let guessClass = drugClass[guessIndexNumber]; /* array of guess drug class */
    let spannedGuessClass = guessClass.slice(0); /* copy of guessClass array to span matches */
    let guessIndication = drugIndication[guessIndexNumber]; /* array of guess drug indication */
    let spannedGuessIndication = guessIndication.slice(0); /* copy of guessIndication array to span matches */
    let guessDosageForms = drugDosageForms[guessIndexNumber]; /*array of guess dosage forms */
    let spannedGuessDosageForms = guessDosageForms.slice(0); /* copy of guessDosageForms array to span matches */

    // all rows and columns are already made, this changes the content based on which guess the game is on
    let row = document.getElementById(`row-${currentGuess}`);
    let columnGuess = document.getElementById(`nameCell-${currentGuess}`);
    let columnClass = document.getElementById(`classCell-${currentGuess}`);
    let columnIndication = document.getElementById(`indicationCell-${currentGuess}`);
    let columnDosageForms = document.getElementById(`dosageFormsCell-${currentGuess}`);
    
    // check drug name match, color and bold matching text and show row
    function colorDrugColumn() {
            for(let i = 0; i < answerDrug.length; i++) {
                for(let j = 0; j < guessDrug.length; j++) {
                    if (answerDrug[i] === guessDrug[j] && answerDrug[i] !== "/ " && guessDrug[j] !== "/ " && answerDrug[i] !== " " && guessDrug[j] !== " ") {
                        columnGuess.style.backgroundColor = "#FFFF00"; /* yellow highlight */
                        spannedGuessDrug.splice(j, 1, `<span class="match">${guessDrug[j]}</span>`) /* bold matching text and put back in cell */
                        columnGuess.innerHTML = spannedGuessDrug.join("");
                        row.style.display = "table-row"
                    } else {
                        columnGuess.innerHTML = spannedGuessDrug.join("");
                        row.style.display = "table-row"
                    }
                }
            }
        }
        //check class match, color and bold matching text and add to table
        function colorClassColumn() {
                for(let i = 0; i < answerClassIndex.length; i++) {
                    for(let j = 0; j < guessClass.length; j++) {
                        if (answerClassIndex[i] === guessClass[j] && answerClassIndex[i] !== "/ " && guessClass[j] !== "/ " && answerClassIndex[i] !== " " && guessClass[j] !== " " && answerClassIndex[i] !== "-" && guessClass[j] !== "-" && answerClassIndex[i] !== "Blocker" && guessClass[j] !== "Blocker" && answerClassIndex[i] !== "Antagonist" && guessClass[j] !== "Antagonist" && answerClassIndex[i] !== "Agonist" && guessClass[j] !== "Agonist") {
                            columnClass.style.backgroundColor = "#FFFF00"; /* yellow highlight */
                            spannedGuessClass.splice(j, 1, '<span class="match">' + guessClass[j] + '</span>') /* bold matching text and put back in cell */
                            columnClass.innerHTML = spannedGuessClass.join("");
                        } else {
                            columnClass.innerHTML = spannedGuessClass.join("");
                        }
                    }
                }
            }
        //check indication match, color and bold matching text and add to table
        function colorIndicationColumn() {
                for(let i = 0; i < answerIndicationIndex.length; i++) {
                    for(let j = 0; j < guessIndication.length; j++) {
                        if (answerIndicationIndex[i] === guessIndication[j] && answerIndicationIndex[i] !== ", " && guessIndication[j] !== ", " && answerIndicationIndex[i] !== " " && guessIndication[j] !== " " && answerIndicationIndex[i] !== "/ " && guessIndication[j] !== "/ ") {
                            columnIndication.style.backgroundColor = "#FFFF00"; /* yellow highlight */
                            spannedGuessIndication.splice(j, 1, '<span class="match">' + guessIndication[j] + '</span>') /* bold matching text and put back in cell */
                            columnIndication.innerHTML = spannedGuessIndication.join("");
                        } else {
                            columnIndication.innerHTML = spannedGuessIndication.join("");
                        }
                    }
                }
            }
        // check dosage form match, color and bold matching text and add to table
        function colorDosageFormsColumn() {
                for(let i = 0; i < answerDosageFormsIndex.length; i++) {
                    for(let j = 0; j < guessDosageForms.length; j++) {
                        if (answerDosageFormsIndex[i] === guessDosageForms[j]) {
                            columnDosageForms.style.backgroundColor = "#FFFF00"; /* yellow highlight */
                            spannedGuessDosageForms.splice(j, 1, '<span class="match">' + guessDosageForms[j] + '</span>') /* bold matching text and put back in cell */
                            columnDosageForms.innerHTML = spannedGuessDosageForms.join(", ");
                        } else {
                            columnDosageForms.innerHTML = spannedGuessDosageForms.join(", ");
                        }
                    }
                }
            };
    if (answerDrug === guessDrug) { /* correct guess and win game */
        modalCorrect.style.display = "block"; /* shows win modal */
        // prevents typing in input
        guessArea.disabled = true;
        guessArea.value = "";
        guessArea.placeholder = "Great job!";
        document.getElementById("correctAnswer").innerHTML =`${printAnswerDrug}`; /* puts answer on modal */
        // increases games played, games won and current streak stat and records how many guesses it took and saves them to local storage
        gamesPlayed++;
        gamesWon++;
        currentStreak++;
        currentGuessMax();
        localStorage.setItem('gamesPlayed', gamesPlayed);
        localStorage.setItem('gamesWon', gamesWon);
        localStorage.setItem('currentStreak', currentStreak);
        if (currentGuess === 1) {
            oneGuess++;
            localStorage.setItem('oneGuess', oneGuess);
            document.getElementById("one").innerHTML = oneGuess;
        } else if (currentGuess === 2) {
            twoGuesses++;
            localStorage.setItem('twoGuesses', twoGuesses);
            document.getElementById("two").innerHTML = twoGuesses;
        } else if (currentGuess === 3) {
            threeGuesses++;
            localStorage.setItem('threeGuesses', threeGuesses);
            document.getElementById("three").innerHTML = threeGuesses;
        } else if (currentGuess === 4) {
            fourGuesses++;
            localStorage.setItem('fourGuesses', fourGuesses);
            document.getElementById("four").innerHTML = fourGuesses;
        } else if (currentGuess === 5) {
            fiveGuesses++;
            localStorage.setItem('fiveGuesses', fiveGuesses);
            document.getElementById("five").innerHTML = fiveGuesses;
        } else if (currentGuess === 6) {
            sixGuesses++;
            localStorage.setItem('sixGuesses', sixGuesses);
            document.getElementById("six").innerHTML = sixGuesses;
        } else if (currentGuess === 7) {
            sevenGuesses++;
            localStorage.setItem('sevenGuesses', sevenGuesses);
            document.getElementById("seven").innerHTML = sevenGuesses;
        } else if (currentGuess === 8) {
            eightGuesses++;
            localStorage.setItem('eightGuesses', eightGuesses);
            document.getElementById("eight").innerHTML = eightGuesses;
        }
        record();
        // updates stats to new stats after win
        document.getElementById("games-played").innerHTML = JSON.parse(localStorage.getItem('gamesPlayed'));
        document.getElementById("current-streak").innerHTML = currentStreak;
        document.getElementById("max-streak").innerHTML = JSON.parse(localStorage.getItem('maxStreak'));
        document.getElementById("win-percentage").innerHTML = (gamesWon / gamesPlayed * 100).toPrecision(3) + "%";
        graphHeights();
        // turns final row all green and bold
        columnGuess.style.backgroundColor = "#00B140";
        columnGuess.innerHTML = spannedGuessDrug.join("");
        columnGuess.style.fontWeight = "bolder";
        columnClass.style.backgroundColor = "#00B140";
        columnClass.innerHTML = spannedGuessClass.join("");
        columnClass.style.fontWeight = "bolder";
        columnIndication.style.backgroundColor = "#00B140";
        columnIndication.innerHTML = spannedGuessIndication.join("");
        columnIndication.style.fontWeight = "bolder";
        columnDosageForms.style.backgroundColor = "#00B140";
        columnDosageForms.innerHTML = spannedGuessDosageForms.join(", ");
        columnDosageForms.style.fontWeight = "bolder";
        
        row.style.display = "table-row";
        // makes image hint button display win modal
        btnImage.onclick = function() {
            modalCorrect.style.display = "block";
            correctStatus.addEventListener("animationend", function() {
                modalCorrect.style.display = "block";
            });
        };
        localStorage.setItem('winToday', 'yes');
    } else if (currentGuess === 8) { /* all guesses used, lose game */
        modalGameOver.style.display = "block"; /* shows game over modal */
        // prevents typing in input
        guessArea.disabled = true;
        guessArea.value = "";
        guessArea.placeholder = "Try again tomorrow!";
        document.getElementById("wrongAnswer").innerHTML =`${printAnswerDrug}` + " was the correct answer"; /* puts answer on modal */
        // increases games played stat, resets current streak stat, and saves record to local storage
        gamesPlayed++;
        localStorage.setItem('gamesPlayed', gamesPlayed);
        localStorage.setItem('currentStreak', 0);
        record();
        // updates stats on modals
        document.getElementById("games-played").innerHTML = JSON.parse(localStorage.getItem('gamesPlayed'));
        document.getElementById("current-streak").innerHTML = 0;
        document.getElementById("max-streak").innerHTML = JSON.parse(localStorage.getItem('maxStreak'));
        document.getElementById("win-percentage").innerHTML = (gamesWon / gamesPlayed * 100).toPrecision(3) + "%";
        //shows how much of final guess was correct or matched
        colorDrugColumn();
        colorClassColumn();
        colorIndicationColumn();
        colorDosageFormsColumn();
        columnGuess.innerHTML = spannedGuessDrug.join("");
        columnClass.innerHTML = spannedGuessClass.join("");
        columnIndication.innerHTML = spannedGuessIndication.join("");
        columnDosageForms.innerHTML = spannedGuessDosageForms.join(", ");
        
        currentGuessMax();
        // makes image hint button show game over modal
        btnImage.onclick = function() {
            modalGameOver.style.display = "block";
            gameOverStatus.addEventListener("animationend", function() {
                modalGameOver.style.display = "block";
            });
        };
    } else { /* use a guess and go to next turn */
        currentGuess++; /* indicates next turn */
        guessArea.placeholder = "Guess " + `${currentGuess}` + " of 8"; /* placeholder text for input so player can track their turn */
        guessArea.value = ""; /* empties input for next turn */
        // colors cells and bold text based on complete or partial matches
        colorDrugColumn();
        if (JSON.stringify(answerClassIndex) === JSON.stringify(guessClass)) {
            columnClass.style.backgroundColor = "#00B140";
            columnClass.innerHTML = spannedGuessClass.join("");
            columnClass.style.fontWeight = "bolder";
        } else {
            colorClassColumn();
        }
        if (JSON.stringify(answerIndicationIndex) === JSON.stringify(guessIndication)) {
            columnIndication.style.backgroundColor = "#00B140";
            columnIndication.innerHTML = spannedGuessIndication.join("");
            columnIndication.style.fontWeight = "bolder";
        } else {
        colorIndicationColumn();
        }
        if (JSON.stringify(answerDosageFormsIndex) === JSON.stringify(guessDosageForms)) {
            columnDosageForms.style.backgroundColor = "#00B140";
            columnDosageForms.innerHTML = spannedGuessDosageForms.join(", ");
            columnDosageForms.style.fontWeight = "bolder";
        } else {
        colorDosageFormsColumn();
        }
        currentGuessMax();
    }
    table.style.display = "block"; /* shows table so headers appear with first guess */
    table.scrollTo(0, table.scrollHeight); /* scrolls to top of table */
    // as long as game is still going, saves how big the table is
    if (tableCounter < 9) {
        tableCounter++;
        localStorage.setItem('tableCounter',tableCounter);
    };
    // saves table state to local storage so player can resume on coming back to site */
    localStorage.setItem("table", JSON.stringify(document.getElementById("table").innerHTML));
}

function checkGuessUnlimited() {
    let guess = guessArea.value;
    let guessIndexNumber = listDrugs.indexOf(guess); /* Array index number of guess */
    let guessDrug = drugs[guessIndexNumber]; /* array of guess drug name */
    let spannedGuessDrug = guessDrug.slice(0); /* copy of guessDrug array to span matches */
    let guessClass = drugClass[guessIndexNumber]; /* array of guess drug class */
    let spannedGuessClass = guessClass.slice(0); /* copy of guessClass array to span matches */
    let guessIndication = drugIndication[guessIndexNumber]; /* array of guess drug indication */
    let spannedGuessIndication = guessIndication.slice(0); /* copy of guessIndication array to span matches */
    let guessDosageForms = drugDosageForms[guessIndexNumber]; /*array of guess dosage forms */
    let spannedGuessDosageForms = guessDosageForms.slice(0); /* copy of guessDosageForms array to span matches */

    // all rows and columns are already made, this changes the content based on which guess the game is on
    let row = document.getElementById("row-" + `${currentGuessUnlimited}`);
    let columnGuess = document.getElementById("nameCell-" + `${currentGuessUnlimited}`);
    let columnClass = document.getElementById("classCell-" + `${currentGuessUnlimited}`);
    let columnIndication = document.getElementById("indicationCell-" + `${currentGuessUnlimited}`);
    let columnDosageForms = document.getElementById("dosageFormsCell-" + `${currentGuessUnlimited}`);
    
        // check drug name match, color and bold matching text and show row
    function colorDrugColumnUnlimited() {
            for(let i = 0; i < answerDrugUnlimited.length; i++) {
                for(let j = 0; j < guessDrug.length; j++) {
                    if (answerDrugUnlimited[i] === guessDrug[j] && answerDrugUnlimited[i] !== "/ " && guessDrug[j] !== "/ " && answerDrugUnlimited[i] !== " " && guessDrug[j] !== " ") {
                        columnGuess.style.backgroundColor = "#FFFF00"; /* yellow highlight */
                        spannedGuessDrug.splice(j, 1, '<span class="match">' + guessDrug[j] + '</span>') /* bold matching text and put back in cell */
                        columnGuess.innerHTML = spannedGuessDrug.join("");
                        row.style.display = "table-row"
                    } else {
                        columnGuess.innerHTML = spannedGuessDrug.join("");
                        row.style.display = "table-row"
                    }
                }
            }
        }
        //check class match, color and bold matching text and add to table
        function colorClassColumnUnlimited() {
                for(let i = 0; i < answerClassIndexUnlimited.length; i++) {
                    for(let j = 0; j < guessClass.length; j++) {
                        if (answerClassIndexUnlimited[i] === guessClass[j] && answerClassIndexUnlimited[i] !== "/ " && guessClass[j] !== "/ " && answerClassIndexUnlimited[i] !== " " && guessClass[j] !== " " && answerClassIndexUnlimited[i] !== "-" && guessClass[j] !== "-" && answerClassIndexUnlimited[i] !== "Blocker" && guessClass[j] !== "Blocker" && answerClassIndexUnlimited[i] !== "Antagonist" && guessClass[j] !== "Antagonist" && answerClassIndexUnlimited[i] !== "Agonist" && guessClass[j] !== "Agonist") {
                            columnClass.style.backgroundColor = "#FFFF00"; /* yellow highlight */
                            spannedGuessClass.splice(j, 1, '<span class="match">' + guessClass[j] + '</span>') /* bold matching text and put back in cell */
                            columnClass.innerHTML = spannedGuessClass.join("");
                        } else {
                            columnClass.innerHTML = spannedGuessClass.join("");
                        }
                    }
                }
            }
        //check indication match, color and bold matching text and add to table
        function colorIndicationColumnUnlimited() {
                for(let i = 0; i < answerIndicationIndexUnlimited.length; i++) {
                    for(let j = 0; j < guessIndication.length; j++) {
                        if (answerIndicationIndexUnlimited[i] === guessIndication[j] && answerIndicationIndexUnlimited[i] !== ", " && guessIndication[j] !== ", " && answerIndicationIndexUnlimited[i] !== " " && guessIndication[j] !== " " && answerIndicationIndexUnlimited[i] !== "/ " && guessIndication[j] !== "/ ") {
                            columnIndication.style.backgroundColor = "#FFFF00"; /* yellow highlight */
                            spannedGuessIndication.splice(j, 1, '<span class="match">' + guessIndication[j] + '</span>') /* bold matching text and put back in cell */
                            columnIndication.innerHTML = spannedGuessIndication.join("");
                            
                        } else {
                            columnIndication.innerHTML = spannedGuessIndication.join("");
                        }
                    }
                }
            }
        // check dosage form match, color and bold matching text and add to table
        function colorDosageFormsColumnUnlimited() {
                for(let i = 0; i < answerDosageFormsIndexUnlimited.length; i++) {
                    for(let j = 0; j < guessDosageForms.length; j++) {
                        if (answerDosageFormsIndexUnlimited[i] === guessDosageForms[j]) {
                            columnDosageForms.style.backgroundColor = "#FFFF00"; /* yellow highlight */
                            spannedGuessDosageForms.splice(j, 1, '<span class="match">' + guessDosageForms[j] + '</span>') /* bold matching text and put back in cell */
                            columnDosageForms.innerHTML = spannedGuessDosageForms.join(", ");
                        } else {
                            columnDosageForms.innerHTML = spannedGuessDosageForms.join(", ");
                        }
                    }
                }
            };
    if (answerDrugUnlimited === guessDrug) { /* correct guess and win game */
        modalCorrect.style.display = "block"; /* shows win modal */
        // prevents typing in input
        guessArea.disabled = true;
        guessArea.value = "";
        guessArea.placeholder = "Great job!";
        document.getElementById("correctAnswer").innerHTML =`${printAnswerDrugUnlimited}`; /* puts answer on modal */
        // turns final row all green and bold
        columnGuess.style.backgroundColor = "#00B140";
        columnGuess.innerHTML = spannedGuessDrug.join("");
        columnGuess.style.fontWeight = "bolder";
        columnClass.style.backgroundColor = "#00B140";
        columnClass.innerHTML = spannedGuessClass.join("");
        columnClass.style.fontWeight = "bolder";
        columnIndication.style.backgroundColor = "#00B140";
        columnIndication.innerHTML = spannedGuessIndication.join("");
        columnIndication.style.fontWeight = "bolder";
        columnDosageForms.style.backgroundColor = "#00B140";
        columnDosageForms.innerHTML = spannedGuessDosageForms.join(", ");
        columnDosageForms.style.fontWeight = "bolder";
        row.style.display = "table-row";
        // makes image hint button display win modal
        btnImage.onclick = function() {
            modalCorrect.style.display = "block";
            correctStatus.addEventListener("animationend", function() {
                modalCorrect.style.display = "block";
            });
        };
    } else if (currentGuessUnlimited === 8) { /* all guesses used, lose game */
        modalGameOver.style.display = "block"; /* shows game over modal */
        // prevents typing in input
        guessArea.disabled = true;
        guessArea.value = "";
        guessArea.placeholder = "Refresh and try again!";
        document.getElementById("wrongAnswer").innerHTML =`${printAnswerDrugUnlimited}` + " was the correct answer"; /* puts answer on modal */
        //shows how much of final guess was correct or matched
        colorDrugColumnUnlimited();
        colorClassColumnUnlimited();
        colorIndicationColumnUnlimited();
        colorDosageFormsColumnUnlimited();
        columnGuess.innerHTML = spannedGuessDrug.join("");
        columnClass.innerHTML = spannedGuessClass.join("");
        columnIndication.innerHTML = spannedGuessIndication.join("");
        columnDosageForms.innerHTML = spannedGuessDosageForms.join(", ");
        
        // makes image hint button show game over modal
        btnImage.onclick = function() {
            modalGameOver.style.display = "block";
            gameOverStatus.addEventListener("animationend", function() {
                modalGameOver.style.display = "block";
            });
        };
    } else { /* use a guess and go to next turn */
        currentGuessUnlimited++; /* indicates next turn */
        guessArea.placeholder = "Guess " + `${currentGuessUnlimited}` + " of 8"; /* placeholder text for input so player can track their turn */
        guessArea.value = ""; /* empties input for next turn */
        // colors cells and bold text based on complete or partial matches
        colorDrugColumnUnlimited();
        if (JSON.stringify(answerClassIndexUnlimited) === JSON.stringify(guessClass)) {
            columnClass.style.backgroundColor = "#00B140";
            columnClass.innerHTML = spannedGuessClass.join("");
            columnClass.style.fontWeight = "bolder";
        } else {
            colorClassColumnUnlimited();
        }
        if (JSON.stringify(answerIndicationIndexUnlimited) === JSON.stringify(guessIndication)) {
            columnIndication.style.backgroundColor = "#00B140";
            columnIndication.innerHTML = spannedGuessIndication.join("");
            columnIndication.style.fontWeight = "bolder";
        } else {
        colorIndicationColumnUnlimited();
        }
        if (JSON.stringify(answerDosageFormsIndexUnlimited) === JSON.stringify(guessDosageForms)) {
            columnDosageForms.style.backgroundColor = "#00B140";
            columnDosageForms.innerHTML = spannedGuessDosageForms.join(", ");
            columnDosageForms.style.fontWeight = "bolder";  
        } else {
        colorDosageFormsColumnUnlimited();
        }
    }
    if (tableCounterUnlimited < 9) {
        tableCounterUnlimited++;
    }
    table.style.display = "block"; /* shows table so headers appear with first guess */
    table.scrollTo(0, table.scrollHeight); /* scrolls to top of table */
};