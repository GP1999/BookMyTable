const MongoClient=require('mongodb').MongoClient;
let mongodb;
let url="mongodb://localhost:27017";
function connect(callback){
    MongoClient.connect(url,function(err,db){
        
        mongodb=db.db("RTBS");
        callback();
    });
}
function get()
{
    return mongodb;
}
function close()
{
    mongodb.close();
}
module.exports={
    connect,get,close
};