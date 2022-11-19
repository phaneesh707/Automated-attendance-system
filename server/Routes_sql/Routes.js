import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import { mysqlConnection } from '../index.js';


const router = express.Router();

// --------------------------------------------------------------------------------------
// student routes 


//1.to view his attendance on a particular day;
router.get('/student/viewAttendance',expressAsyncHandler(async(req,res)=>{
    const {SRN,datee} = req.body;
    const qry = `SELECT DISTINCT teaches.course_id,attendance.is_present FROM attendance join teaches on attendance.teacher_id = teaches.teacher_id where attendance.curr_date='${datee}' and attendance.SRN='${SRN}';`;
    mysqlConnection.query(qry,(err,result)=>{
        if(err) throw err;
        else{
            res.status(200).send(result);   
        }
        
    })
}))



// 2.student login 
router.post('/student/login',expressAsyncHandler(async(req,res)=>{
    const {SRN,password} = req.body;
    
    const qry = `SELECT password from student where SRN ='${SRN}';`;
    mysqlConnection.query(qry,(err,result)=>{
        if(err) throw err;
        else if(result.length == 0){
            res.status(404);
            throw new Error("student not found");
        }    
        else{
            console.log(result[0].password);
            if(password == result[0].password){
                res.status(200).send("Login success");
            }else{
                res.status(401).send({error:"Invalid credentials"});
                
            }
        }
    })
}))


// ---------------------------------------------------------------------------------------

// teacher routes

// 1. view all the class under a teacher
router.get(
  "/teacher/viewClassList/:id",
  expressAsyncHandler(async (req, res) => {
    const teacher_id = req.params.id;
    const qry = `SELECT section_id from teaches where teacher_id = '${teacher_id}';`;
    mysqlConnection.query(qry, (err, result) => {
      if (err) throw err;
      else {
        res.status(200).send(result);
      }
    });
  })
);


// 2. view attendance of all the students of a particular class under a teacher on a given date
router.get('/teacher/viewAttendance',expressAsyncHandler(async (req,res)=>{
    const {section_id,teacher_id,datee} = req.body;
    const qry = `SELECT student.SRN,attendance.is_present from student natural join attendance where section_id = '${section_id}' and teacher_id ='${teacher_id}' and curr_date='${datee}';`;
    mysqlConnection.query(qry, (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        res.status(200).send(result);
      }
    });

}))


// 3.teacher login 
router.post('/teacher/login',expressAsyncHandler(async(req,res)=>{
    const {teacher_id,password} = req.body;
    
    const qry = `SELECT password from teacher where teacher_id ='${teacher_id}';`;
    mysqlConnection.query(qry,(err,result)=>{
        if(err) throw err;
        else if(result.length == 0){
            res.status(404);
            throw new Error("teacher not found");
        }    
        else{
            console.log(result[0].password);
            if(password == result[0].password){
                res.status(200).send("Login success");
            }else{
                res.status(401).send({error:"Invalid credentials"});
                
            }
        }
    })
}))



// 4. update attendance of student


// 5.ml model




export default router;