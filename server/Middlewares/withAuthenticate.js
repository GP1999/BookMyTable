const jwt=require('jsonwebtoken');

const mySecret="gauravponkiya";
const withAuth=function(req,res,next){
    
    if(req.cookies)
    {
        const token=req.cookies.token;
    if(token)
    {
        jwt.verify(token,mySecret,function(err,decod){
            if(err)
            {
                res.status(404).send("Please log in");
            }else
            {
                req.email=decod.email;
                next();
            }
        })

    }else
    {
        res.status(404);
        res.send("Unauthorized ! Please log in");
        
    }
   }else{
    res.status(404);
    res.send("Unauthorized ! Please log in");
    

   }

}

module.exports=withAuth;