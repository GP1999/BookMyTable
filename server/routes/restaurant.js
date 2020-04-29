const db=require('../DB.js');
const express=require('express');
const router=express.Router();
const multer=require('multer');
const path=require("path");
const withAuth=require('../Middlewares/withAuthenticate.js');
const jwt=require('jsonwebtoken');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');

//Multer destinantion and file path object
let mySecret="gauravponkiya";
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());

let storage=multer.diskStorage({
    destination:function(req,res,cb){
        //Photos is uploaded to file Media in root directory
        cb(null, 'Media/');

    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
      }
    
});

let upload=multer({storage:storage});


router.get("/",function(req,res,next){


    db.get().collection("Restaurant").find({}).toArray(function(err,result){
        
        res.send(result);
    });
   
})
router.get('/:id',function(req,res,next){
 
    let restaurant_name=req.params.id;
    console.log(restaurant_name);
    db.get().collection("Restaurant").findOne({Name:restaurant_name},{projection:{_id:0,BookedBy:0}},function(err,result){
        console.log("Send");
        res.status(200).send(result);
    })

});
router.post("/register",upload.array('Photos',5),function(req,res,next){
  
    //Store evry image path in database
    let imgpaths=[];
    req.files.forEach(function(element){
       imgpaths.push(element.path);
    })
    //New restaurant object
    let restaurant={
        Email:req.body.email,
        Name:req.body.Name,
        Address:req.body.Address,
        Contact:req.body.Contact,
        Seats:req.body.Seats,
        ImgPath:imgpaths,
        BookedBy:[]

    }
    //Add new Restaurant 
    db.get().collection("Restaurant").insert(restaurant,function(err,Result){
        if(err)
        console.log(err);
        else
        res.status(200).send("Registerd successfully");
    });

});
//Book the table
router.post('/book',withAuth,function(req,res,next){
   // console.log(req);
    let {email,time,seats,name,contact,AM_PM}=req.body;
    //Create Object for Booking after 1 houre of expireAt time
    if(AM_PM==='PM')
             time+=12;
    let date=new Date();
    let expire=new Date(date.getFullYear(),date.getMonth(),date.getDay(),time,0,0);
    let booking={
        expireAt:expire,
        
        Email:email,Time:time,Seats:seats,Name:name,Contact:contact
    }

    let token=req.cookies.token;
      let Usermail;

    jwt.verify(token,mySecret,function(err,decod){

        Usermail=decod.email;
        db.get().collection("Bookings").insertOne(booking,function(err,Result){

            if(err)
            res.status(404).send("Internal server Error");
            else
            {
                 //On inserting in Booking table now insert id of booking in both user 
                 //and restaurant
                console.log(Result);
        
                db.get().collection("User").findAndModify({email:Usermail},  [['_id','asc']],  {$push: {Booking:Result.ops[0]._id}},{new:true},function(err,object){
                
                  if(err)
                {  console.log(err);
                    res.status(400).send("Internal server Error");                }
                }
                );
            
                db.get().collection("Restaurant").findAndModify({Email:email},  [['_id','asc']],  {$push: {BookedBy:Result.ops[0]._id}},{new:true},function(err,object){
                
                   if(err)
                   {
                       console.log(err);
                       res.status(400).send("Internal server Error");
                   }
                 }
                 );
                                     
                res.status(200).send("Booking Success full");
            }

    });
});
    } 
);



module.exports=router;