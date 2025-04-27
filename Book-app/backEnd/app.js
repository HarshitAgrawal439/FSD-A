const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./config/Config')
const mongoose = require('mongoose')
const Book = require('./model/user')
const morgan = require('morgan')
const cors = require('cors'); // Import cors

const app = express()
dotenv.config()
app.use(cors()); // Enable CORS for all routes
const PORT = process.env.PORT

app.use(express.json())
app.use(morgan('dev')); 
connectDb()

app.get('/book/search' , async (req, res) => {
    try {
        const { title } = req.query; 
        console.log(title);
        const books = await Book.find({ title: { $regex: title, $options: 'i' } }); 
        console.log(books);
        if (books.length === 0) {
            return res.status(404).json({ message: "No books found" });
        }

        res.status(200).json({ message: "Books fetched successfully", data: books });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Error fetching books" });
    }
})
app.post('/book',async (req,res)=>{
    
    try{
        const {title,author,date,image} = req.body;
        const book = await Book.create(
            {title,author,date,image});
        res.status(201).json({message : "book Created Successfully", book});

        // console.log(book);
    }
    catch{
        res.status(400).json({message : "ERROR!!!!"});
    }
})
app.get('/book',async(req,res)=>{
    try{
        const books = await Book.find();
        res.status(200).json({message : "Books fetched successfully", data : books});
        console.log(books);
    }
    catch{
        res.status(400).json({message : "ERROR!!!!"});
    }
})
app.get('/book/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).json({message : "Book not found"});
        }
        res.status(200).json({message : "Book fetched successfully", data : book});
    }
    catch{
        res.status(400).json({message : "ERROR!!!!"});
    }
})

app.put('/book/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const { title, author, date, image } = req.body; 

        
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author, date, image },
            { new: true, runValidators: true } 
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book updated successfully", data: updatedBook });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Error updating book" });
    }
});

app.delete('/book/:id',async (req,res)=>{
    try{
        const {id} = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook){
            return res.status(404).json({message : "Book not found"});
        }
        res.status(200).json({message : "Book deleted successfully", data : deletedBook});
    }
    catch(err){
        console.error(err);
        res.status(400).json({message : "ERROR!!!!"});
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    console.log(`server is running on http://localhost:${PORT}`);
})