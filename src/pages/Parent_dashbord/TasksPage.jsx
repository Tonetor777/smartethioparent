import React, { useState, useEffect, useContext } from 'react';
import Footer from '../../components/Footer/Footer';
import { FadeLoader } from 'react-spinners';
import { AuthContext } from '../../components/AuthContext';
import Task from '../../components/Task';
import ParentNavigation from '../../components/parentNavigation';
import { FilterListTwoTone } from '@mui/icons-material';
function TasksPage() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState('all');

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const tasksData = user.parentInfo.children_data[0].tasks.filter(task => task.type === 'homework');
          setTasks(tasksData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching tasks:', error);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);
  

  const handleSubjectChange = (event) => {
    setSubjectFilter(event.target.value);
  };

  const currentDate = new Date();
  const inProgressTasks = tasks.filter((task) => new Date(task.deadline) >= currentDate);
  const pastTasks = tasks.filter((task) => new Date(task.deadline) < currentDate);

  const filteredInProgressTasks = inProgressTasks.filter((task) => {
    return subjectFilter === 'all' || task.details.subject.subject === subjectFilter;
  });

  const filteredPastTasks = pastTasks.filter((task) => {
    return subjectFilter === 'all' || task.details.subject.subject === subjectFilter;
  });

  return (
    <div>
      <ParentNavigation />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <FadeLoader color="#36d7b7" />
        </div>
      ) : (
        <div className='mt-[100px] w-[80%] mx-auto'>
          <div className="mb-4 text-right">
            <label htmlFor="" className='text-2xl mx-2 font-semibold'>Filter  <FilterListTwoTone /> </label>  
            <label htmlFor="subjectFilter" className="mr-2 text-lg">
              Subject:
            </label>
            <select id="subjectFilter" value={subjectFilter} onChange={handleSubjectChange}>
              <option value="all">All</option>
              {/* Map through unique subjects from tasks and render options */}
              {Array.from(new Set(tasks.map((task) => task.details.subject.subject))).map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div>
            {filteredInProgressTasks.length > 0 && (
              <>
                <h2 className="text-3xl font-bold mb-4">In Progress Tasks</h2>
                {filteredInProgressTasks.map((task, index) => (
                  <Task key={index} task={task} />
                ))}
              </>
            )}
            {filteredPastTasks.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mb-4">Past Tasks</h2>
                {filteredPastTasks.map((task, index) => (
                  <Task key={index} task={task} />
                ))}
              </>
            )}
            {(filteredInProgressTasks.length === 0 && filteredPastTasks.length === 0) && (
              <p className="text-gray-500">No Tasks</p>
            )}
          </div>
        </div>
      )}
      < Footer />
    </div>
  );
}

export default TasksPage;
