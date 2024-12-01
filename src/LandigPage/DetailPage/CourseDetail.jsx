import { useEffect, useState } from "react";
import { useParams,useNavigate  } from "react-router-dom";
import "./CourseDetail.css";
import Testimonials from "../Components/Testimonials";
import SubscriptionSection from "../Components/SuscriptionSection";
import PaymentMethods from "../Components/PaymentMethods";
import FAQ from "../Components/FAQ";
import FooterApp from "../Footer/Footer";
import { message} from 'antd';
import foto from "../Components/foto.jpg";
import { useUser } from "../User/UserContext/UserContext";


const CourseDetail = () => {
  const { id } = useParams(); // Obtener el ID del curso desde la URL
  const [course, setCourse] = useState(null); // Estado para almacenar el curso
  const [imageUrl, setImageUrl] = useState(""); // Estado para almacenar la URL de la imagen
  const {user} = useUser();
  const navigate = useNavigate();

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
  const handleBuyNow = () => {
    if (user) {
      if(user.sub != course.instructor.id)
         navigate("/checkout", {
            state: {
              course,
            user,
             },
           });
        else
        {
          message.warning("No puedes comprar tu propio curso", 3);
        }
    } else {
      message.warning("Inicia sesión para comprar un curso.", 3);
    }
  };


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
                <strong>Institucion:</strong> {course.platform}
              </p>
              <p>
                <strong>Tipo de capacitación:</strong> Online
              </p>
              <p>
                <strong>Valoración:</strong> {course.rating} {/* Asegúrate de tener este dato */}
              </p>
              {course.courseTopics.map((courseTopic,index) => (
                <p key={index}>
                  <strong>Topics: </strong> {courseTopic.topic.topic}
                </p>
              ))}
            </div>
          </div>
          <div className="course-price-section">
            <p className="original-price">${course.price * 1.2}</p>
            <p className="discounted-price">${course.price}</p>
            <p className="installments">¡Hasta 12 cuotas!</p>
            <button onClick={handleBuyNow} className="enroll-button">Comprar ahora</button>
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
              Clase {index + 1} : {clase.title}.
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
        { <iframe
         
          src={course.media.videoUrl.replace("watch?v=", "embed/")}
          title="Video del curso"
          style={{ border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe> }
       
      </div>
      </div>
      <Testimonials /> 
      <SubscriptionSection />
      <PaymentMethods />
     
     
      <FAQ />
      <FooterApp />
    </div>
  );
};

export default CourseDetail;
