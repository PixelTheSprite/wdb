var express 		= require('express'),
	methodOverride 	= require('method-override'),
	expressSanitizer = require('express-sanitizer'),
	app				= express(),
	bodyParser 		= require('body-parser'),
	mongoose 		= require('mongoose');

//APP CONFIG
mongoose.connect('mongodb://localhost/restful_blog_app', {useNewUrlParser: true, useUnifiedTopology: true});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: {type: String, default: "https://media.wired.com/photos/5cdefc28b2569892c06b2ae4/master/w_2560%2Cc_limit/Culture-Grumpy-Cat-487386121-2.jpg"},
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model('Blog', blogSchema);
// Blog posts will have 
//title, image, body, and created date
// Blog.create({
// 	title: "Test Blog",
// 	image: 'https://unsplash.com/photos/qO-PIF84Vxg',
// 	body: 'Hello this is a blog post!'
// })
//RESTFUL ROUTES

app.get('/', function(req, res){
	res.redirect('/blogs');
});

//INDEX Route
app.get('/blogs', function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		} else {
			res.render('index', {blogs: blogs});
		}
	});
});

//NEW Route
app.get('/blogs/new', function(req, res){
	res.render('new');
});

//CREATE Route
app.post('/blogs', function(req, res){
	//create blog
	console.log(req.body);
	req.body.blog.body = req.sanitize(req.body.blog.body);
	console.log('==========');
	console.log(req.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render('new');
		}else {
			//redirect
			res.redirect('/blogs');
		}
	});
});

//SHOW Route
app.get('/blogs/:id', function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect('/blogs');
		} else {
			res.render('show', {blog: foundBlog});
		}
	});
	// res.send('SHOW PAGE!');
});

//EDIT Route
app.get('/blogs/:id/edit', function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect('/blogs');
		} else {
			res.render('edit', {blog: foundBlog});
		}
	})
});

// UPDATE Route
app.put('/blogs/:id', function(req, res){
	
	console.log(req.body);
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs/'+ req.params.id);
		}
	});
	// res.send('UPDATE ROUTE!');
})

//DELETE Route
app.delete('/blogs/:id', function(req, res){
	// res.send('You have reached the Destroy Route');
	//destroy blog
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs');
		}
	})
	//redirect somewhere
});

app.listen(3000 || process.env.PORT, process.env.IP, function(){
	console.log('Server is running!');
})