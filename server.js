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
// Tghe first slash is a rounte, the after colon is a parameter that the user enters

app.get('/search/:flower/:num', sendFlower); 

function sendFlower(request, response){

	var data = request.params;
	var num = data.num;
	var reply = "";
	for (var i = 0; i < num; i++){
		reply += ("I love " + data.flower + " too!");
	}
	response.send(reply);	
}



