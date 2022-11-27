import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mysql from 'mysql';

import router from "./Routes_sql/Routes.js";
const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', router);

export const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1925',
  database: 'face2',
  // port: 3306,
  "dialect": "mysql"
})

mysqlConnection.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("successfull connection")
  }
})



app.listen(5000, () => {
  console.log(`server running on port ${5000}`)
})