var express = require('express');
var path=require('path');
var bodyparser=require('body-parser');
var session=require('express-session');
var{v4:uuidv4}=require('uuid');

const router=require('./router');

var app = express();

const port=process.env.PORT||3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({
    secret:uuidv4(),
    resave: false,
    saveUninitialized:true
}));


app.use('/route',router);

//home route
app.get('/',(req,res)=>{
    res.render('base');
}
);

app.listen(port,()=>{console.log("Listening to the sever on http://localhost:3000")});