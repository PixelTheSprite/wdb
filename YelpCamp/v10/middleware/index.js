var Campground = require('../models/campground');
var Comment = require('../models/comment');

// all the middleware goes here

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	//is user logged in
		if(req.isAuthenticated()){
			Campground.findById(req.params.id, function(err, foundCampground){
				if(err){
					res.redirect("back");
				} else {
						//if user is logged in, does user own campground?
						if(foundCampground.author.id.equals(req.user._id)){
							//if so, run this code
							// res.render("campgrounds/edit", {campground: foundCampground});
							next();
						}	else {
							// res.send('You do not have permission to do that!');
							res.redirect("back");
						}
				}
			});
		} else {
			// //if not, redirect somewhere
			// console.log('You need to be logged in to do that!!!');
			// res.send('You need to be logged in to do that!');
			res.redirect("back");
		}
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	//is user logged in
		if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id, function(err, foundComment){
				if(err){
					res.redirect("back");
				} else {
						//if user is logged in, does user own comment?
						if(foundComment.author.id.equals(req.user._id)){
							//if so, run this code
							// res.render("campgrounds/edit", {campground: foundCampground});
							next();
						}	else {
							// res.send('You do not have permission to do that!');
							res.redirect("back");
						}
				}
			});
		} else {
			// //if not, redirect somewhere
			// console.log('You need to be logged in to do that!!!');
			// res.send('You need to be logged in to do that!');
			res.redirect("back");
		}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
};

module.exports = middlewareObj;