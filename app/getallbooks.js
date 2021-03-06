var User = require('./models/user');
module.exports={
    getAll:function(req,res,next){
        if(req.user!=null)
            User.find({'_id':{$ne:req.user.id}}).populate('books').exec(function(err,users){
                if(err)return next("Some error occured");
                var books=[];
                users.forEach(function(user){
                    books=books.concat(user.books);
                })
                res.json(books);
            });
        else
            User.find({}).populate('books').exec(function(err,users){
                if(err)return next("Some error occured");
                var books=[];
                users.forEach(function(user){
                	books=books.concat(user.books);
                })
                res.json(books);
            });
    }
}