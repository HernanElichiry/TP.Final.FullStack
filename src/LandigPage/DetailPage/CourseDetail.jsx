import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CourseDetail.css";
import Testimonials from "../Components/Testimonials";
import SubscriptionSection from "../Components/SuscriptionSection";
import PaymentMethods from "../Components/PaymentMethods";
import FAQ from "../Components/FAQ";
import FooterApp from "../Footer/Footer";
import Modalities from "../Components/Modalities";
import instructorVideo from "../Components/instructot.video.mp4";
import foto from "../Components/foto.jpg";

const CourseDetail = () => {
  const { id } = useParams(); // Obtener el ID del curso desde la URL
  const [course, setCourse] = useState(null); // Estado para almacenar el curso
  const [imageUrl, setImageUrl] = useState(""); // Estado para almacenar la URL de la imagen
  const [videoUrl, setVideoUrl] = useState(""); // Estado para almacenar la URL del video del instructor

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCourse = async () => {
      try {
        // Solicitud GET para obtener el curso por ID
        const response = await fetch(`http://localhost:3000/courses/${id}`, {
          method: "GET",
          mode: "cors", // Permitir solicitudes entre diferentes orígenes
          credentials: "include", // Incluir credenciales como cookies
        });

        if (!response.ok) {
          throw new Error("Error al obtener el curso");
        }

        const data = await response.json();
        setCourse(data); // Guardar el curso en el estado

        // Construir la URL de la imagen del curso
        const imageResponse = await fetch(
          `http://localhost:3000/uploads/images/${data.media.filename}`,
          {
            method: "GET",
            mode: "cors",
            credentials: "include",
          }
        );

        if (!imageResponse.ok) {
          throw new Error("Error al obtener la imagen");
        }

        const videoResponse = await fetch(
          `http://localhost:3000/uploads/videos/${data.media.videoname}`,
          {
            method: "GET",
            mode: "cors",
            credentials: "include",
          }
        );

        if (!videoResponse.ok) {
          throw new Error("Error al obtener la Video");
        }
        // Convertir la imagen a Blob y luego a URL
        const imageBlob = await imageResponse.blob();
        setImageUrl(URL.createObjectURL(imageBlob)); // Guardar la URL de la imagen
        const videoBlob = await videoResponse.blob();
        setVideoUrl(URL.createObjectURL(videoBlob)); // Guardar la URL del video
      } catch (error) {
        console.error("Error al obtener el curso o la imagen:", error);
      }
    };

    fetchCourse();
  }, [id]); // Ejecutar cada vez que cambie el ID

  if (!course) {
    return <div>Curso no encontrado</div>;
  }

  return (
    <div className="course-detail">
      <div
        className="course-header"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="course-overlay">
          <h1>{course.title}</h1>
          <h2>For {course.instructor.name}</h2>
          <h3>{course.duration} Hs</h3>
        </div>
      </div>
      <div className="course-content">
        <div className="course-main-content">
          <section className="course-description">
            <h2>Sobre el curso</h2>
            <p>{course.description}</p>
            <h2>Requisitos</h2>
            <p>{course.description}</p>
            <h2>Certificación</h2>
            <p>{course.description}</p>
          </section>
        </div>
        <div className="course-sidebar">
          <div className="course-info-section">
            <h2>Detalles del curso</h2>
            <div className="course-details">
              <p>
                <strong>Categoría:</strong> {course.category.name}
              </p>
              <p>
                <strong>Plataforma:</strong> {course.platform}
              </p>
              <p>
                <strong>Tipo de capacitación:</strong>
              </p>
              <p>
                <strong>Valoración:</strong>{" "}
              </p>     
              {course.courseTopics.map((courseTopic, index) => (
                 <p>
                <strong key={index}>Topics: 
                </strong> {courseTopic.topic.topic}
                {index < course.courseTopics.length - 1 }
                </p>
              ))}
             
              <p>
                <strong>Precio:</strong> {course.price} dólares
              </p>
            </div>
          </div>
          <div className="course-price-section">
            <p className="original-price">${course.price * 1.2}</p>
            <p className="discounted-price">${course.price}</p>
            <p className="installments">¡Hasta 12 cuotas!</p>
            <button className="enroll-button">Comprar ahora</button>
          </div>
        </div>
      </div>
      <div className="course-plan">
        <h2>
          <strong>Plan de estudio</strong>
        </h2>
        <ul>
          {course.classes.map((clase, index) => (
            <li key={index}>
              Clase {index + 1}: {clase.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="instructor-section">
        <div className="instructor-info">
          <img
            src={foto}
            alt={course.instructor.name}
            className="instructor-photo"
          />
          <div className="instructor-description">
            <h2>Sobre {course.instructor.name}</h2>
            <p>{course.description}</p>
          </div>
        </div>
        <div className="instructor-video">
          <video
            controls
            onError={(e) => {
              console.error("Error al cargar el video", e);
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </div>
      <Testimonials />
      <PaymentMethods />
      <Modalities />
      <SubscriptionSection />
      <FAQ />
      <FooterApp />
    </div>
  );
};

export default CourseDetail;
