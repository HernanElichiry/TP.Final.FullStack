import { motion } from "framer-motion";
import "./PopupCourseDetail.css"; // Estilos para el popup
import { useEffect, useState } from "react";
import { useUser } from "../UserContext/UserContext";
import { message } from "antd";

export const PopupCourseDetail = ({ course, onClose }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(null);
  const user = useUser();

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

  // Manejador de evento para "Acceder al curso"
  const handleAccessCourse = () => {
    sessionStorage.setItem('courseData', JSON.stringify(courseData));
    window.open(`/course-user-platform/${course.id}`, '_blank'); // Abre en una nueva pestaña
  };  

  const courseData = {
    courseName: course.title,
    startDate: course.startdate || "00/00/00",
    endDate: course.enddate || "00/00/00"
  };


  // Manejador de evento para enviar la calificación al servidor
  const handleSubmitRating = async () => {
    try {
      const response = await fetch("http://localhost:3000/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          course_id: course.id,
          user_id: user.user.sub,
        }),
      });
      if (response.ok) {
        message.success("Califico el curso correctamente");
        setShowRatingModal(false); // Cierra el modal al enviar
      } else {
        message.error("No puede calificar 2 veces el mismo curso");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <motion.div
        className="popup-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // Cierra el popup si haces clic fuera
      >
        <motion.div
          className="popup-content"
          layoutId={course.id} // Permite la transición fluida
          onClick={(e) => e.stopPropagation()} // Evita que cierre al hacer clic en el contenido
        >
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <motion.img
            className="popup-image"
            src={imageUrl}
            alt={`Imagen del curso ${course.title}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 100 }}
          />
          <h3 className="popup-title">{course.title}</h3>
          <div className="popup-divider"></div>
          <p className="popup-description">{course.description}</p>

          {/* Botones de "Acceder al curso" y "Calificar" */}
          <div className="popup-buttons">
            <motion.button
              className="access-button"
              onClick={handleAccessCourse}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Acceder al curso
            </motion.button>

            <motion.button
              className="rate-button"
              onClick={() => setShowRatingModal(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Calificar
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Modal de calificación */}
      {showRatingModal && (
        <motion.div
          className="rating-modal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={() => setShowRatingModal(false)}
        >
          <motion.div
            className="rating-modal-content"
            onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al hacer clic dentro de él
          >
            <h3 className="popup-h3">Calificar este curso</h3>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.span
                  key={star}
                  onClick={() => setRating(star)}
                  whileHover={{ scale: 1.2 }}
                  style={{
                    fontSize: "2rem",
                    color: star <= rating ? "gold" : "gray",
                    cursor: "pointer",
                  }}
                >
                  ★
                </motion.span>
              ))}
            </div>
            <button onClick={handleSubmitRating}>Enviar </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
