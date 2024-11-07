
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./PurchasedFavCard.css"; // Asegúrate de importar el archivo CSS
export const PurchasedFavCard = ({ course }) => {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(""); // Estado para almacenar la URL de la imagen

  useEffect(() => {

    const fetchCourse = async () => {
      try {
        
        // Construir la URL de la imagen del curso
        
        const imageResponse = await fetch(
          `http://localhost:3000/uploads/images/${course.media.filename}`,
          {
            method: "GET",
            mode: "cors",
            credentials: "include",
          }
        );
        
        if (!imageResponse.ok) {
          throw new Error("Error al obtener la imagen");
        }

        // Convertir la imagen a Blob y luego a URL
        const imageBlob = await imageResponse.blob();
        setImageUrl(URL.createObjectURL(imageBlob)); // Guardar la URL de la imagen
      } catch (error) {
        console.error("Error al obtener la imagen:", error);
      }
    };
    fetchCourse();

  }, []); 

  const handleCardClick = () => {
    navigate(`/course/${course.id}`);
  };



  return (
    <div className="PurchasedFavCard" onClick={handleCardClick} aria-label={`Ver detalles del curso ${course.title}`}>
      <img className="img-pur" src={imageUrl} alt={`Imagen del curso ${course.title}`} />
      <div className="fav-card-content">
        <h3>{course.title}</h3>
      </div>
    </div>
  );
};
