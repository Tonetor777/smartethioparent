import  { useState, useEffect } from "react";
import axios from "axios";
import ResourceCard from "../../Admin/Resource/ResourceCard";
import api from "../../../api";
import ParentNavigation from "../../../components/parentNavigation";
import Footer from "../../../components/Footer/Footer";

export const ResourceParent = () => {

  const [resources, setResources] = useState([]);
 
  const fetchResources = async () => {
    try {
      const response = await api.get("/api/resource/");
      setResources(response.data);
      console.log(resources)
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
    <div>
      <ParentNavigation />
        <div className="mt-[100px] w-[80%] mx-auto">
          <div>
            <h1 className="text-center text-3xl text-blue-700 font-mono font-bold underline mb-16">Resources</h1>
          </div>
       {resources.length > 0 ? (
        <div>
            <ResourceCard resources={resources} downloadResource={downloadResource} />
        
        </div>
      
      ) : (
        <p>No resources found.</p>
      )}
    </div>
    <Footer />
    </div>
  )
}
export default ResourceParent;