
import  ProfesorCoursesCard  from "./ProfesorCoursesCard/PorfesorCoursesCard";
//import {course as mockCourses} from "./ProfesorCoursesCard/Mock";

import { useEffect, useState } from "react";
import { useUser } from "../UserContext/UserContext";
import Cookies from "js-cookie";
import { PurchasedFavCard } from "./PurchasedFavCard";



export const PurchasedCoursesProf = () => {
    const [courses , setCourses] = useState([])
    const user = useUser();
  
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const token = Cookies.get("token"); // Obtener el token del usuario
         const user_id = user.user.sub;
     
         const response = await fetch(`http://localhost:3000/buy-courses/${user_id}`, {
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
        <div>
        <h2>Mis Cursos</h2>
        <div className="buycourses-grid">
          {courses.length > 0 ? (
            courses.map((course) => (
              <PurchasedFavCard key={course.id} course={course} />
            ))
          ) : (
            <p className="no-courses-message">No tiene cursos Comprados.</p>
          )}
        </div>
      </div>
    );
  };