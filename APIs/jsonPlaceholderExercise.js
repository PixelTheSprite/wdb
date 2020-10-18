const request = require('request');
const rp = require('request-promise');

request('https://jsonplaceholder.typicode.com/users/1', function(error, response, body){
	// eval(require('locus'))
	if(!error && response.statusCode == 200){
		const parsedData = JSON.parse(body);
		console.log(parsedData.name + ' lives in ' + parsedData.address.city);
	}
});

rp('https://jsonplaceholder.typicode.com/users/1')
	.then(function(htmlstring){
	console.log(htmlstring);
})
.catch(function(err){
	console.log('Error!', err);
});