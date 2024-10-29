import  { useState, useEffect } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showFAQs, setShowFAQs] = useState(false); // Estado para mostrar/ocultar FAQ en móviles
  const [isMobile, setIsMobile] = useState(false); // Estado para detectar si es móvil

  const faqs = [
    {
      question: "¿Cuál es el horario de atención?",
      answer: "Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00.",
    },
    {
      question: "¿Cómo puedo inscribirme en un curso?",
      answer: "Puedes inscribirte en un curso a través de nuestra página web.",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos tarjetas de crédito, débito y PayPal.",
    },
    {
      question: "¿Hay descuentos disponibles?",
      answer: "Sí, ofrecemos descuentos para grupos y estudiantes.",
    },
    {
      question: "¿Se puede obtener un certificado?",
      answer: "Sí, al finalizar el curso recibirás un certificado de participación.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const toggleShowFAQs = () => {
    setShowFAQs(!showFAQs);
  };

  // Detectar si es mobile para controlar el renderizado
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Cambiar a `true` si es mobile
    };

    handleResize(); // Establece el estado inicial al cargar
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="faq">
      <div className="faq-container">
        <h2>Preguntas Frecuentes</h2>

        {/* Mostrar toggle solo en mobile */}
        {isMobile && (
          <div className="faq-mobile-toggle" onClick={toggleShowFAQs}>
            Haz clic para ver las preguntas frecuentes
          </div>
        )}

        {/* Mostrar preguntas en desktop siempre, y en mobile solo si se hace clic */}
        {(showFAQs || !isMobile) && faqs.map((faq, index) => (
          <div key={index} className="faq-item" onClick={() => toggleFAQ(index)}>
            <div className="faq-question">
              <span>{faq.question}</span>
              <span className={`arrow ${activeIndex === index ? 'open' : ''}`}>&#9660;</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
