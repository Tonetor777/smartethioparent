import "./App.css";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Result from "./pages/Teacher/Result/Result.jsx";
import Teachers from "./pages/Admin/ManageTeacher/Teacher.jsx";
import ManageData from "./pages/Admin/ManageGrade/ManageGrade";
import ManageStudents from "./pages/Admin/ManageStudent/ManageStudents.jsx";
import NotFound from "./components/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ResourceParent from "./pages/parent/Resource/ResourceParent.jsx"
import StudentList from "./pages/Teacher/StudentList.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";

// import TeacherData from "./pages/Admin/TeacherData/TeacherData.jsx";
import Students from "./pages/Admin/Students/Students.jsx";
import Task from "./pages/parent/Task/Task.jsx";
import { useState } from "react";

// import Footer from "./Footer";
import Parents from "./pages/parent/Home/Parents.jsx";
import TasksPage from "./pages/Parent_dashbord/TasksPage.jsx";
import Assignments from "./pages/Parent_dashbord/Assignments.jsx";
import AllMessages from "./pages/Parent_dashbord/AllMessages.jsx";
import Profile from "./pages/Parent_dashbord/Profile.jsx";
import TeacherProfile from "./pages/Teacher/TeacherProfile.jsx";
import TeacherHomePage from "./pages/Teacher/Home/TeacherHomePage.jsx";
import ResourceTeacher from "./pages/Teacher/Resource/ResourceTeacher.jsx";
import About from "./components/About.jsx";
import TeacherTask from "./pages/Teacher/Task/TeacherTask.jsx";
import Chat from "./pages/Teacher/Chat.jsx";


function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}



function App() {
  const [tasks, setTasks] = useState([]);
  const filter = "All";

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            path="/parent/home"
            element={
              <ProtectedRoute>
                <Parents/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent/assignment"
            element={
              <ProtectedRoute>
                <Assignments/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent/homework"
            element={
              <ProtectedRoute>
                <TasksPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent/resource"
            element={
              <ProtectedRoute>
                <ResourceParent/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/parent/message"
            element={
              <ProtectedRoute>
                <AllMessages/>
              </ProtectedRoute>
            }
          />
            <Route
              path="/parent/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          <Route
            path="/teacher/home"
            element={
              <ProtectedRoute>
                <TeacherHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/task"
            element={
              <ProtectedRoute>
                <TeacherTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/resource"
            element={
              <ProtectedRoute>
                <ResourceTeacher />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/profile"
            element={
              <ProtectedRoute>
                <TeacherProfile />
              </ProtectedRoute>
            }
          />
        <Route path="teacher/students/:grade/:section" element={<StudentList />} />

        <Route path="chat/:parentId" element= {< Chat />} />

          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          {/* <Route path="/register" element={<RegisterAndLogout />} /> */}
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/result" element={<Result />} />
          {/* <Route path="/:Id" element={<ResultDetail />} /> */}
          <Route path="/admin/grade" element={<ManageData />} />
          <Route path="/admin/parents" element={<ManageStudents />} />
          <Route path="/admin/resources" element={<Resources />} />
          {/* <Route path="/" element={<Navigate to="/tasks" />} /> */}
          <Route
            path="/tasks/*"
            element={<Task tasks={tasks} setTasks={setTasks} filter={filter} />}
          />
          {/* <Route
            path="/teachertask"
            element={<TeacherDashboard tasks={tasks} setTasks={setTasks} />}
          /> */}
          <Route path="/teacher/task" element={<TeacherTask />} />  
          <Route path="/admin/students" element={<Students />} />
          <Route path="/parents" element={<Parents />} />
          <Route path="/admin/teachers" element={<Teachers />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
