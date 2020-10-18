var express 				= require('express'),
	mongoose 				= require('mongoose'),
	passport 				= require('passport'),
	bodyParser 				= require('body-parser'),
	User					= require('./models/user'),
	LocalStrategy 			= require('passport-local'),
	passportLocalMongoose 	= require('passport-local-mongoose');


mongoose.connect('mongodb://localhost/auth_demo_app', {useNewUrlParser: true, useUnifiedTopology: true});

var app = express();


app.use(require('express-session')({
	secret: 'The quick brown fox jumps over the lazy dog.',
	resave: false,
	saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//=================
// Routes
//=================

app.get('/', function(req, res){
	res.render('home');
});

app.get('/secret', isLoggedIn, function(req, res){
	res.render('secret');	
});

//Auth Routes

//show sign up form
app.get('/register', function(req, res){
	res.render('register');
});

//handling user signup
app.post('/register', function(req, res){
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render('register');
		}
		passport.authenticate('local')(req, res, function(){
			res.redirect('/secret');
		});
	})
});

//Login Routes
//render login form
//middleware - code that runs before the call is run. They sit between the beginning of your route and the end of your route
app.get('/login', function(req, res){
	res.render('login');
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/secret',
	failureRedirect: '/login'
}), function(req, res){
	
});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
	// res.send('OKAY, I WILL LOG YOU OUT. ')
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log('server started.....');
});