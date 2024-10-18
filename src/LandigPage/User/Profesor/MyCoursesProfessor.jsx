import React from "react";
import  ProfesorCoursesCard  from "./ProfesorCoursesCard/PorfesorCoursesCard";
import {course as mockCourses} from "./ProfesorCoursesCard/Mock";
import './MyCoursesProfessor.css';

/*Logica para la base de datos
es suficiente traer los cursos desde la base de datos en el componente MyCoursesProfessor y luego, al hacer clic en la tarjeta del curso, redirigir al componente de la plataforma de edición (CoursePlatform) con el id del curso. Aquí están los pasos clave:

En MyCoursesProfessor:

Traes los cursos de la base de datos (por ejemplo, usando un hook como useEffect para hacer una llamada a la API).
Renderizas las tarjetas de curso con ProfesorCoursesCard.
En ProfesorCoursesCard:

Al hacer clic en la tarjeta, rediriges al usuario a una URL que incluye el id del curso (/course-platform/${course.id}).
En CoursePlatform:

Recuperas el id del curso desde los parámetros de la URL (puedes usar useParams() de React Router).
Usas el id para hacer una llamada a la base de datos y obtener los detalles del curso.
Rellenas el formulario de edición con los datos del curso y permites la edición.*/

const MyCoursesProfessor = () => {
  return (
    <div className="my-courses-container">
      <h2>My Courses</h2>
      <div className="courses-grid">
        {mockCourses.map((course) => (
          <ProfesorCoursesCard key={course.id} course={course} />
        ))}
        
        
      </div>
    </div>
  );
};

export default MyCoursesProfessor;
