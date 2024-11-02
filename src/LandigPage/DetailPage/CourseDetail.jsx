import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CourseDetail.css";
import Testimonials from "../Components/Testimonials";
import SubscriptionSection from "../Components/SuscriptionSection";
import PaymentMethods from "../Components/PaymentMethods";
import FAQ from "../Components/FAQ";
import FooterApp from "../Footer/Footer";
import Modalities from "../Components/Modalities";
import foto from "../Components/foto.jpg";


const CourseDetail = () => {
  const { id } = useParams(); // Obtener el ID del curso desde la URL
  const [course, setCourse] = useState(null); // Estado para almacenar el curso
  const [imageUrl, setImageUrl] = useState(""); // Estado para almacenar la URL de la imagen


  useEffect(() => {
    window.scrollTo(0, 0);



    const fetchCourse = async () => {
      try {
        // Solicitud GET para obtener el curso por ID
        const response = await fetch(`http://localhost:3000/courses/${id}`, {
          method: "GET",
          mode: "cors", // Permitir solicitudes entre diferentes orígenes
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

        // Convertir la imagen a Blob y luego a URL
        const imageBlob = await imageResponse.blob();
        setImageUrl(URL.createObjectURL(imageBlob)); // Guardar la URL de la imagen
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
            <p>{course.category.requisitos || ""}</p> {/* Asegúrate de tener un campo diferente si es necesario */}
            <h2>Certificación</h2>
            <p>{course.category.certificacion || "" }</p> {/* Asegúrate de tener un campo diferente si es necesario */}
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
                <strong>Tipo de capacitación:</strong> {course.type} {/* Asegúrate de tener este dato */}
              </p>
              <p>
                <strong>Valoración:</strong> {course.rating} {/* Asegúrate de tener este dato */}
              </p>
              {course.courseTopics.map((courseTopic,index) => (
                <p key={index}>
                  <strong>Topics: </strong> {courseTopic.topic.topic}
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
          {course.classes.map((clase,index) => (
            <li key={index}>
              Clase: {clase.title}
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
            <p>{course.instructor.description}</p> {/* Asegúrate de tener un campo para la descripción del instructor */}
          </div>
        </div>
        <div className="instructor-video">
        { <iframe
          width="560"
          height="315"
          src={course.media.videoUrl.replace("watch?v=", "embed/")}
          title="Video del curso"
          style={{ border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe> }
        <video></video>
      </div>
      </div>
      <Testimonials />
      <PaymentMethods />
     
      <SubscriptionSection />
      <FAQ />
      <FooterApp />
    </div>
  );
};

export default CourseDetail;
