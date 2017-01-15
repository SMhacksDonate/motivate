var express = require('express');
var router = express.Router();
var low = require('lowdb');
const db = low('db.json');
var shortid = require('shortid');


var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

// parse application/vnd.api+json as json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }))



router.post('/signup', function(req, res, next) {
    
    var repeat = db.get("users")
                 .find({username:req.body.username})
                 .value()
    
    if(!(typeof repeat ==='undefined')){
        res.sendStatus(409);
    }else{
    
    
        var username = req.body.username;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var password = req.body.password;
        var date = Date.now();
        db.get("users")
        .push({username:username,firstName:firstName,lastName:lastName,password:password,createdAt:date,"goals":[]})
        .value()

        res.sendStatus(200);
    }
});


router.post('/add_goal', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    
    
    
    var goalTitle = req.body.goal['title'];
    
    var goalDeadline = req.body.goal['deadline'];
    
    var user = db.get("users")
              .find({username:username})
              .value()
    
    
    if((typeof user === "undefined" )|| !(user['password'] === password) ){
        res.sendStatus(409);
    }else{
        var date = Date.now();
        var id = shortid.generate();
        
        db.get("users")
        .find({username:username})
        .get('goals')
        .push({name:goalTitle,deadline:goalDeadline,finished:false,donated:false,createdAt:date,id:id})
        .value()
        
        res.sendStatus(200);
    }
    

    
});

router.post('/complete_goal', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var goalId = req.body.goalId;
    
    var user = db.get("users")
              .find({username:username})
              .value()
    
    
    if((typeof user === "undefined" )|| !(user['password'] === password) ){
        res.sendStatus(409);
    }else{
       db.get("users")
       .find({username:username})
       .get("goals")
       .find({id:goalId})
       .assign({finished:true})
       .value()
        
        res.sendStatus(200);
    }
    
});

router.post('/goals', function(req, res, next) {
    var username = req.body.username;
    var user = db.get("users")
               .find({username:username})
               .value()
    
    if(typeof user === "undefined"){
        res.sendStatus(404);
    }else{
        var database = user['goals'];
        res.json(database);
    }
     
     
});
module.exports = router;
