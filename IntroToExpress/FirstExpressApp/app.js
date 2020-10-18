var express = require("express");
var app = express();

// "/" => "Hi there!"
//request & response
app.get('/', function(req, res){
	res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get('/bye', function(req, res){
	res.send("Goodbye!");
});

// "/dog" => "MEOW!"
app.get('/dog', function(req, res){
	res.send('MEOW!');
});

app.get('/r/:subredditName', function(req, res){
	var subreddit = req.params.subredditName;
	console.log(req.params);
	res.send('Welcome to the ' + subreddit.toUpperCase() +' subreddit!');
});

app.get('/r/:subredditName/comments/:id/:title', function(req, res){
	console.log(req.params);
	res.send('Welcome to a comments page');
});

//for anything not defined you can use this for an error page or something
app.get('*', function(req, res){
	res.send('You are a star!');
});

//Tell Express to listen for requests (start server)
// app.listen(proces.env.PORT, process.env.IP, function(){
// 	console.log("Server has started!!");
// });
app.listen(3000, function(){
	console.log('Server listening on port 3000');
})
