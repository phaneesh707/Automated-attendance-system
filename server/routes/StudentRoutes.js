import express from "express";
import { studnetLogin, testMl } from "../controllers/StudentContorllers.js";


const studentRouter = express.Router();

studentRouter.post('/login',studnetLogin);
studentRouter.get('/testMl',testMl)
export default studentRouter;