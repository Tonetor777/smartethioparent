import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/AuthContext';
import FadeLoader from 'react-spinners/FadeLoader';
import { AccountCircle } from '@mui/icons-material';
import TeacherNavigation from '../../components/TeacherNavigation';
function TeacherProfile() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [classes, setClasses] = useState(null);

  useEffect(() => {
    if (user !== null) {
      setLoading(false);
      setUserInfo(user.user);
      setClasses(user.classes);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 z-50">
        <FadeLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <>
    <TeacherNavigation />
    <div className="max-w-lg mx-auto mt-[100px] bg-white shadow-md rounded-lg">
      <div className='bg-blue-400 flex flex-col align-middle'>
        <div className="flex justify-center">
          <AccountCircle fontSize='extraLarge' sx={{ fontSize: '120px' }} />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-5">
        <label className='text-2xl font-mono font-bold text-center underline text-blue-700 hover:text-blue-900'>Teacher Profile</label>
        <div className="flex flex-col gap-4">
          <div className="mb-4 flex gap-2">
            <label className="text-blue-800 font-bold">Full Name:</label>
            <p className="text-gray-900 pt-0  ">{userInfo.first_name} {userInfo.last_name}</p>
          </div>
          <div className="mb-4 flex gap-3">
            <label className="block text-blue-800 font-bold mb-2">Email:</label>
            <p className="text-gray-900 pt-0  ">{userInfo.email}</p>
          </div>
          <div className="mb-4 flex gap-3">
            <label className="block text-blue-800 font-bold mb-2">Phone Number:</label>
            <p className="text-gray-900 pt-0 ">{userInfo.phone_number}</p>
          </div>
        </div>
        <div>
          <label className='text-xl font-bold text-blue-800 text-center mb-2'>Classes Taught</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            {classes && classes.length > 0 ? (
              classes.map((classItem, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded-md shadow-md">
                  <p className="text-blue-800 font-bold p-1">Grade: {classItem.grade.grade}</p>
                  <p className="text-blue-800 font-bold p-1">Section: {classItem.section.section}</p>
                  <p className="text-blue-800 font-bold p-1">Subject: {classItem.subject.subject}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No classes</p>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default TeacherProfile;
