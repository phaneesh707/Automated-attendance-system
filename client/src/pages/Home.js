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
        <div className="grid grid-cols-2 gap-5">
            <div onClick={studentLogin} className="bg-white text-3xl w-1/3 hover:cursor-pointer mx-auto font-semibold py-12 rounded-lg">Student</div>
            <div onClick={teacherLogin} className="bg-white text-3xl w-1/3 hover:cursor-pointer mx-auto font-semibold py-12 rounded-lg">Teacher</div>
        </div>
    );
}

export default Home;