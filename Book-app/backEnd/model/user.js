const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name:{
//         type : String,
//         required : true,
//         trim : true,
//     },
//     email:{
//         type : String,
//         required : true,
//         unique : true,
//         trim : true,
//     },
//     password:{
//         type : String,
//         required : true,
//     },
// })

const bookSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true,
        trim : true,
    },
    author:{
        type : String,
        required : true,
        trim : true,
    },
    date:{
        type : String,
        required : true,
    },
    image:{
        type : String,
        required : true,
    }
})
// const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Books', bookSchema);

// export default User;
module.exports = Book;