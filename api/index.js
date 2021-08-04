const { Router } = require('express');
const todo = require('./routes/todo');
const auth = require('./routes/auth');
module.exports=()=>{
    const app = Router();
    todo(app);
    auth(app);
    return app;
}
