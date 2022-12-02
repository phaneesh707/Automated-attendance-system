//import usenavigate
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const router = useNavigate();

    const studentLogin = (e) => {
        e.preventDefault();
        router('/student/login');
    }

    const teacherLogin = (e) => {
        e.preventDefault();
        router('/teacher/login');
    }
    return (
        <div>

            <div>
                <h1 className='text-4xl uppercase font-bold pt-10'>Face Recognition Attendance System</h1>
            </div>
            <div className="flex mt-32 justify-evenly items-center">
                <div onClick={studentLogin} className="bg-white my-10 text-3xl w-1/4 hover:cursor-pointer font-semibold py-14 uppercase  rounded-lg">Student</div>
                <div onClick={teacherLogin} className="bg-white my-10 text-3xl w-1/4 hover:cursor-pointer font-semibold py-14 uppercase  rounded-lg">Teacher</div>
            </div>

        </div>

    );
}

export default Home;