var User=require('../models/user');

var config=require('../../config');

var secretKey=config.secretkey;

var jsonwebtoken=require('jsonwebtoken');


function createToken(user){

	var token=jsonwebtoken.sign({
		_id:user._id,
		name:user.name,
		username:user.username

	},secretKey,{
		 expiresIn : 1440 
	});
	return token;
}

module.exports=function  (app,express) {

var api=express.Router();

api.post('/signup',function(req,res){

	var user=new User({
		name:req.body.name,
		username:req.body.username,
		password:req.body.password

	});
	user.save(function(err){

		if(err){
			res.send(err);
			return;
		}
		res.json({message: 'User has been created'});

	});

});

api.get('/users', function(err,res){
	User.find({},function(err,users){
		if(err){
			res.send(err);
		}
		res.json(users);

	});

});


api.post('/login',function(req,res){

	User.findOne({
		username:req.body.username
	}).select('password').exec(function(err,user){
		if(err) throw err;
		if(!user){
			res.send({message: 'user not found'});

		} else if(user){
			var validpassword=user.ComparePassword(req.body.password);
			if(!validpassword){
				res.send({message: "Invalid password"});
			}else
			{
				//token
				var token=createToken(user);
				res.json({
					success: true,
					message:'succesfully logedin',
					token:token
				});

			}
		}

	});

});

api.use(function(req,res,next){

			console.log("Somebody just come to our app!");

			var token=req.body.token || req.param('token') || req.headers['x-access-token'];

			//check if token exist

			if(token){
		jsonwebtoken.verify(token,secretKey,function(err,decoded){

			if(err){
				res.status(403).send({success:false,message:"Failed to Authenticate uesr"});

			}
			else
			{
				req.decoded=decoded;
				next();
			}
		});

			}else{
				res.status(403).send({success:false,message:"No token provided"});

			}



});

api.get('/',function(req,res){
res.json("Hello World");
});
return api;


}






















