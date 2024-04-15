import React,{useContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"
import Lottie from "lottie-react";
import animationData from "../../../assets/teacher.json";
import { AuthContext } from "../../../components/AuthContext";
import FadeLoader from 'react-spinners/FadeLoader'
import TeacherNavigation from "../../../components/TeacherNavigation";
import { Link } from "react-router-dom";



function TeacherHomePage() {
  const [loading, setLoading] = useState(true);
  const {user}= useContext(AuthContext)
  console.log(user)
  const navigate = useNavigate()
useEffect(() => {
  if (user !== null) {
    setLoading(false);
  }
}, [user]);

console.log("user",user);

if (loading) {
  return (
    <>
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 z-50">
    <FadeLoader color="#36d7b7" />;
  </div>
    </>
  )
}
  console.log("user",user);
    
  // const account=user.user;
  const { user: account, classes } = user;

  // const { assignments, loading: loadingAssignments } = useFetchAssignments();
  // const { homework, loading: loadingHomework } = useFetchHomework();
  
  // const { name, loading: loadingName } = WelcomeSection();
  // const { messages, loading: loadingMessages } = useFetchRecentMessages();
  // const { announcement, loading: loadingAnoucment } = Anouncment();
  // if (
  // //   loadingAssignments 
  // //   // loadingHomework 
  // //   // loadingName 
  // //   // loadingMessages
  // //   // loadingAnoucment
  // // )
  //   return <div>loading...</div>;
  return (
      <>
    <TeacherNavigation/>

    <div className="w-full h-full text-gray-800 text-customText font-sans">
      <div className="container grid grid-rows-4-auto gap-5 p-5 mx-auto max-w-none pt-12">
     
       <nav className="nav"></nav>
        <div className="welcome-sec flex shadow-md border-b border-gray-300 bg-[#008DDA] rounded-lg">
          <div>
            <Lottie
              animationData={animationData}
              className="lottie w-[200px] h-[200px]"
            />
          </div>
          <div className="name p-5 rounded-lg text-[#FCF5ED] w-full h-50 ">
        
        <div key={user.user_id} className="namee">
          <p className="text-start shadow-md text-lg md:text-xl font-bold">
            
              Welcome {account.first_name}-{account.last_name}! </p>
            
            {/* <p>Ready to inspire brilliance today?</p> */}
            <p className="text-xl hidden md:block ring-sky-700">As an educator, you play a pivotal role in shaping the minds of tomorrow. </p>
        
          
        </div>
      
    </div>
          </div>

       
          </div>

          {/* <div>Homepage</div> */}

          <div className="cont flex gap-20 mr-14-10">
          <div className="section bg-white rounded-lg shadow p-5 w-[270px] h-fit">
            <h2 className="sec-title text-2xl font-semibold text-blue-500 mb-4">
              Sections Taught
            </h2>
            {classes && classes.length > 0 ? (
            <ul>
              {classes.map((cls) => (
                <li
                  key={cls.id}
                  className="bg-gray-100 mb-2 p-4 rounded-md cursor-pointer hover:bg-gray-200"
                  onClick={() => navigate(`/teacher/students/${cls.grade.grade}/${cls.section.section}`, { state: { grade: cls.grade.grade } })} 
                >
                  Grade: {cls.grade.grade}, Section: {cls.section.section},{" "}
                  Subject: {cls.subject.subject}
                </li>
              ))}
            </ul>
          ) : (
            <p>No sections to display.</p>
          )}
          </div>
          <section>
        <div className="resources bg-white rounded-lg shadow p-5 w-[400px]">
   <div className="flex justify-between">
   <h2 className="text-2xl font-semibold text-blue-500 mb-4">Resource Links</h2>
    <p>See all</p>
   </div>
  <ul className="resource-list">
    <li><a href="#">Educational Websites</a></li>
    <li><a href="#">Teaching Materials</a></li>
  </ul>
</div>

        </section>
        </div>
       

          <div>




{/*           
          <div className="assignment bg-white rounded-lg shadow p-5 w-[400px] h-fit">
            <h2 className="ass-title text-2xl font-semibold text-blue-500 mb-4">
              Assignmensts given
            </h2>
            {assignments.length > 0 ? (
              <ul>
                {assignments.map((assignment) => (
                  <li
                    key={assignment.id}
                    // className="card"
                    className="bg-gray-100 mb-2 p-4 rounded-md border-l-4 border-blue-800"
                  >
                    <strong>{assignment.title}</strong> -{" "}
                    {assignment.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent assignments found.</p>
            )}
          </div> */}

          {/* <div className="homework bg-white rounded-lg shadow p-5 w-[400px] h-fit">
            <h2 className="hw-title text-2xl font-semibold text-blue-500 mb-4">
              Todays Homework
            </h2>
            {homework.length > 0 ? (
              <ul>
                {homework.map((hw) => (
                  <li
                    key={hw.homework_id}
                    // className="card"
                    className="bg-gray-100 mb-2 p-4 rounded-md border-l-4 border-blue-800"
                  >
                    <strong>{hw.title}</strong> - {hw.description}
                    <br />
               
                  </li>
                ))}
              </ul>
            ) : (
              <p>No homework for today.</p>
            )}
          </div> */}
        
        
       {/* <div className="contt flex justify-around"> 
          <div className="anoucment">
         
          <h1>Announcements</h1>
          {announcement.map((announcement) => (
            <div key={announcement.id}>
              <h2>{announcement.title}</h2>
             
              <p>{announcement.description}</p>
              <button>Read More</button>
            </div>
          ))}
        </div> */}
        {/* </div>
        <div className="conttt flex gap-20">
          <div className="result bg-white rounded-lg shadow p-5 w-[270px] border-l-4 border-blue-800 h-fit">
            <h2 className="result-title text-2xl font-semibold   text-blue-500 mb-4">
              students result
            </h2>
            <button className="result-btn  bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700">
              result
            </button>
          </div>
          <div className="message bg-white rounded-lg shadow p-5 w-[400px] h-fit border-l-4 border-blue-800 ">
            <h2 className="message-title text-2xl font-semibold  text-blue-500 mb-4">
              Recent Messages
            </h2>
            {messages.length > 0 ? (
              messages.map((message) => (
                <div key={message.message_id} className="rounded-md p-4 mb-1">
                  <p>{message.content}</p>
                  <span>{new Date(message.timestamp).toLocaleString()}</span>
                </div>
              ))
            ) : (
              <p>No recent messages.</p>
            )}
          </div> 
          </div> */}
          
      </div>
    </div>
    </>
  );
}

export default TeacherHomePage;
