import axios from "axios"
import React, { useEffect, useState } from 'react'

const Filesend = () => {
    const [file, setFile] = useState();
    const [name, setName] = useState()

    const handleClick = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("file", file);
        // const url = "http://localhost:5000/api/teacher/sendImg";
        axios
            .post("http://localhost:5000/api/teacher/sendImg", formData)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });



    }


    return (
        <div>
            {/* <form enctype="multipart/form-data"> */}
            <input
                type="text"
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />
            <input
                type="file"
                accept=".jpg"
                onChange={(e) => {
                    setFile(e.target.files[0]);
                }}
                className="my-10"
            />
            <button className="px-7 py-2 bg-blue-900 text-white font-semibold rounded-lg" onClick={handleClick}>Send file</button>

        </div>
    );
}

export default Filesend