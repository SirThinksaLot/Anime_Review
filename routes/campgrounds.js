
var express = require("express");
var router  = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");


//INDEx-show all campground

router.get("/",function(req,res){
	res.render("LandingPage");
});


router.get("/index",function(req,res){
	//Get all campgrounds from DB
	Campground.find({},function(err,allcampgrounds){
		if(err)
		{
			console.log(err);
		} else{
			res.render("campgrounds/index",{campgrounds:allcampgrounds});
		}
	});
	//res.render("campgrounds",{campgrounds:campgrounds});

});
//NEW ROUTE
router.get("/index/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});
//CREATE ROUTE 
router.post("/index",middleware.isLoggedIn,function(req,res){
	//get data from form and add it to campground array
	//redirect back to cmapgorund page
	var name  = req.body.cname;
	var image = req.body.cimage;
	var desc  = req.body.cdescription;
	var author = {
		id:req.user._id,
		username:req.user.username
	}
	var newCampground = {name:name,image:image,description:desc,author:author};
	//Create a newcampground and save to databse
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/index");
		}
	});


	});
//SHOW Route 
router.get("/index/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,findCampground){
		if(err){
			console.log(err);
		}else{
			console.log(findCampground);
		res.render("campgrounds/show",{campground:findCampground});
		}
	});
	//Find the campground with provided ID
	
});

//==================================
//EDIT ROUTE
//==================================
router.get("/index/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err)
		{	
			req.flash("error","Anime not found");
			console.log(err);
		}
		else{
				res.render("campgrounds/edit",{campground:foundCampground});
		}
	})
	
});
//==================================
//UPDATE ROUTE
//==================================
router.put("/index/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,UpdatedCampground){
		if(err)
		{
			console.log(err);
		}
		else{
				res.redirect("/index/"+req.params.id);
		}
	});
});

//===================================
//DESTROY  ROUTE
//===================================
router.delete("/index/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/index");
		}
	});
});








module.exports = router;

