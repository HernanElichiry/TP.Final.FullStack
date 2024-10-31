
import  ProfesorCoursesCard  from "./ProfesorCoursesCard/PorfesorCoursesCard";
//import {course as mockCourses} from "./ProfesorCoursesCard/Mock";
import './MyCoursesProfessor.css';
import { useEffect, useState } from "react";


const MyCoursesProfessor = () => {

  const [courses , setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/courses"); // URL de la API
        const data = await response.json();
        setCourses(data);
  
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };
  
    fetchCourses();
  }, []); // Se ejecuta una vez al montar el componente



  return (
    <div className="my-courses-container">
      <h2></h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <ProfesorCoursesCard key={course.id} course={course} />
        ))}
        
      </div>
    </div>
  );
};

export default MyCoursesProfessor;
