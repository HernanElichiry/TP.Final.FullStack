import React from 'react';
import './ProfesorCoursesCard.css'; 

const ProfesorCoursesCard = ({ course }) => {
  
  const handleClick = () => {
    window.open(`/course-platform/${course.id}`, '_blank'); // Abre en una nueva pestaña
  };

  return (
    <div className="profesor-course-card" onClick={handleClick}>
      <img src={course.imageUrl} alt={course.name} className="course-image" />
      <div className="course-info">
        <h2 className="course-title">{course.name}</h2>
        <p className="course-details">
          {course.classCount} Clases - {course.totalHours} Horas
        </p>
      </div>
    </div>
  );
};

export default ProfesorCoursesCard;