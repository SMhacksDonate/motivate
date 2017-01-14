var express = require('express');
var router = express.Router();
var low = require('lowdb');
const db = low('db.json');


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
        res.sendStatus(409)
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

router.get('/', function(req,res,next){
    
});

module.exports = router;
