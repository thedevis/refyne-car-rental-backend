const mongoose = require('mongoose');
const Todo = mongoose.Schema({
    user_id: String,
    content: String,
}, {
    timestamps: true
})
mongoose.model('Task', Todo);
module.exports = Todo;

