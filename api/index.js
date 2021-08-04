const { Router } = require('express');
const userRoute = require('./routes/user');
module.exports=()=>{
    const app = Router();
    userRoute(app);
    return app;
}
