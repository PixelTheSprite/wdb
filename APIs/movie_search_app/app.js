var express = require('express');
var app = express();
var request = require('request');

const axios = require('axios');

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('search');
})

// app.get('/results', function(req, res){
// 	var query = req.query.searchTerm;
// 	request(`http://omdbapi.com/?s=${query}&apikey=thewdb`, function(error, response, body){
// 		if(!error && response.statusCode == 200){
// 		const data = JSON.parse(body);
// 		// res.send(parsedData['Search'][0]['Title']);
// 		res.render('results', {data: data});
// 	}
// 	});
// 	// res.send('Hello, it works!');
// });

//refactor using axios
app.get('/results', function(req, res){
	var query = req.query.searchTerm;
	axios.get(`http://omdbapi.com/?s=${query}&apikey=thewdb`)
	.then(function(response){
		console.log(response.data);
		// const data = JSON.parse(response.data);
		// res.send(parsedData['Search'][0]['Title']);
		res.render('results', {data: response.data})
	})
	.catch(function(error){
		console.log("You've encountered an error!");
		console.log(error);
	})
});

app.listen(3000 || process.env.PORT, process.env.IP, function(){
	console.log('Server has started!');
})