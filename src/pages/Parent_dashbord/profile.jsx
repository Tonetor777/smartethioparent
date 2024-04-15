import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/AuthContext';
import FadeLoader from 'react-spinners/FadeLoader';
import { AccountCircle } from '@mui/icons-material';
import ParentNavigation from '../../components/parentNavigation';
function Profile() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [child , setChild] = useState(null)
  useEffect(() => {
    if (user !== null) {
      setLoading(false);
      console.log(user.parentInfo.children_data[0])
      setUserInfo(user.user);
      setChild(user.parentInfo.children_data[0])
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
    <ParentNavigation />
      <div className="max-w-lg mx-auto mt-[100px] bg-white shadow-md rounded-lg">
        <div className='bg-blue-400 flex flex-col align-middle'>
          <div className="flex justify-center">
            <AccountCircle fontSize='extraLarge' sx={{ fontSize: '120px' }} />
          </div>
        </div>
        <div className="flex flex-col gap-4 p-5">
          <label className='text-2xl font-mono font-bold text-center underline text-blue-700 hover:text-blue-900'>Profile</label>
          <div className="flex flex-col gap-4">
            <div className="mb-4 flex gap-2">
              <label className=" text-blue-800 font-bold">Full Name:</label>
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
          <h2 className='text-xl font-mono font-bold text-center mb-3 underline text-blue-700 hover:text-blue-900'>Child Profile</h2>
          <div className="mb-4 flex gap-2">
              <label className=" text-blue-800 font-bold">Full Name:</label>
              <p className="text-gray-900 pt-0 ">{child.child}</p>
            </div>
          <div className="mb-4 flex gap-2">
              <label className=" text-blue-800 font-bold">Grade:</label>
              <p className="text-gray-900 pt-0 ">{child.class_subjects[0].grade.grade}</p>
            </div>
          <div className="mb-4 flex gap-2">
              <label className=" text-blue-800 font-bold">Section:</label>
              <p className="text-gray-900 pt-0 ">{child.class_subjects[0].section.section}</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
