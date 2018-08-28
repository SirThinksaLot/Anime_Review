var express        = require("express");
var app            = express();
var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var flash		   = require("connect-flash");
var passport 	   = require("passport");
var LocalStrategy  = require("passport-local");
var methodOverride = require("method-override");
var Campground     = require("./models/campgrounds");
var Comment   	   = require("./models/comment");
var User   		   = require("./models/user"); 
	
var commentRoutes  = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var authRoutes		= require("./routes/auth");
var seedDB 		   = require("./seeds");

/*seedDB();*/
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use (flash());

//==========================
//PASSPORT CONFIGURATION====
//==========================

app.use(require("express-session")({
	secret:"Gintama is best",
	resave:false,
	saveUninitialized:false

})); 


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	return next();
});
 
app.use(authRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);





//SCHEMA SETUP

/*Campground.create(
	{
		 name:"Bleach",
		 image:"https://images4.alphacoders.com/579/thumb-1920-579285.jpg",
		 description:"Shit anime after the mastermindy guy is defeated"
	},function(err,campground){
		if(err)
		{
			console.log(err);
		}else{
			console.log("Newly created campground");
			console.log(campground);
		}
	});*/

app.listen(8000,function(){ 
	console.log("YelpCamp server");
}) ;
