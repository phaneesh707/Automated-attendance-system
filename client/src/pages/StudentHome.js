import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const StudentHome = () => {
    //collect the date input of user
    const [date, setDate] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    console.log(date)
    const handleClick = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/student/viewAttendance`, {
            datee: date,
            SRN: localStorage.getItem("SRN")
        })
            .then((res) => {
                console.log(res.data);
                setData(res.data.message);
                toast.success("Attendance Fetched");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Attendance Not Fetched");
            })
    }

    const handleSetDate = (e) => {
        setDate(e.target.value);
    }



    return (
        <div>
            <input type="date" value={date} name="" id="" onChange={handleSetDate} className="" />
            <div className="my-10">
                <button onClick={handleClick} className="px-5 py-1 bg-blue-900 text-white font-semibold rounded-lg">Submit</button>
            </div>

            <div className="flex flex-col justify-center items-center">
                {
                    data?.map((item) => {
                        return (
                            <div className="border-2 border-black mx-10 rounded-lg my-10 px-6 w-1/4 ">
                                <h1>Course ID : {item?.course_id}</h1>
                                <h1>Status : {item?.is_present ? "Present" : "Absent"}</h1>
                            </div>
                        )
                    })
                }
            </div>
            {/* {JSON.stringify(data)} */}
            <button onClick={() => {
                navigate('/')
            }} className="px-5 py-1 bg-blue-900 text-white font-semibold rounded-lg">RETURN</button>
        </div>
    );
}

export default StudentHome;