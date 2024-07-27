import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '../MockCourses/MockCourses';
import './CourseDetail.css';
import Testimonials from '../Components/Testimonials';
import SubscriptionSection from '../Components/SuscriptionSection';
import PaymentMethods from '../Components/PaymentMethods';
import FAQ from '../Components/FAQ';
import FooterApp from '../Footer/Footer';
import Modalities from '../Components/Modalities';
import instructorVideo from '../Components/instructot.video.mp4';
import foto from "../Components/foto.jpg";

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find(course => course.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!course) {
    return <div>Curso no encontrado</div>;
  }

  return (
    <div className="course-detail">
      <div className="course-header" style={{ backgroundImage: `url(${course.image})` }}>
        <div className="course-overlay">
          <h1>{course.title}</h1>
          <h2>For {course.instructor}</h2>
          <h3>{course.duration} Hs</h3>
        </div>
      </div>
      <div className="course-content">
        <div className="course-main-content">
          <section className='course-description'>
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
              <p><strong>Categoría:</strong> {course.category}</p>
              <p><strong>Plataforma:</strong> {course.platform}</p>
              <p><strong>Tipo de capacitación:</strong></p>
              <p><strong>Valoración:</strong> {course.rating}</p>
              <p><strong>Modalidad:</strong></p>
              <p><strong>Precio:</strong> {course.price} dólares</p>
            </div>
          </div>
          <div className="course-price-section">
            <p className="original-price">${course.price * 1.2}</p>
            <p className="discounted-price">${course.price}</p>
            <p className="installments">¡Hasta 12 cuotas!</p>
            <button className="enroll-button">Ver Curso</button>
          </div>
        </div>
      </div>
      <div className='course-plan'>
        <h2><strong>Plan de estudio</strong></h2>
        <ul>
          <li>Clase 1 inserte aqui la informacion sobre la clase</li>
          <li>Clase 2 inserte aqui la informacion sobre la clase</li>
          <li>Clase 3 inserte aqui la informacion sobre la clase </li>
          <li>Clase 4 inserte aqui la informacion sobre la clase </li>
          <li>Clase 5 inserte aqui la informacion sobre la clase</li>
          <li>Clase 6 inserte aqui la informacion sobre la clase</li>
          <li>Clase 7 inserte aqui la informacion sobre la clase</li>
          <li>Clase 8 inserte aqui la informacion sobre la clase</li>
          <li>Clase 9 inserte aqui la informacion sobre la clase</li>
          <li>Clase 10 inserte aqui la informacion sobre la clase</li>
        </ul>
      </div>
      <div className="instructor-section">
        <div className="instructor-info">
          <img src={foto} alt={course.instructor} className="instructor-photo" />
          <div className="instructor-description">
            <h2>Sobre {course.instructor}</h2>
            <p>{course.description}</p>
          </div>
        </div>
        <div className="instructor-video">
          <video controls>
            <source src={instructorVideo} type="video/mp4" />
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

