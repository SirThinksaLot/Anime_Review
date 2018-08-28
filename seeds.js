var mongoose = require("mongoose");
var	Campground = require("./models/campgrounds");
var Comment = require("./models/comment");
var data = [{
	name:"Steins Gate",
	image:"https://otakukart.com/wp-content/uploads/2018/03/bg_hero00.jpg",
	description:"An alternate ending to Steins;Gate that leads with the eccentric mad scientist Okabe, struggling to recover from a failed attempt at rescuing Kurisu. He decides to give up and abandons his lively scientist alter ego, in pursuit to forget the past. When all seems to be normal, he is seemingly pulled back into the past by meeting an acquaintance of Kurisu, who tells him that they have begun testing a device that stores the memory of a human and creates a simulation of them with their characteristics and personalities. Okabe begins testing and finds out that the simulation of Kurisu has brought back anguish and some new unexpected tragedies..."
	},
	{
	name:"Gintama",
	image:"https://images2.alphacoders.com/928/thumb-1920-928475.jpg",
	description:"Gintama is a story of a handyman named Gintoki, a samurai with no respect for rules set by the invaders, who's ready to take any job to survive."

	},

	{
		name:"Monogatari",
		image:"https://images3.alphacoders.com/715/thumb-1920-715278.png",
		description:"The bee apparition is now gone, and summer vacation where the phoenix apparition averted harm is over. Around Koyomi Araragi and the girls who started a new trimester, apparitions, or perhaps threats even worse, were creeping in ever closer. Tsubasa Hanekawa, Mayoi Hachikuji, Suruga Kanbaru, Nadeko Sengoku, Shinobu Oshino, and Hitagi Senjogahara. Their soliloquies, confessions—and farewells. 6 new stories are starting now."
	}

];


function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}



module.exports = seedDB;