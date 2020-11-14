#YelpCamp

* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
* Name
* Image

[
	{name:"Salmon Creek", image: "http://www.image.com"},
	{name:"Salmon Creek", image: "http://www.image.com"},
	{name:"Salmon Creek", image: "http://www.image.com"},
	{name:"Salmon Creek", image: "http://www.image.com"},
	{name:"Salmon Creek", image: "http://www.image.com"}
]

RESTFUL ROUTES

name	url			verb	description	
==================================================
INDEX 	/dogs		GET		Display a list of all dogs
NEW		/dogs/new	GET		Displays form to make a new dog
CREATE	/dogs		POST	Add new dog to DB
SHOW	/dogs/:id	GET		Shows info about one dog