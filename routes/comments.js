var express = require("express");
var router = express.Router();
var passport 	   = require("passport");
var LocalStrategy  = require("passport-local");
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//======================================
	//NEW ROUTE FOR COMMENT
//=======================================	

router.get("/index/:id/comments/new",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground:campground});
		}
	})
	
	
});

//========================================
//	POST ROUTE FOR COMMENTS
//=======================================

router.post("/index/:id/comments",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			req.flash("error","Something went wrong");   
			console.log(err);
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					req.flash("error","Something went wrong");
					console.log(err);
				}
				else{
					//add username and id to comment
					comment.author.id  = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Successfully added");
					res.redirect("/index/"+ campground.id);
				}
			});
		}
	});
 });
//================================
//Comments Edit
//================================
router.get("/index/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
		}
	});
	
});
//======================================
//Comments Update
//======================================

router.put("/index/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/index/"+req.params.id);
		}
	})
});
//=========================================
//COMMENTS DELTE
//===========================================
router.delete("/index/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err)
		{
			res.redirect("back");
		}else{
			req.flash("success","Deleted succesfully");
			res.redirect("/index  /"+ req.params.id);
		}
	})
});






module.exports = router;