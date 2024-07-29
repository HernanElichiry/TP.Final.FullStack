import React from "react";
import foto from './fotos/Cursos.png';
import cursoBarista from './fotos/curso barista.png';


const MyCoursesUser = () => {
  return (
    <div>
      <h2>My Courses</h2>
      <img src={foto} alt="imagen del curso"  />
      <img src={cursoBarista} alt="imagen del curso"  />
      {/* Aquí iría tu contenido de My Courses */}
    </div>
  );
};

export default MyCoursesUser;
