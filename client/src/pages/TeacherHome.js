import axios from "axios";
import { useEffect, useState } from "react";
//import useparams
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Webcam from "../components/Webcam";
const TeacherHome = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [att, setAtt] = useState([]);
    const [classe, setClass] = useState("");
    const [date, setDate] = useState("");
    const handleClassSelection = (e) => {
        setClass(e.target.value);
    }
    const router = useNavigate();
    useEffect(() => {

        axios.get(`http://localhost:5000/api/teacher/viewClassList/${id}`)
            .then((res) => {
                setData(res.data.message);
                console.log(res.data);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            )
    }, [id])


    const handleClick = (e) => {
        e.preventDefault();
        router(`/teacher/attendance/class/${id}`);

    }

    const viewAtt = (e) => {
        e.preventDefault();

        axios.get(`http://localhost:5000/api/teacher/viewAttendance?section_id=${classe}&teacher_id=${id}&datee=${date}`)
            .then((res) => {
                console.log(res.data);
                setAtt(res.data);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            )

    }
    const [takeAttendance, setTakeAttendance] = useState(false);
    const takeAtt = (e) => {
        e.preventDefault();
        setTakeAttendance(true);
    }
    console.log(date, classe, id);
    return (
        <div>
            <h1>Classes</h1>
            <input className="block mx-auto rounded-lg my-3 px-3" type="date" onChange={(e) => {
                setDate(e.target.value);
            }} />
            <select onChange={handleClassSelection} className="block mx-auto rounded-lg my-3 px-3">
                <option value="">Select Classes Here</option>
                {
                    data?.map((item) => {
                        return (

                            <option onClick={handleClick} id={item.section_id} className="border-2 border-black mx-10 rounded-lg my-10 px-6">
                                {item?.section_id}
                            </option>

                        )
                    })
                }
            </select>
            <div className="flex justify-around">
                <button onClick={viewAtt} className="px-7 py-2 bg-blue-900 text-white font-semibold rounded-lg">View Attendance</button>
                <button onClick={takeAtt} className="px-7 py-2 bg-blue-900 text-white font-semibold rounded-lg">Take Attendance</button>
            </div>

            {
                att?.map((item) => {
                    return (
                        <div className="border-2 border-black mx-10 rounded-lg my-10 px-6">
                            <h1>SRN : {item?.SRN}</h1>
                            <h1>Present : {item?.is_present}</h1>
                        </div>
                    )
                })
            }

            {takeAttendance &&
                <div>
                    <Webcam />

                </div>}
        </div>
    );
}

export default TeacherHome;