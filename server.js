// Import the file system packages
var fs = require('fs');
// Import express
var express = require('express');

// raw data
// Use a synchronus or "block" to wait for this to finish to continue. This is helpful
// at the start of the server because we want all of the file to load before continuing
var data = fs.readFileSync('words.json');

// parse it to json
var words = JSON.parse(data);

console.log("Hello World");

var app = express();

var server = app.listen(3000, listening);

function listening() {
	console.log("Listening...")
}

app.use(express.static('public'));


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
		words[word] = score;
		// Turn it into a string 
		var data = JSON.stringify(words, null, 2);
		// write too file ( all of it :/ )
		fs.writeFile('words.json', data, finished);

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
	response.send(words); 
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
