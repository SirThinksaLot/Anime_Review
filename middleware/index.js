var Campground = require("../models/campgrounds");

//All the middleware goes here

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
	if(req.isAuthenticated())
	{
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err)
			{
				res.redirect("back");
			}else
			{if(foundCampground.author.id.equals(req.user._id))
				{
					return next();
				}
				else
				{
					res.send("You do not have the permission to do that"); 
				}
			}
		}); 

	}else{
		res.redirect("back");
		console.log("You need to be logged in");
	}
				
				
};

middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated())
	{
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err)
			{	req.flash("error","Anime no found");
				res.redirect("back");
			}else
			{if(foundComment.author.id.equals(req.user._id))
				{
					return next();
				}
				else
				{
					req.flash("error","You do not have the permission to do that"); 
					res.redirect("back");
				}	
			}
		}); 

	}else{
		req.flash("error","You need to be logged in");
		res.redirect("back");
		
	}
				
				
};

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be logged in first");
	res.redirect("/login");
};


module.exports = middlewareObj;