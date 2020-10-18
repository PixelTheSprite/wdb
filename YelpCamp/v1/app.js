var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgrounds = [
		{name: "Salmon Creek", image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e507440762679d6934cc1_340.jpg"},
		{name: "Granite Hill", image:"https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name: "Mountain Goat's Rest", image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name: "Salmon Creek", image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e507440762679d6934cc1_340.jpg"},
		{name: "Granite Hill", image:"https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name: "Mountain Goat's Rest", image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name: "Salmon Creek", image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e507440762679d6934cc1_340.jpg"},
		{name: "Granite Hill", image:"https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name: "Mountain Goat's Rest", image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"}
	];

app.get('/', function(req, res){
	res.render('landing');
});

app.get('/campgrounds', function(req, res){
	
	res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
	//get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground);
	//redirect back to campground page
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
	res.render('new');
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log('The YelpCamp server has started!');
});