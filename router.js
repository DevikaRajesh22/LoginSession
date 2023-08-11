var express=require('express');
const nocache=require('nocache');
var router=express.Router();

//hardcoded credential value
var credential={
    email:"admin@gmail.com",
    password:"admin123",
}

//router for login user
router.post('/login',nocache(),(req,res)=>{
    if(req.body.email==credential.email && req.body.password==credential.password){
        req.session.user=req.body.email;
       res.redirect('/route/dashboard');
       //res.end("Login successful");
    }else{
        res.redirect("/");
    }
});

//router for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard');
    }else{
        res.redirect("/");
    }
});

//router for logout
router.get('/logout',nocache(),(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("error");
        }else{
           // res.render('base',{title:"Express",logout:"Logout successfully"});
           res.redirect('/');
        }
    })
})

module.exports=router;