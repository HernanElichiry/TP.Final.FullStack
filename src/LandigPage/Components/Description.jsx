import React from 'react';
import './Components.css';



const Description = () => (
  <section className="description-section">
   {/* <h1>Que es Einstein?</h1> 
    <p>Se trata de un buscador global de contenido educativo</p>*/}
    <h3>Explora Nuestras Oportunidades de Aprendizaje Conviértete en un Experto</h3>
    <div className="description-row">
      <div className="description-column">
        <h4><strong>Cursos Online</strong></h4>
        <p>Accede a una amplia variedad de cursos online en diferentes áreas de conocimiento.</p>
      </div>
      <div className="description-column">
        <h4><strong>Carreras Universitarias</strong></h4>
        <p>Obtén títulos reconocidos a través de nuestras carreras profesionales y técnicas.</p>
      </div>
      <div className="description-column">
        <h4><strong>Capacitaciones Especializadas</strong></h4>
        <p>Participa en capacitaciones cortas diseñadas para mejorar habilidades específicas.</p>
      </div>
      <div className="description-column">
        <h4><strong>Profesores particulares</strong></h4>
        <p>Aprende de instructores y profesionales con experiencia en el campo.</p>
      </div>
    </div>
  </section>
);

export default Description;

