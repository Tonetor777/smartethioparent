// import React from 'react'
import PropTypes from 'prop-types';
import { useState } from 'react';


const ResourceCard = ({resources,downloadResource}) => {
 
    const [hover, setHover] = useState(false);
    const handleMouseEnter = (id) => {
      setHover(prev => ({ ...prev, [id]: true }));
    };
    
    const handleMouseLeave = (id) => {
      setHover(prev => ({ ...prev, [id]: false }));
    };
  return (
   <>
    <div className="flex flex-wrap mx-10 gap-4" >
  {resources.map((resource) => (
    <div
      key={resource.id}
      className="bg-white rounded-lg flex flex-col gap-4 space-y-2 justify-between shadow p-3 h-[200px] m-4 "
      style={{ width: "260px", textAlign: "center"}}
    >
      <h3 className="text-2xl  font-bold p-0 mb-2 text-start" style={{fontSize:"20px"}}>{resource.title}</h3>
      <p className="text-1xl font-semibold p-0 pl-2 mb-2">Grade: {resource.grade}</p>
      <button
    
        style={{
          backgroundColor: hover[resource.id] ? "#1E90FF" : "#0349fc",
          color: "white",
          border: "none",
          padding: "8px 15px",
          borderRadius: "5px",
          cursor: "pointer",
         
       
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
        }}
        onClick={() => downloadResource(resource.id, resource.title)}
        onMouseEnter={() => handleMouseEnter(resource.id)}
            onMouseLeave={() => handleMouseLeave(resource.id)}
      >
        Download
      </button>
    </div>
  ))}
</div>

   </>
  )
}
ResourceCard.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      grade: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired
  })).isRequired,
  downloadResource: PropTypes.func.isRequired
};

export default ResourceCard;