import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./PurchasedFavCard.css";

export const PurchasedFavCard = ({ course, setSelectedId, isExpanded = false }) => {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchCourseImage = async () => {
            try {
                const imageResponse = await fetch(
                    `http://localhost:3000/uploads/images/${course.media.filename}`,
                    { method: "GET", mode: "cors", credentials: "include" }
                );

                if (!imageResponse.ok) throw new Error("Error al obtener la imagen");

                const imageBlob = await imageResponse.blob();
                setImageUrl(URL.createObjectURL(imageBlob));
            } catch (error) {
                console.error("Error al obtener la imagen:", error);
            }
        };
        fetchCourseImage();
    }, [course.media.filename]);





  useEffect(() => {
    const fetchImage = async () => {
      // Construir la URL de la imagen del curso
      const imageResponse = await fetch(`http://localhost:3000/uploads/images/${course.media.filename}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });
      // Convertir la imagen a Blob y luego a URL
      const imageBlob = await imageResponse.blob();
      setBackgroundImageFile(URL.createObjectURL(imageBlob)); // Guardar la URL de la imagen
    }

    fetchImage();
  }, []);



    return (
        <motion.div
            className={`PurchasedFavCard ${isExpanded ? "expanded" : ""}`}
            layoutId={course.id}
            onClick={() => setSelectedId(isExpanded ? null : course.id)}
        >
            <img className="img-pur" src={imageUrl} alt={`Imagen del curso ${course.title}`} />
            <div className="fav-card-content">
                <h3>{course.title}</h3>
                {isExpanded && (
                    <div className="expanded-content">
                        <p>{course.description}</p>
                        <button onClick={() => setSelectedId(null)}>Cerrar</button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};