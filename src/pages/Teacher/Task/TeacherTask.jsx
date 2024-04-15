import { useContext, useState, useEffect } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import FadeLoader from "react-spinners/FadeLoader";
import { AuthContext } from "../../../components/AuthContext";
import axios from "axios";
import api from "../../../api";
import TeacherNavigation from "../../../components/TeacherNavigation";

function TeacherTask () {

  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    type: "",
    details: 0,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  console.log(user);

  useEffect(() => {
    if (user !== null) {
      const fetchTeacherInfo = async () => {
        try {
          const teacherinfo = user.teacherInfo;
          setTeacherInfo(teacherinfo);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching teacher info:", error);
        }
      };
      fetchTeacherInfo();
    }
    const fetchTasks = async () => {
      try {
        const response = await api.get(
          `/api/tasks/?teacher=${teacherInfo[0].id}`
        );
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [user]);

  console.log(tasks);
  if (loading) {
    return (
      <>
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 z-50">
          <FadeLoader color="#36d7b7" />;
        </div>
      </>
    );
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = async () => {
    try {
      if (
        !newTask.title ||
        !newTask.description ||
        !newTask.deadline ||
        !newTask.type ||
        !newTask.details
      ) {
        setErrorMessage("All fields are required");
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        return;
      }

      const response = await api.post("/api/add-task/", newTask);
      setTasks([...tasks, response.data]);
      setNewTask({
        title: "",
        description: "",
        deadline: "",
        type: "",
        details: 0,
      });
      setSuccessMessage("Task added successfully.");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setErrorMessage("Error adding task. Please try again later.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      console.error("Error adding task:", error);
    }
  };

return (
  <>
   < TeacherNavigation />
   {errorMessage && <div className="bg-red-500 text-white p-3">{errorMessage}</div>}
      {successMessage && <div className="bg-green-500 text-white p-3">{successMessage}</div>}
  <div className="container mx-auto my-10 p-5 bg-white rounded shadow-xl">
    {/* <h1 className="text-3xl font-bold mb-8 text-[#B85B05] leading-tight">
      Teacher Dashboard
    </h1> */}
    <div className="border border-gray-300 rounded-md p-4 transition-colors duration-500 ease-in-out hover:bg-gray-100 mt-[100px]">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      <div className="flex items-center mb-2">
        <label htmlFor="title" className="mr-2 w-28">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="border border-gray-300 rounded-md p-2 w-full"
          maxLength={255}
          minLength={1}
        />
      </div>
      <div className="flex items-center mb-2">
        <label htmlFor="description" className="mr-2 w-28">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="border border-gray-300 rounded-md p-2 w-full"
          minLength={1}
        />
      </div>
      <div className="flex items-center mb-2">
        <label htmlFor="deadline" className="mr-2 w-28">
          Deadline
        </label>
        <Datetime
          inputProps={{ id: "deadline", placeholder: "Deadline" }}
          value={newTask.deadline}
          onChange={(date) =>
            handleInputChange({ target: { name: "deadline", value: date } })
          }
          className="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div className="flex items-center mb-2">
        <label htmlFor="type" className="mr-2 w-28">
          Type
        </label>
        <select
          id="type"
          name="type"
          value={newTask.type}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          <option value="">Select Type</option>
          <option value="homework">Homework</option>
          <option value="assignment">Assignment</option>
        </select>
      </div>
      <div className="flex items-center mb-2">
        <label htmlFor="details" className="mr-2 w-28">
          Details
        </label>
        <select
           id="details"
           name="details"
           value={newTask.details}
           onChange={handleInputChange}
           className="border border-gray-300 rounded-md p-2 w-full"
         >
           <option value="">Select Details</option>
           {user && user.classes.map((classItem) => (
             <option key={classItem.id} value={classItem.id}>
               {` Grade: ${classItem.grade.grade}, Section: ${classItem.section.         section}, Subject: ${classItem.subject.subject}`}
             </option>
           ))}
         </select>
      </div>
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white rounded-md px-4 py-2 mt-2 hover:bg-blue-700 transition-colors duration-500 ease-in-out"
      >
        Add Task
      </button>
    </div>
  </div>
   <h1 className="text-2xl font-bold mb-8 text-[#354fd4] leading-tight text-center">
      Tasks Given
    </h1> 
  
  <div className="overflow-x-auto h-[400px] w-[90%] mx-auto mb-[100px]">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Class
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deadline
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks && tasks.slice().reverse().map((task) => (
            <tr key={task.id}>
              <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{task.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">{`Grade: ${task.details.grade?.grade || 'Unknown'}, Section: ${task.details.section?.section || 'Unknown'}, Subject: ${task.details.subject?.subject || 'Unknown'}`}</td>
              <td className="px-6 py-4 whitespace-nowrap">{task.details.subject.subject}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(task.deadline).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{task.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   </>
  );
}

export default TeacherTask;
