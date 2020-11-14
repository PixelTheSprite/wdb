var express = require('express');

var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');


//INDEX Route - get all campgrounds
router.get('/', function(req, res){
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
router.post('/', middleware.isLoggedIn, function(req, res){
	//get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	
	var newCampground = {name: name, image: image, description: desc, author:author}
	console.log(req.user);
	//Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);	
		} else {
				console.log(newlyCreated);
				res.redirect('/campgrounds');
		}
	})
	//redirect back to campground page
});

//NEW - form to create a new campground
router.get('/new', middleware.isLoggedIn, function(req, res){
	res.render('campgrounds/new');
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
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

//EDIT Campground Route
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			req.flash("error", "Campground not found!");
		}
		res.render("campgrounds/edit", {campground: foundCampground});
	});
})

//Update Campground Route
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect('/campgrounds');
		} else {
			//redirect somewhere (show page)
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
})

//DESTROY CAMPGROUND PAGE
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds');
		}
	})
	// res.send('You are trying to delete something!');
});

// //middleware
// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect('/login');
// };

// function checkCampgroundOwnership(req, res, next){
// 	//is user logged in
// 		if(req.isAuthenticated()){
// 			Campground.findById(req.params.id, function(err, foundCampground){
// 				if(err){
// 					res.redirect("back");
// 				} else {
// 						//if user is logged in, does user own campground?
// 						if(foundCampground.author.id.equals(req.user._id)){
// 							//if so, run this code
// 							// res.render("campgrounds/edit", {campground: foundCampground});
// 							next();
// 						}	else {
// 							// res.send('You do not have permission to do that!');
// 							res.redirect("back");
// 						}
// 				}
// 			});
// 		} else {
// 			// //if not, redirect somewhere
// 			// console.log('You need to be logged in to do that!!!');
// 			// res.send('You need to be logged in to do that!');
// 			res.redirect("back");
// 		}
// }

module.exports = router;

