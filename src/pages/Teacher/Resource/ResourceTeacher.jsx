import { useState, useEffect } from "react";
import axios from "axios";
import ResourceCard from "../../Admin/Resource/ResourceCard";
import TeacherNavigation from "../../../components/TeacherNavigation";
export const ResourceTeacher = () => {
  const [resources, setResources] = useState([]);

  const fetchResources = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/resource/");
      setResources(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);
  const downloadResource = async (resourceId, resourceTitle) => {
    try {
      const downloadUrl = `http://127.0.0.1:8000/api/resource/${resourceId}/download/`;
      const response = await axios.get(downloadUrl, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: response.data.type });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", resourceTitle);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    < TeacherNavigation />
          <div>
            <h1 className="text-center text-3xl text-blue-700 font-mono font-bold underline mb-16 mt-[100px]">Resources</h1>
          </div>
      
    <div className="h-auto bg-gray-100 min-h-screen text-gray-800 text-customText font-sans w-[70%] mx-auto">
      {resources.length > 0 ? (
        <div>
          <ResourceCard
            resources={resources}
            downloadResource={downloadResource}
          />
        </div>
      ) : (
        <p>No resources found.</p>
      )}
    </div>
    </>
  );
};
export default ResourceTeacher;
