import { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "¿Cuál es el horario de atención?",
      answer:
        "Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00.",
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
      answer:
        "Sí, al finalizar el curso recibirás un certificado de participación.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq">
      <div className="faq-container">
        <h2>Preguntas Frecuentes</h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="faq-item"
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <span>{faq.question}</span>
              <span className={`arrow ${activeIndex === index ? "open" : ""}`}>
                &#9660;
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
