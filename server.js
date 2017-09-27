// TO DO:
// Take this idea further by allowing training sets.
// Animations.
// Interactions how to crowdsource a full word list. Show results in word list with animation.
// Use CORS to let other people use this API.

//Borrowed seriment from:
// http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010
// Using Body-Parser from npm

// Import the file system packages
var fs = require('fs');
// Import express
var express = require('express');
//Import body-parser
var bodyParser = require('body-parser');

// raw data
// Use a synchronus or "block" to wait for this to finish to continue. This is helpful
// at the start of the server because we want all of the file to load before continuing
var data = fs.readFileSync('additional.json');
var afinndata = fs.readFileSync('AFINN-111.json');

// parse it to json
var additional = JSON.parse(data);
// console.log(data);
var afinn = JSON.parse(afinndata);

console.log("Hello World");

// An express application which is listening on this port
var app = express();

var server = app.listen(3000, listening);

function listening() {
	console.log("Listening...")
}

// Uses static hosting on the public folder
app.use(express.static('public'));

//Parse Everythn as JSON
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.post('/analyze', analyzeThis);

function analyzeThis(request, response) {
	var totalScore = 0;
	var wordList = [];
	//Get the request. Get the body. Get the text.
	var txt = request.body.text;
	// Split only words by anything not a letter or number batter matching. Not A-Z 0-9
	var words = txt.split(/\W+/);
	for (var i = 0; i < words.length; i++) {
		var word = words[i];
		var score = 0;
		var found = false;
		if (additional.hasOwnProperty(word)) {
			score = Number(additional[word]);
			found = true;
		}
		else if (afinn.hasOwnProperty(word)) {
			score = Number(afinn[word]);
			found = true;
		}
		if (found) {
			wordList.push({
				word: word,
				score: score
			})
		}
		totalScore += score;
	}

	var comp = totalScore / words.length;

	var reply = {
		score: totalScore,
		comparative: comp,
		words: wordList
	}
	response.send(reply);
}


// If a user (or web browser) uses \flower, the the sendFlower function gets executed
// That is the callback
// The first slash is a route, the after colon is a parameter that the user enters
// Use the "?" to make the LAST parameter optional (im sure there are fancy ways around not only using the last)

app.get('/add/:word/:score?', addWord); 

function addWord(request, response) {

	var data = request.params;
	var word = data.word;
	var score = Number(data.score);
	var reply;

	if (!score) {
		var reply = {
		msg: "Score is required!"
		}
		response.send(reply);	
	} 
	else {
		// word is the key score is the value
		additional[word] = score;
		// Turn it into a string 
		var data = JSON.stringify(additional, null, 2);
		// write too file ( all of it :/ )
		var data = fs.readFileSync('additional.json');

		function finished(err) {
			reply = {
				word: word,
				score: score,
				status: "success"		
			}
			response.send(reply);
		}
	}
}


app.get('/all', sendAll);

// Express will automatically format your javascript object that you send into the world as json
function sendAll(request, response) {
	var data = {
		additional: additional,
		afinn: afinn
	}
	response.send(data); 
}

app.get('/search/:word/', searchWord);

function searchWord(request, response) {
	var word = request.params.word;
	var reply;
	if (words[word]) {
		reply = {
			status: "found",
			word: word,
			score: words[word]
		}
	}
	else {
		reply = {
			status: "Not found",
			word: word
		}
	}
	response.send(reply);
} 
