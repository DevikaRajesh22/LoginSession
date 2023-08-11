 //importing modules
 const express=require('express');
 const path=require('path');
 const bodyparser=require('body-parser');
 const session=require('express-session');
 const {v4: uuidv4}=require('uuid');
 const router=require('./router');

 //loading app
 const app=express();

 //specifying port
 const port=process.env.PORT || 3000;

 //to pass incoming req to middleware before we use it
 app.use(bodyparser.json())
 app.use(bodyparser.urlencoded({extended:true}))

 //setting view engine as ejs
 app.set('view engine','ejs');

 //load static asset
 app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'public/assets')))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true,
}))

app.use('/route',router);

 //home route
 app.get('/',(req,res)=>{
    res.render('base',{title:"Login System"});
 })

 //listening to specified port and logging message
 app.listen(port,()=>{console.log('listening to server on http://localhost:3000')});