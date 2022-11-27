import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const StudentHome = () => {
    //collect the date input of user
    const [date, setDate] = useState("");
    const [data, setData] = useState([]);
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
            <input type="date" value={date} name="" id="" onChange={handleSetDate} />
            <button onClick={handleClick}>Submit</button>

            {JSON.stringify(data)}
        </div>
    );
}

export default StudentHome;