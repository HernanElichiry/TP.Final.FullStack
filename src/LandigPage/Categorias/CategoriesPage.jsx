import { message } from "antd";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductCard } from "../Carousel/Card/ProductCard"; 
import './categoriesRow.css'; // Asegúrate de importar el archivo CSS
import { useUser } from "../User/UserContext/UserContext";
import { FavoritesContext } from "../User/FavoritesContext";

function CategoriesPage() {
  const { categoryName } = useParams(); // Obtiene la categoría de la URL
  const [courses, setCourses] = useState([]); // Estado para guardar los cursos
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de errores
  const { user } = useUser();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/courses/category/${categoryName}`);
        if (!response.ok) throw new Error(`No tenemos cursos de la categoria ${categoryName}`);
        const data = await response.json();
        setCourses(data);
        
      } catch (err) {
        message.error("Cursos no encontrados");
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [categoryName]);

  if (isLoading) return <p>Cargando cursos...</p>;
  if (error) return <p className="h1category-title">{error}</p>;

  return (
    <div className="search-results">
      <h1 className="h1category-title">Cursos en la categoría: {categoryName}</h1>
      <div className="product-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <ProductCard key={course.id}
            product={course}
            onFavoriteToggle={user ? toggleFavorite : null}
            isFavorited={
              user ? favorites.some((fav) => fav.id === course.id) : false
            }
            user={user} />
          ))
        ) : (
          <p>No hay cursos en esta categoría.</p>
        )}
      </div>
    </div>
  );
}

export default CategoriesPage;
