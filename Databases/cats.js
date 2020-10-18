const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cat_app', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

let catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

let Cat = mongoose.model('Cat', catSchema);

// Cat.find
// Cat.create
// Cat.remove
//etc...

//add a new cat to the database
// let george = new Cat({
// 	name: 'Mrs. Norris',
// 	age: 7,
// 	temperament: 'evil'
// });

// george.save(function(err, cat){
// 	if(err){
// 		console.log('Something went wrong!');
// 	}else {
// 		console.log('We just saved a cat to the database!');
// 		console.log(cat);
// 	}
// })

Cat.create({
	name: 'Snow White',
	age: 15,
	temperament: 'bland'
}, function(err, cat){
	if(err){
		console.log(err);
	} else {
		console.log(cat);	
	}
})

//retrieve all cats from the DB and console.log each one
Cat.find({}, function(err, cats){
	if(err){
		console.log('Oh no, error!');
		console.log(err);
	}else{
		console.log('All the cats.......');
		console.log(cats);
	}
});