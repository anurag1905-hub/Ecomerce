const Category = require('../models/category');
const {errorHandler} = require('../helpers/dbErrorHandler');

module.exports.create = (req,res) => {
    const category = new Category(req.body);
    category.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        else{
            res.json({
                data:data
            });
        }
    })
};

module.exports.categoryById = (req,res,next,id) => {
    Category.findById(id).exec((err,category)=>{
        if(err||!category){
            return res.status(400).json({
                error:"Category does not exist"
            });
        }
        req.category = category;
        next();
    });
};

module.exports.read = (req,res) => {
    return res.json(req.category);
};

module.exports.update = (req,res) => {
    const category = req.category;
    console.log(req.body);
    category.name = req.body.name;
    category.save((err,data)=>{
        if(err){
            //console.log(err);
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data);
    });
};

module.exports.remove = (req,res) => {
    const category = req.category;
    category.remove((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json({
            "message":"Category removed successfully"
        });
    });
};

module.exports.list = (req,res) => {
    Category.find().exec((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data);
    });
};
