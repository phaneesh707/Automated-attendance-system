import express from 'express';
import mongoose from 'mongoose';
import expressAsyncHandler from 'express-async-handler';
import child from "child_process"
import Student from '../models/StudentModel.js';
import Attendance from '../models/Attendance.js';



export const studnetLogin = expressAsyncHandler(async (req,res)=>{
    const {SRN,password} = req.body;
    console.log(SRN , password);
    const student = await Student.findOne({SRN});
    
    if(student && student.password === password){
        res.status(201).json({
            id:student._id,
            SRN:student.SRN
        })
    }else{
        res.status(401);
        throw new Error("Invalid login credentials");   
    }
    
})

// export const getStudentAttendance = expressAsyncHandler(async (req,res)=>{
//     const {SRN} = req.body;
//     const student = await student.findOne({SRN});
     

// })


export const testMl = expressAsyncHandler(async (req,res)=>{
    var spn = child.spawn;
    var pro = spn("python", ["../ML_model/test.py"]);
    
    var data1;
    pro.stdout.on("data", function (data) {
        console.log(data);
      data1 = data.toString();
      console.log(data1);
    });
    res.send(data1);
})