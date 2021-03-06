var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Goods=require('../models/goods');


mongoose.connect('mongodb://127.0.0.1:27017/duamll');

mongoose.connection.on("connected",function(){
    console.log("success")
});

mongoose.connection.on("error",function(){
    console.log("fail")
});

mongoose.connection.on("disconnected",function(){
    console.log("disconnection")
});

router.get("/",function(req,res,next){
    var page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let priceLevel = req.param("priceLevel");
    var sort = req.param("sort");
    let skip=(page-1)*pageSize;
    var priceGt='';
    var priceLte='';
    var params={};
    // console.log(priceLevel);
    if(priceLevel!='all'){
        switch (priceLevel) {
            case '0':priceGt=0;priceLte=100;break;
            case '1':priceGt=100;priceLte=500;break;
            case '2':priceGt=500;priceLte=1000;break;
            case '3':priceGt=1000;priceLte=5000;break; 
        }
        params = {
            salePrice:{
                $gt:priceGt,
                $lte:priceLte
            }
        }
    }
    
    
    var goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice':sort});
    goodsModel.exec({},function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            });
        }else{
            res.json({
                status:'0',
                msg:doc,
                result:{
                    count:doc.length
                }
            })
        }
    })
});
module.exports=router;