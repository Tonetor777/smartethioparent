import React, { useState, useEffect , useContext  } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../api';
import FadeLoader from 'react-spinners/FadeLoader'
import { AuthContext } from '../../components/AuthContext';
import MessageModal from './MessageModal';
import TeacherNavigation from '../../components/TeacherNavigation';
function StudentList() {
  const { grade } = useParams();
  const { section } = useParams();
  console.log(grade)
  console.log(section)



const [loading, setLoading] = useState(true);
const { user } = useContext(AuthContext);
const [studentList, setStudentList] = useState([]);
const [selectedParentId, setSelectedParentId] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
 console.log(user)

 const handleSendMessage = (parentId) => {
    setSelectedParentId(parentId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedParentId(null);
  };

useEffect(() => {
    if (user !== null){
        setLoading(false)
    }
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/parent/?grade=${grade}&section=${section}`);
        const sortedStudents = response.data.sort((a, b) =>
          a.children[0].first_name.localeCompare(b.children[0].first_name)
        );
        setStudentList(sortedStudents);
        console.log(sortedStudents);
      } catch (error) {
        console.error('Error fetching student list:', error);
      }
    };

    fetchData();
  }, [user, grade, section]);
  if (loading) {
    return (
      <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 z-50">
      <FadeLoader color="#36d7b7" />;
    </div>
      </>
    )
  }

  const sendMessage = (userId) => {
    // Implement logic to send message to the selected parent using userId
    console.log('Sending message to parent with userId:', userId);
  };

  return (
    <div>
      <TeacherNavigation />
    <h2 className="text-3xl font-bold font-mono mb-9 mt-8 text-blue-600 text-center md:mt-[100px]">  Grade-{grade} Section-{section} Student List</h2>
    <div className="overflow-x-auto w-[80%] mx-auto">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Child Name</th>
            <th className="px-4 py-2">Roll Number</th>
            <th className="px-4 py-2">Parent Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student) => (
            <tr key={student.id} className="border-b border-gray-200">
              <td className="px-4 py-2">{`${student.children[0].first_name} ${student.children[0].last_name}`}</td>
              <td className="px-4 py-2">{student.children[0].roll_number}</td>
              <td className="px-4 py-2">{`${student.first_name} ${student.last_name}`}</td>
              <td className="px-4 py-2">{student.email}</td>
              <td className="px-4 py-2">{student.phone_number}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleSendMessage(student.user_id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Send Message
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <MessageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        parentId={selectedParentId}
        senderId={user.user_id}
      />
    </div>
  </div>
  );
}
StudentList.propTypes = {
    grade: PropTypes.number.isRequired,
    section: PropTypes.string.isRequired,
  };
export default StudentList;
