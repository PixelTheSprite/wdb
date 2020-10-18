var express 	= require('express'),
	app 		= express(),
	bodyParser 	= require('body-parser'),
	mongoose 	= require('mongoose'),
	Campground	= require('./models/campground'),
	Comment		= require('./models/comment'),
	seedDB		= require('./seeds');

seedDB();
// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

//SCHEMA SETUP

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
			res.render('campgrounds/index', {campgrounds:allCampgrounds});
		}
	})
});

//CREATE - add new campground to database
app.post('/campgrounds', function(req, res){
	//get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;

	var newCampground = {name: name, image: image, description: desc}
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
	res.render('campgrounds/new');
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
	if(err){
			console.log(err);
		} else {
			// console.log(foundCampground);
			//render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
	// res.send('THIS WILL BE THE SHOW PAGE ONE DAY');
});

//================================
//	Comments Routes
//================================

app.get('/campgrounds/:id/comments/new', function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render('comments/new', {campground: campground});
		}
	})
});

app.post('/campgrounds/:id/comments', function(req, res){
	//lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log('Cannot find campground!');
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			// console.log(req.body.comment);
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log("Error adding comment to DB!");
					console.log(err);
				} else {
					// console.log('Campground is ' + campground);
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
	//create new comments
	//connect new comment to campground
	//redirect to campground show page
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log('The YelpCamp server has started!');
});