import express from 'express';
import dotenv from 'dotenv';
import connectDb from './Config/config.js';
import User from './Model/user.js';


const app = express();

dotenv.config();
app.use(express.json());
const PORT = process.env.PORT;
connectDb();

app.get('/',(req,res)=>{
    res.send('Hello from the server!')
})

app.post('/user',async(req,res)=>{
    const {name,email,password,age} = req.body;
    try{
        const user = await User.create({
            name,
            email,
            password,
            age : age || null,
        });
        res.status(201).json({success:true,message:"User created successfully",user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"error user creation!"});
    }
})


app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}/`);
})

