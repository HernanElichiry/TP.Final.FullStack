/*import { AlumnoFavCard } from "./AlumnoFavCard";

const course = [
  {
    id: 1,
    image: "https://i.ytimg.com/vi/7TKY-jksHRQ/maxresdefault.jpg",
    title: "Curso de Programación",
    description: "Descripción del curso de programación",
    rating: 5,
    price: "****",
  },
];

const FavoritesAlumno = () => {
  return (
    <div>
      <AlumnoFavCard course={course} />
    </div>
  );
};

export default FavoritesAlumno;*/

import React, { useContext } from 'react';
import { FavoritesContext } from '../FavoritesContext'; // Importar el contexto de favoritos
import { AlumnoFavCard } from '/src/LandigPage/User/User/AlumnoFavCard.jsx'


const FavoritesAlumno = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div>
      {favorites.map((course) => (
        <AlumnoFavCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default FavoritesAlumno;
