import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Webcam from 'react-webcam'



const TakeAtt = () => {


    const navigate = useNavigate();
    const [url, setUrl] = useState(null);
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setUrl(imageSrc);
    }, [webcamRef]);

    console.log(url);
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };
    return (
        <>
            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Capture photo</button>
            <div className='caputerdImg'>
                {url && (
                    <div>
                        Verify the Image-
                        <img src={url} alt="selfi" />
                        <button onClick={() => navigate(0)}>Generate Attandence</button>
                    </div>
                )}
            </div>
        </>
    );

};

export default TakeAtt