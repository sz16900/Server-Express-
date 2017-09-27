function setup() {
	createCanvas(400, 400);
	drawData();
	console.log("running");

	var button = select('#submit');
	button.mousePressed(submitWord);
}

function drawData() {
	// p5 seems to be querying from the website to the server. Both seem to be runnning simultaneously
	loadJSON("all", gotData);
}

function submitWord() {
	var word = select('#word').value();
	var score = select('#score').value();
	console.log(word, score);

	// This is weird. No GET or POST!! Out of convinience. 
	loadJSON('add/' + word + '/' + score, finished);

	function finished(data) {
		console.log(data);
		drawData();
	}
}


function gotData(data) {
	background(51);
	console.log(data);
	var keys = Object.keys(data);
	for (i = 0; i < keys.length; i++) {
		var word = keys[i];
		var score = data[word];
		var x = random(width);
		var y = random(height);
		fill(255);
		textSize(16);
		text(word, x, y);
	}
}