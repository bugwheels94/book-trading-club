
var Book = require('./models/book');
module.exports={
    proposeNew:function(req,res,next){
        var thisBookId=req.body.mybook;
        var wishBookId=req.body.wishbook;
        Book.findOneAndUpdate({
            "_id":thisBookId
        },{
            $unset:{
                'exchangeMade':1
            }
        },{
            new:true
        },function(err,o1){
            if(err)return next("Some Error Occured!");
            Book.findOneAndUpdate({
                "_id":wishBookId
            },{
                $pull:{
                    'exchangeReceived':thisBookId
                }
            },{
                new:true
            },function(err,o2){
                if(err)return next("Some Error Occured!");
                res.json([o1,o2]);
            });
        });
    }
}
