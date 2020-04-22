const db=require('../DB.js');
const express=require('express');
const router=express.Router();
const multer=require('multer');
const path=require("path");

//Multer destinantion and file path object
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

})
module.exports=router;