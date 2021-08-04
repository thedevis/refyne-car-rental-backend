const { Container } = require("typedi");
async function CarRegistration (req, res, next) {
    res.json({message:'car registration'});
}
async function CarUpdate(req,res,next){
    res.json({message:'CarUpdate'});
}
async function DeleteCar(req,res,next){
    res.json({message:'DeleteCar'});
}

async function GetCarDetail(req,res,next){
    res.json({message:'GetCarDetail'});
}
async function CarSearch(req,res,next){
    res.json({message:'CarSearch'});
    
}
async function GetCarPrice(req,res,next){
    res.json({message:'GetCarPrice'});
    
}

module.exports={
    CarRegistration,
    CarUpdate,
    DeleteCar,
    GetCarDetail,
    CarSearch,
    GetCarPrice
}