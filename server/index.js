const express=require('express');
const Connection=require('./DB.js');
const bcrypt=require('bcrypt');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const withAuth=require('./Middlewares/withAuthenticate.js');
const multer=require('multer');
const path=require('path');
const cors=require('cors');

const app=express();
let DBConnection;
Connection.connect(function(){
    DBConnection=Connection.get();
        app.listen(PORT);
});

//routes
const restaurants=require('./routes/restaurant.js');



//Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/restaurants',restaurants);
app.use(cors());

//const mongo_url='mongodb://localhost:27017';
const mySecret="gauravponkiya";
const PORT=9000;

//Authenticate useres who is already loged in using JSONWeb token
app.get('/Authenticate',function(req,res,next){
    const token=req.cookies.token;
    if(token)
    {
         jwt.verify(token,mySecret,function(err,decod){
             if(err)
             res.status(401).send("Please login");
             else
             {
                 console.log("Authenticated");
                 res.status(200).send("Welcome");
             }
         });

    }else
    {
        res.status(401).send("Please login");
    }
});
//login path
app.post('/login',function(req,res,next){

    const {email,password}=req.body;
    DBConnection.collection('User').findOne({"email":email},function(err,result){
        if(result)
        {
           bcrypt.compare(password,result.password,function(err,same){
               if(same){
                const payload={email};
                const token=jwt.sign(payload,mySecret,{expiresIn:'1h'});
                res.cookie('token',token,{httpOnly:true});

                   res.status(200).send("Login Successfull");

               }else
               res.status(401).send("Incorrect password");
           })

        }else
        res.status(401).send("Enter valid Email Address");
    })

});
//Register the users
app.post('/register',function(req,res,next){

    const {email,password,name,Mobile_no}=req.body;
    if(!email||!password||!name||!Mobile_no)
    res.status(401).send("Enter valid Details");
    else
    {
      //encrypt the password using algo HS256 in bcrypt
        const saltRound=10;
        bcrypt.hash(password,saltRound,function(err,hashPass){


            DBConnection.collection("User").insertOne({"email":email,"password":hashPass,"name":name,"Mobile_no":Mobile_no},function(err,result){
                if(err)
                res.status(401).send("User with Given Email is Registered!");
                else
                {
                    //Generate JSONWeb token for newly registered user
                        const payload={email};
                        const token=jwt.sign(payload,mySecret,{expiresIn:'1h'});
                        res.cookie('token',token,{httpOnly:true});
                        res.status(200).send("Registered success fully");

                }
            })
        });

    }

        

});
app.get('/Media/:id',function(req,res,next){

    let imgpath=path.join(__dirname,'Media/'+req.params.id);
    console.log(imgpath);
    res.sendFile(imgpath);


});
app.get('/',function(req,res,next){
    res.sendFile(path.join(__dirname,'index.html'),{'Content-type':'text/html'});
   //let {Name,Address,Contact_no,Seats,img_path}
    // res.send("hi there");

});


