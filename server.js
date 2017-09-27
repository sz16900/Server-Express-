var words = {
	"flowers": 5,
	"obama": 3,
	"trump": -5 //sad word
}


console.log("Hello World");

var express = require('express');

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
		reply = {
		msg: "Score is required!"
		}
	} 
	else {
		// word is the key score is the value
		words[word] = score;
		reply = {
		msg: "Thank you for your word"
		}
	}

	response.send(reply);	
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
