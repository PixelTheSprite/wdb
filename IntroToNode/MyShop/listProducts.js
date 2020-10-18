var faker = require('faker');

function listProducts(){
	console.log("===================");
	console.log("WELCOME TO MY SHOP!");
	console.log("===================");
	
	for(var i=0; i<10;i++){
		console.log(faker.fake("{{commerce.productName}}") + " - $" + faker.fake("{{commerce.price}}"));
	}
}

listProducts();