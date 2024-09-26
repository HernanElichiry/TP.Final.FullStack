import React, { useState } from 'react';
import './ProfessorCoursePlataform.css';

const courseData = {
  courseName: "curso avanzado de programación",
  courseDescription: "Curso para aprender los conceptos avanzados de programación.",
  courseDuration: "50",
  category: "Programación",
  presentationVideo: "https://example.com/path/to/presentation_video.mp4",
  backgroundImage: "https://example.com/path/to/background_image.jpg",
  startDate: "2024-01-10",
  endDate: "2024-04-10",
  noDate: false,
  selectedTopics: ["JavaScript", "React", "Node.js"],
  classes: [
    {
      id: "class-1",
      video: {
        id: "video-1",
        name: "Introducción a la programación avanzada",
        url: "https://example.com/path/to/class1_video.mp4"
      },
      file: {
        name: "introduccion.pdf",
        url: "https://example.com/path/to/class1_file.pdf"
      },
      classname: "Introducción"
    },
    {
      id: "class-2",
      video: {
        id: "video-2",
        name: "Funciones y Closures",
        url: "https://example.com/path/to/class2_video.mp4"
      },
      file: {
        name: "funciones.pdf",
        url: "https://example.com/path/to/class2_file.pdf"
      },
      classname: "Funciones y Closures"
    },
    {
      id: "class-3",
      video: {
        id: "video-3",
        name: "Asincronía en JavaScript",
        url: "https://example.com/path/to/class3_video.mp4"
      },
      file: {
        name: "asincronia.pdf",
        url: "https://example.com/path/to/class3_file.pdf"
      },
      classname: "Asincronía en JavaScript"
    },
    {
      id: "class-4",
      video: {
        id: "video-4",
        name: "Programación Orientada a Objetos",
        url: "https://example.com/path/to/class4_video.mp4"
      },
      file: {
        name: "poo.pdf",
        url: "https://example.com/path/to/class4_file.pdf"
      },
      classname: "Programación Orientada a Objetos"
    },
    {
      id: "class-5",
      video: {
        id: "video-5",
        name: "Manejo de Errores y Excepciones",
        url: "https://example.com/path/to/class5_video.mp4"
      },
      file: {
        name: "errores.pdf",
        url: "https://example.com/path/to/class5_file.pdf"
      },
      classname: "Manejo de Errores y Excepciones"
    },
    {
      id: "class-6",
      video: {
        id: "video-6",
        name: "Patrones de Diseño",
        url: "https://example.com/path/to/class6_video.mp4"
      },
      file: {
        name: "patrones.pdf",
        url: "https://example.com/path/to/class6_file.pdf"
      },
      classname: "Patrones de Diseño"
    },
    {
      id: "class-7",
      video: {
        id: "video-7",
        name: "Uso de APIs",
        url: "https://example.com/path/to/class7_video.mp4"
      },
      file: {
        name: "apis.pdf",
        url: "https://example.com/path/to/class7_file.pdf"
      },
      classname: "Uso de APIs"
    },
    {
      id: "class-8",
      video: {
        id: "video-8",
        name: "Introducción a React",
        url: "https://example.com/path/to/class8_video.mp4"
      },
      file: {
        name: "react_intro.pdf",
        url: "https://example.com/path/to/class8_file.pdf"
      },
      classname: "Introducción a React"
    },
    {
      id: "class-9",
      video: {
        id: "video-9",
        name: "React Hooks",
        url: "https://example.com/path/to/class9_video.mp4"
      },
      file: {
        name: "hooks.pdf",
        url: "https://example.com/path/to/class9_file.pdf"
      },
      classname: "React Hooks"
    },
    {
      id: "class-10",
      video: {
        id: "video-10",
        name: "Aplicaciones Fullstack con Node.js",
        url: "https://example.com/path/to/class10_video.mp4"
      },
      file: {
        name: "fullstack.pdf",
        url: "https://example.com/path/to/class10_file.pdf"
      },
      classname: "Aplicaciones Fullstack con Node.js"
    }
  ]
};


const CoursePlatform = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [expandedClassIndex, setExpandedClassIndex] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const toggleClassContent = (index) => {
    setExpandedClassIndex(expandedClassIndex === index ? null : index);
    if (expandedClassIndex !== index) {
      setSelectedClass(courseData.classes[index]);
    }
  };

  return (
    <div className="course-platform">
      {/* Sección izquierda: lista de clases */}
      <div className="course-list-container">
        <div className="course-details">
          <h1>{courseData.courseName}</h1>
          <p>Fecha de Inicio: {courseData.startDate}</p>
          <p>Fecha de Finalización: {courseData.endDate}</p>

          <h2>Clases</h2>
          <ul className="course-list">
            {courseData.classes.map((classItem, classIndex) => (
              <li key={classIndex} className="class-section">
                <div>
                  <h3 onClick={() => toggleClassContent(classIndex)}>
                    {classItem.classname}
                  </h3>
                </div>
                <div className={`class-content ${expandedClassIndex === classIndex ? 'open' : ''}`}>
                  <div className="class-video">
                    <p onClick={() => setSelectedVideo(classItem.video.url)}>
                      {classItem.video.name}
                    </p>
                  </div>
                  <div className="attachment-item">
                    <a href={classItem.file.url} target="_blank" rel="noopener noreferrer">
                      {classItem.file.name}
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sección derecha: reproductor de video */}
      <div className="video-player">
        {selectedVideo ? (
          <>
            <video controls>
              <source src={selectedVideo} type="video/mp4" />
              Tu navegador no soporta la etiqueta de video.
            </video>
            <div className="video-actions">
              {selectedClass && (
                <>
                  <a
                    href={selectedClass.file.url}
                    className="btn download-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Descargar Material
                  </a>
                  <button className="btn completed-btn">Clase Completada</button>
                  <button className="btn query-btn">Hacer Consulta al Profesor</button>
                </>
              )}
            </div>
          </>
        ) : (
          <p>Selecciona un video para reproducir</p>
        )}
      </div>
    </div>
  );
};

export default CoursePlatform;
