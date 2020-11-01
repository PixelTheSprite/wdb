var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground'),
	Comment	=	require('../models/comment');

//================================
//	Comments Routes
//================================

//Comments New
router.get('/new', isLoggedIn, function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render('comments/new', {campground: campground});
		}
	})
});

//Comments Create
router.post('/', isLoggedIn, function(req, res){
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
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					// console.log('Campground is ' + campground);
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
	//create new comments
	//connect new comment to campground
	//redirect to campground show page
});

// COMMENT EDIT ROUTE
router.get('/:comment_id/edit', checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
		}
	})
});

// COMMENT UPDATE

router.put('/:comment_id', checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComments){
		if(err){
			res.redirect("back");
		} else {
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	})
	// res.send('You hit the update route.');
})

// COMMENT DESTROY ROUTE

router.delete('/:comment_id', checkCommentOwnership, function(req, res){
	//find by ID and remove
	// res.send('This is the destroy comment route.');
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect('back');
		} else {
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
});

//middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
};

function checkCommentOwnership(req, res, next){
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

module.exports = router;