import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const StudentLogin = () => {
    const [creds, setcreds] = useState({ teacher_id: "", password: "" });
    console.log(creds);

    const router = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Heyyoo")
        //make a axios post request to the backend
        axios.post("http://localhost:5000/api/teacher/login", creds)
            .then((res) => {
                console.log(res.data);
                toast.success("Login Successfull");
                router(`/teacher/home/${creds.teacher_id}`);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Login Failed");
            })
    }

    return (
        <div className="h-[90vh] bg-[#ECEFF5] flex justify-center items-center shadow-lg">
            <div className=" bg-white border md:w-[50%]   pb-2 ph:w-3/4 rounded-xl shadow-slate-400 shadow-lg px-4 ph:px-2 py-2 ">
                <p className="py-4 font-bold md:text-xl text-2xl text-[#2F4266] lg:ml-6">
                    Teacher Login
                </p>

                <div className="py-2 lg:px-6">
                    <input
                        onChange={(e) => setcreds({ ...creds, teacher_id: e.target.value })}
                        type="text"
                        className="bg-[#ECEFF5] py-3 w-full text-[#2F4266] rounded-lg pl-5  outline-0"
                        placeholder="Teacher ID"
                    />
                </div>

                <div className="py-2 lg:px-6">
                    <input
                        onChange={(e) => setcreds({ ...creds, password: e.target.value })}
                        type="password"
                        className="bg-[#ECEFF5] py-3 w-full text-[#2F4266] rounded-lg pl-5  outline-0"
                        placeholder="Password"
                    />
                </div>

                <div className="flex justify-between px-6 text-[#2f4266] my-5 sm:mb-10 lg:mb-20 ">
                    <div className="rem-me flex justify-center items-center border-[#2f4266]">
                        <input
                            type="checkbox"
                            name=""
                            id=""
                            className="outline-[#2f4266] m-1 my-auto bg-red-600"
                        />
                        <label htmlFor="" className="text-sm">
                            Remember Me
                        </label>
                    </div>
                </div>


                <div className="text-xs lg:px-6 text-[#2f4266] hover:underline mb-4 italic">
                    <a href="/signup">Don't Have a Account? Sign Up</a>
                </div>

                <div className="px-6">
                    {
                        <button
                            className="bg-[#3061C0] w-full lg:px-6 py-3 rounded-lg text-white font-semibold"
                            onClick={submitHandler}
                        >
                            Login
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default StudentLogin;