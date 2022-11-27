
import './App.css';
import Home from './pages/Home';
//import BrowserRouter as Router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import StudentLogin from './pages/login/StudentLogin';
import TeacherLogin from './pages/login/TeacherLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentHome from './pages/StudentHome';
import TeacherHome from './pages/TeacherHome';
// import Student from './pages/Student';
// import Teacher from './pages/Teacher';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/student/login",
      element: <StudentLogin />,
    },
    {
      path: "/teacher/login",
      element: <TeacherLogin />,
    },
    {
      path: "/student/home",
      element: <StudentHome />,
    },
    {
      path: "/teacher/home/:id",
      element: <TeacherHome />,
    }

  ]);
  return (
    <div className="App bg-gray-200 min-h-screen ">
      <RouterProvider router={router} />

      <ToastContainer />
    </div>
  );
}

export default App;
