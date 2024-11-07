import { createContext, useState, useEffect } from 'react';
import { useUser } from './UserContext/UserContext';
import Cookies from 'js-cookie';
export const FavoritesContext = createContext();
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useUser(); // Obtener el usuario desde el contexto

  // Función para cargar los favoritos del usuario desde el backend
  const loadFavorites = async () => {
    const token = Cookies.get('token');
    try {
      const response = await fetch(`http://localhost:3000/favorites/${user.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token de autenticación si es necesario
        },
      });
      const data = await response.json();
      setFavorites(data); // Aquí asumimos que `data` es un array de los cursos favoritos
    } catch (error) {
      console.error('Error al cargar los favoritos:', error);
    }
  };

  // Hacer el fetch cuando el componente se monta para obtener los favoritos del usuario
  useEffect(() => {
    if (user && user.sub) {
      loadFavorites(); // Solo cargamos los favoritos si el usuario está logeado
    }
  }, [user]);

  const toggleFavorite = (course) => {
    setFavorites((prevFavorites) => {
      const token = Cookies.get('token');
      const isFavorite = prevFavorites.some((fav) => fav.id === course.id);
      const url = `http://localhost:3000/favorites/${user.sub}/${course.id}`;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Incluye el token si es necesario
        },
        
      })
        .then((response) => response.json())
        .then((data) => {

          if (data) {
            setFavorites([...prevFavorites, course]); // Agregar curso a favoritos
          } else {
            setFavorites(prevFavorites.filter((fav) => fav.id !== course.id)); // Eliminar curso de favoritos
          }
        })
        .catch((error) => console.error('Error al alternar favorito:', error));

      return prevFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};