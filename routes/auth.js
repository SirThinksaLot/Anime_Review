var express = require("express");
var router = express.Router();
var passport 	   = require("passport");
var User = require("../models/user");

//========================
// AUTH ROUtES
//========================


router.get("/register",function(req,res){
	res.render("register");
});


router.post("/register",function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			console.log(err);
			res.redirect("register");
		}
	
			passport.authenticate('local')(req,res,function(){
				req.flash("success","Logged In");
				res.redirect("/index");
			});
		});
	});

 


//==============================
//Show login forms
//==============================
router.get("/login",function(req,res){
	res.render("login");

});


router.post('/login',passport.authenticate("local",{
	successRedirect:"/index",
	failureRedirect:"/login"
}),function(req,res){
});

//===============
//logout

router.get("/logout",function(req,res){
	req.logout();
	req.flash("error","Logged you out");
	res.redirect("/index");
})


function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

module.exports = router;


