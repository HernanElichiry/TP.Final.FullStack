
import  ProfesorCoursesCard  from "./ProfesorCoursesCard/PorfesorCoursesCard";
//import {course as mockCourses} from "./ProfesorCoursesCard/Mock";
import './MyCoursesProfessor.css';
import { useEffect, useState } from "react";
import { useUser } from "../UserContext/UserContext";
import Cookies from "js-cookie";


const MyCoursesProfessor = () => {

  const [courses , setCourses] = useState([])
  const user = useUser();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = Cookies.get("token"); // Obtener el token del usuario
       const user_id = user.user.sub;
   
       const response = await fetch(`http://localhost:3000/courses/instructor/${user_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include' // Incluir las cookies si es necesario
      });
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
  <h2>Mis Cursos</h2>
  <div className="courses-grid">
    {courses.length > 0 ? (
      courses.map((course) => (
        <ProfesorCoursesCard key={course.id} course={course} />
      ))
    ) : (
      <p className="no-courses-message">No tiene cursos cargados.</p>
    )}
  </div>
</div>
  );
};

export default MyCoursesProfessor;
