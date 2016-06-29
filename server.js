/*

var express=require('express');

var bodyparser=require('body-parser');

var _config=require('./config')

var mongoose=require('mongoose');
 
var app=express();

app.use(bodyparser.urlencoded({extended:true}));

app.use(bodyparser.json());

var api=require('./app/routes/api')(app,express);
app.use('/api',api);



mongoose.connect(_config.database,function(err){

if(err){
	console.log(err);

}
else {
	console.log('connected to db');
}
});

app.get('*', function(req, res) {
  res.send('hello world');
});

 

app.listen(_config.port,function(err){

	console.log(_config.port)

                if(err){

                                console.log(err);

                }

                else{

                                console.log("Listening to port " + _config.port);

 

                }

});



*/




 


 var express = require('express');
var app = express();
var bodyparser=require('body-parser');

 
var mongoose=require('mongoose');


app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'test',
        password: 'acm2rce123',
        server: 'localhost', 
        database: 'MMTA' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Role', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            console.log(recordset);
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});