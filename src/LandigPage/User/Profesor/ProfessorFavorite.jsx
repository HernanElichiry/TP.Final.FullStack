



import { useContext } from 'react';
import { FavoritesContext } from '../FavoritesContext'; // Importar el contexto de favoritos
import { FavCardProfessor } from "./ProfessorFavCard";


const FavoritesProfessor = () => {
  const { favorites } = useContext(FavoritesContext);

  
  return (
    <div>
      {favorites.map((course) => (
        <FavCardProfessor key={course.id} course={course} />
      ))}
    </div>
  );
};

export default FavoritesProfessor;