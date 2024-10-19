import React, { createContext, useState } from 'react';
import { useUser } from './UserContext/UserContext';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user } = useUser(); // Obtener el usuario desde el contexto

  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      console.log('Usuario que agregó a favoritos:', user);
     

      if (prevFavorites.some((fav) => fav.id === product.id)) {
        return prevFavorites.filter((fav) => fav.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
