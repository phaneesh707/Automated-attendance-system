import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import { mysqlConnection } from '../index.js';
import axios from "axios"
import multer from 'multer';
import fs from 'fs';
import { log } from 'console';
const router = express.Router();

// --------------------------------------------------------------------------------------
// student routes 


//1.to view his attendance on a particular day;
router.post('/student/viewAttendance', expressAsyncHandler(async (req, res) => {
    const { SRN, datee } = req.body;
    console.log(SRN, datee);
    const qry = `SELECT DISTINCT teaches.course_id,attendance.is_present FROM attendance join teaches on attendance.teacher_id = teaches.teacher_id where attendance.curr_date='${datee}' and attendance.SRN='${SRN}';`;
    mysqlConnection.query(qry, (err, result) => {
        if (err) {
            res.send({ message: err })
        }
        else {
            res.status(200).send({ message: result });
        }

    })
}))



// 2.student login 
router.post('/student/login', expressAsyncHandler(async (req, res) => {
    const { SRN, password } = req.body;
    console.log(SRN, password);

    const qry = `SELECT password from student where SRN ='${SRN}';`;
    mysqlConnection.query(qry, (err, result) => {
        if (err) {
            res.status(500).send({ message: err })
        }
        else if (result.length == 0) {
            res.status(404).send({ message: "student not found" })

        }
        else {
            console.log(result[0].password + " " + password);
            if (password == result[0].password) {
                res.status(200).send({ message: "Login success" });
            } else {
                res.status(401).send({ message: "Invalid credentials" });

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
            if (err) {
                res.send({ message: err })
            }
            else {
                res.send({ message: result });
            }
        });
    })
);


// 2. view attendance of all the students of a particular class under a teacher on a given date
router.get('/teacher/viewAttendance', expressAsyncHandler(async (req, res) => {
    const { section_id, teacher_id, datee } = req.query;
    const qry = `SELECT distinct student.SRN,attendance.is_present from student natural join attendance where section_id = '${section_id}' and teacher_id ='${teacher_id}' and curr_date='${datee}';`;
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
router.post('/teacher/login', expressAsyncHandler(async (req, res) => {
    const { teacher_id, password } = req.body;

    const qry = `SELECT password from teacher where teacher_id ='${teacher_id}';`;
    mysqlConnection.query(qry, (err, result) => {
        if (err) {
            res.send({ message: err })
        }
        else if (result.length == 0) {
            res.status(404).send({ message: "teacher not found" });
        }
        else {
            // console.log(result[0].password);
            if (password == result[0].password) {
                res.status(200).send({ message: "Login success" });
            } else {
                res.status(401).send({ message: "Invalid credentials" });

            }
        }
    })
}))



// 4. get data from ML model 
router.get('/teacher/getData', expressAsyncHandler(async (req, Res) => {
    const { datee, teacher_id } = req.query;
    axios.get("http://127.0.0.1:6001/attendance")
        .then((response) => {

            console.log(response.data.data);
            const studs = response.data.data;
            console.log("STUDDS : ", studs);
            console.log(datee, teacher_id);
            console.log("studs" + typeof studs[0])
            let n = studs.length
            const qry = `insert into attendance (curr_date,is_present,SRN,teacher_id) values('${datee}',1,'${studs[0]}','${teacher_id}'),values('${datee}',1,${studs[1]},'${teacher_id}'),values('${datee}',1,${studs[2]},'${teacher_id}'),values('${datee}',1,${studs[3]},'${teacher_id}');`;
            // const qry = `insert into attendance (curr_date,is_present,SRN,teacher_id) values('${datee}',1,'${studs[0]}','${teacher_id}');`;
            mysqlConnection.query(qry, (err, res) => {
                if (err) {
                    console.log("res" + res);
                    Res.send({ code: 200, message: "Attendance not updated : error in ML model" })
                    return

                } else {
                    Res.send({ message: "Attendance updated successfully" });
                    return;
                }
            })
            // for (let i = 0; i < n; i++) {

            // }

            // Res.send({ message: "Attendance updated successfully" });
            // for (const SRN of studs) {
            //     const qry = `insert into attendance (curr_date,is_present,SRN,teacher_id) values('${datee}',1,'${SRN}','${teacher_id}'),values('${datee}',1,'${SRN}','${teacher_id}'),values('${datee}',1,'${SRN}','${teacher_id}'),values('${datee}',1,'${SRN}','${teacher_id}');`;
            //     mysqlConnection.query(qry, (req, res) => {
            //         if (err) {
            //             // res.status(500).send({ message: "Attendance not updated : error in ML model" })
            //             console.log("Error");
            //         } else {
            //             // res.status(200).send({ message: "Attendance updated successfully" });
            //         }-
            //     })

            // }
            Res.send({ message: "Successfully Updated The attendance" })
        }).catch(err => {
            console.log(err);
        })



}))


const upload = multer({ dest: "./uploads/" });
router.post('/teacher/sendImg', upload.single("file"), expressAsyncHandler(async (req, res) => {

    const fileType = req.file.mimetype.split("/")[1]
    const fileName = "1." + fileType;

    fs.rename(`./uploads/${req.file.filename}`, `./ML_model/${fileName}`, () => {
        res.status(200).send({ message: "file uploaaded" });
    })

}))


export default router;