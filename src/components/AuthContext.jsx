
// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants.jsx';
import { useNavigate } from 'react-router-dom';
import api from '../api.jsx';
const AuthContext = createContext();

function getUserDataFromToken(accessToken) {
    const tokenParts = accessToken.split('.');
    const encodedPayload = tokenParts[1];
    const decodedPayload = JSON.parse(atob(encodedPayload));
    return decodedPayload;
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    async function fetchParentInfo(id) {
        const URL = import.meta.env.VITE_API_URL
        try {
            const response = await axios.get(`${URL}/api/parent/${id}/dashboard/`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error('Error fetching parent info:', error);
            return null;
        }
    }

    async function fetchTeacherInfo(id) {
      const URL = import.meta.env.VITE_API_URL
        try {
            const response = await api.get(`${URL}/api/teachers/?id=${id}`);
            console.log(response.data)
            return response.data;

        } catch (error) {
            console.error('Error fetching teacher info:', error);
            return null;
        }
    }

    async function fetchRecentMessages(id) {
        try {
            const response = await api.get(`/messages/?receiver_id=${id}`);
            console.log(response.data)
            return response.data;


        } catch (error) {
            console.error('Error fetching messages', error);
            return null;
        }
    }

    async function fetchClasses(id){
      const URL = import.meta.env.VITE_API_URL
        try {
            const response = await axios.get(`${URL}/api/class-subjects/?teacher=${id}`);
            console.log(response.data);
            return response.data;
          } catch (error) {
            console.error("Error fetching class-subjects:", error);
            return [];

    }

}


    const login = async (email, password) => {
        const URL = import.meta.env.VITE_API_URL
        try {
            const res = await axios.post(`${URL}/api/token/`, { email, password });
            const accessToken = res.data.access;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            const userData = getUserDataFromToken(accessToken);
            const id = userData.user_id;
            const response = await api.get(`/api/user/?id=${id}`);
            const userInfo = response.data[0];
            let user = { user_id: id, role: userInfo.role, user: userInfo };
            console.log(userInfo.role)
            if (userInfo.role === 'parent') {
                const parentInfo = await fetchParentInfo(id);
                user = { ...user, parentInfo };
            } else if (userInfo.role === 'teacher') {
                const teacherInfo = await fetchTeacherInfo(id);
                user = { ...user, teacherInfo };
            }
            setUser(user);
            switch (user.role) {
                case 'parent':
                    navigate("/parent/home");
                    break;
                case 'teacher':
                    navigate("/teacher/home");
                    break;
                case 'admin':
                    navigate("/admin");
                    break;
                default:
                    navigate("/");
                    break;
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        setUser(null);
        navigate('/login');
    };

useEffect(() => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
            const userData = getUserDataFromToken(accessToken);
            const id = userData.user_id;
            console.log(userData)
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/user/?id=${id}`);
                    const userInfo = response.data[0];
                    console.log(userData)
                    let user = { user_id: id, role: userInfo.role, user: userInfo };
                    console.log(user)
                    if (userInfo.role === 'parent') {
                        const parentInfo = await fetchParentInfo(id);
                        const recentMessages = await fetchRecentMessages(id);
                        user = { ...user, parentInfo , recentMessages};
                        console.log(user)
                    } else if (userInfo.role === 'teacher') {
                        console.log(user.user_id)
                        const teacherInfo = await fetchTeacherInfo(user.user_id);
                        console.log(teacherInfo)
                        const teacher_id = teacherInfo[0].id
                        const classes = await fetchClasses(teacher_id)
                        user = { ...user, teacherInfo , classes };
                        console.log(user)
                    }
                    setUser(user);
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            };
            fetchData();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };