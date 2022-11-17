import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mysql from 'mysql';


const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'chintu',
  database:'face_recog_db',
  port:3307 
})

connection.connect((err)=>{
  if(err){
    console.log(err)
  }else{
    console.log("successfull connection")
  }
})


// routes
app.get('/students',(req,res)=>{
  
})



app.listen(5000,()=>{
  console.log(`server running on port ${5000}`)
})