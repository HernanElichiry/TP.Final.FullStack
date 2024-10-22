import  { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [openQuestions, setOpenQuestions] = useState([]);

  const toggleQuestion = (index) => {
    setOpenQuestions((prevState) =>
      prevState.includes(index)
        ? prevState.filter((qIndex) => qIndex !== index)
        : [...prevState, index]
    );
  };

  const questionsAndAnswers = [
    {
      question: "¿Qué cursos ofrecen?",
      answer:
        "Ofrecemos una amplia variedad de cursos en diferentes áreas, incluyendo tecnología, negocios, arte, y más.",
    },
    {
      question: "¿Cómo me inscribo en un curso?",
      answer:
        "Puedes inscribirte en un curso registrándote en nuestra plataforma y luego seleccionando el curso de tu interés.",
    },
    {
      question: "¿Cuál es el costo de los cursos?",
      answer:
        "El costo de los cursos varía según el contenido y la duración. Puedes encontrar esta información en la página de cada curso.",
    },
    {
      question: "¿Puedo obtener un certificado?",
      answer:
        "Sí, ofrecemos certificados para la mayoría de nuestros cursos una vez que los completes con éxito.",
    },
  ];

  return (
    <div className="faq">
      <div className="faq-container">
        <h2>
          <p>Preguntas Frecuentes</p>
        </h2>
        {questionsAndAnswers.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleQuestion(index)}>
              {item.question}
              <span
                className={`arrow ${
                  openQuestions.includes(index) ? "open" : ""
                }`}
              >
                &#9662;
              </span>
            </div>
            {openQuestions.includes(index) && (
              <div className="faq-answer">{item.answer}</div>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
