import './Components.css';
import foto from './foto.jpg';
import { useState } from 'react';

const testimonials = [
  { name: "Sandra de Córdoba", rating: 5, message: "¡Increíble experiencia! Los cursos y capacitaciones fueron muy profesionales y el personal fue amable. Definitivamente lo recomendaré a mis amigos.", image: foto },
  { name: "Juan de Buenos Aires", rating: 5, message: "Estoy asombrado. Nunca pensé que aprender programación sería tan emocionante. ¡Gracias por la oportunidad!", image: foto },
  { name: "Marta de Mendoza", rating: 5, message: "¡La mejor decisión que he tomado! La capacitación en marketing digital fue única e inolvidable.", image: foto },
  { name: "Carlos de Salta", rating: 5, message: "Nunca olvidaré la sensación de logro que experimenté al completar el curso de diseño gráfico. ¡Fue una experiencia que cambiará mi vida para siempre!", image: foto },
  { name: "Laura de Rosario", rating: 5, message: "Increíblemente emocionante. La calidad de los cursos es impresionante y el equipo hizo que todo fuera muy accesible. Definitivamente tomaré más cursos en el futuro.", image: foto },
];

const Testimonials = () => {
  const [visibleIndexes, setVisibleIndexes] = useState({});

  const toggleVisibility = (index) => {
    setVisibleIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section id="testimonios">
      <h2 className='titulo'>Más de 150.000 valoraciones positivas</h2>
      <div className="testimonio-container">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonio">
            <div className="testimonio-header">
              <img src={testimonial.image} alt={testimonial.name} className="testimonio-image" />
              <p><strong>{testimonial.name}</strong></p>
            </div>
            <div className="rating">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span key={i} className="star">&#9733;</span>
              ))}
            </div>
            <button className="toggle-button" onClick={() => toggleVisibility(index)}>
              {visibleIndexes[index] ? 'Ocultar comentario' : 'Ver comentario'}
            </button>
            {visibleIndexes[index] && <p>{testimonial.message}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;