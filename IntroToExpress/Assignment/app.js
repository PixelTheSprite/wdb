var express = require("express");
var app = express();

// Visiting "/" should print "Hi there, welcome to my assignment!"
app.get('/', function(req, res){
	res.send('Hi there, welcome to my assignment!');
});
//Visiting "/speak/pig" should print "The pig says 'Oink!'"
//Visiting "/speak/cow" should print "The cow says 'Moo!'"
//Visiting "/speak/dog" should print "The dog says 'Woof woof!'"
app.get('/speak/:animal', function(req, res){
	var sounds = {
		pig: 'Oink!',
		cow: 'Moo!',
		dog: 'Woof woof!',
		cat: 'I hate you human',
		goldfish: '...'
	}
	var animal = req.params.animal.toLowerCase();
	var message = sounds[animal];
	if(animal ==='pig'){
		message = 'Oink!';
	}else if(animal === 'cow'){
		message = 'Moo!';
	}else if(animal === 'dog'){
		message = 'Woof woof!';
	}
	res.send('The '+ animal + ' says "' + message + '"');
});
//Visiting "/repeat/hello/3" should print "hello hello hello"
//Visiting "/repeat/hello/5" should print "hello hello hello hello hello"
//Visiting "/repeat/blah/2" should print "blah blah"
app.get('/repeat/:message/:times', function(req, res){
	console.log(req.params);
	var text = req.params.message;
	var times = Number(req.params.times);
	var result = "";
	
	for(var i=1; i<times; i++){
		result += text + " ";
		// text = text.concat(' '+req.params.message);
	}
	
	res.send(result);
})
// If a user visits any other route, print:
//Sorry, page not found...What are you doing with your life?"
app.get('*', function(req, res){
	res.send('Sorry, page not found...What are you doing with your life?');
});


app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log('Server running on port 3000');
})