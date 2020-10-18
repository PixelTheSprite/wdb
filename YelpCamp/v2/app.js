var express 	= require('express'),
	app 		= express(),
	bodyParser 	= require('body-parser'),
	mongoose 	= require('mongoose');

// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Granite Hill",
// 	 	image:"https://www.oregonlive.com/resizer/0FVk7bpZHdb--Lw10Y-443t0ylM=/450x0/smart/arc-anglerfish-arc2-prod-advancelocal.s3.amazonaws.com/public/DUNWFNGOAVCRLAHO4ZPTBKNJEM.jpg",
// 		description: 'This is a huge granite hill, no bathrooms. No water. Beautiful granite!'
// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log('Newly created campground: ');
// 			console.log(campground);
// 		}
// 	});

// var campgrounds = [
// 		{name: "Salmon Creek", image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e507440762679d6934cc1_340.jpg"},
// 		{name: "Granite Hill", image:"https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 		{name: "Mountain Goat's Rest", image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 		{name: "Salmon Creek", image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e507440762679d6934cc1_340.jpg"},
// 		{name: "Granite Hill", image:"https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 		{name: "Mountain Goat's Rest", image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 		{name: "Salmon Creek", image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e507440762679d6934cc1_340.jpg"},
// 		{name: "Granite Hill", image:"https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350"},
// 		{name: "Mountain Goat's Rest", image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"}
// 	];

app.get('/', function(req, res){
	res.render('landing');
});


//INDEX Route - get all campgrounds
app.get('/campgrounds', function(req, res){
	//Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render('index', {campgrounds:allCampgrounds});
		}
	})
	// res.render('campgrounds', {campgrounds: campgrounds});
});

//CREATE - add new campground to database
app.post('/campgrounds', function(req, res){
	//get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;

	var newCampground = {name: name, image: image, description: desc}
	// campgrounds.push(newCampground);
	//Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);	
		} else {
				res.redirect('/campgrounds');
		}
	})
	//redirect back to campground page
});

//NEW - form to create a new campground
app.get('/campgrounds/new', function(req, res){
	res.render('new');
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			//render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});
	// res.send('THIS WILL BE THE SHOW PAGE ONE DAY');
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log('The YelpCamp server has started!');
});