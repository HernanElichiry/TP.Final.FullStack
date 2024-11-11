import React, { useState, useEffect } from 'react'; 
import './UserCoursePlatform.css';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

const CoursePlatform = () => {
    const { id } = useParams(); // Aquí obtenemos el parámetro 'id' de la URL
    const { courseName, startDate, endDate } = JSON.parse(sessionStorage.getItem('courseData'));
    
    // Estado para gestionar los datos del curso
    const [courseData, setCourseData] = useState(null); // Inicialmente no hay datos
    const [isLoading, setIsLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado para manejar errores
    
    // Traer los datos del backend
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:3000/classes/bycourseid/${id}`); // Llamada a la API con el ID
                if (!response.ok) {
                    throw new Error('No se pudo obtener los datos');
                }
                const data = await response.json(); // Convertir la respuesta a JSON
                console.log('Datos antes de almacenar en el estado:', data);

                const transformedData = {
                    courseName: courseName || "", 
                    startDate: startDate || "",
                    endDate: endDate || "",
                    classes: data.map((cls) => ({
                        classname: cls.title,
                        id: cls.id,
                        videourl: cls.videourl,
                        fileurl: cls.fileurl && cls.fileurl !== "no se recibio ningun archivo"
                            ? `http://localhost:3000/uploads/files/${cls.fileurl}`
                            : null, // Si no hay archivo, asignamos null
                    }))
                };

                setCourseData(transformedData); // Almacenamos los datos transformados en el estado
            } catch (error) {
                console.error('Error al obtener los datos del curso:', error);
                setError(error.message); // Capturamos el error y lo guardamos en el estado
            } finally {
                setIsLoading(false); // Terminamos de cargar
            }
        };

        fetchCourse(); // Ejecutar la llamada a la API
    }, [id, courseName, startDate, endDate]); // Ejecutar cuando el ID o los datos cambien

    // Estado para manejar la clase seleccionada
    const [expandedClassIndex, setExpandedClassIndex] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null); // Selecciono la clase para visualizar

    const toggleClassContent = (index) => {
        setExpandedClassIndex(expandedClassIndex === index ? null : index);
        if (expandedClassIndex !== index) {
            setSelectedClass(courseData.classes[index]);
        }
    };

    if (isLoading) {
        return <p> Cargando...</p>; // Evita renderizar si los datos aún no están disponibles
    }

    if (error) {
        return <p>Error: {error}</p>; // Muestra el error si hay problemas
    }

    return (
        <div className="course-platform">
            <div className="course-list-container">
                <div className="course-dates">
                    <h1>{courseData.courseName}</h1>
                    <p>Fecha de Inicio: {courseData.startDate}</p>
                    <p>Fecha de Finalización: {courseData.endDate}</p>
                    <ul className="course-list">
                        {courseData.classes.map((classItem, classIndex) => (
                            <li key={classItem.id} className="class-section">
                                <div>
                                    <h3 onClick={() => toggleClassContent(classIndex)}> Clase {classIndex + 1}</h3>
                                </div>
                                <div className={`class-content ${expandedClassIndex === classIndex ? 'open' : ''}`}>
                                    <div className="class-video">
                                        <h2>{classItem.classname}</h2>
                                    </div>
                                    <div className="attachment-item">
                                        {classItem.fileurl && (
                                            <a href={classItem.fileurl} target="_blank" rel="noopener noreferrer">
                                                Material descargable
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="video-player">
                <ReactPlayer
                    url={selectedClass?.videourl || `https://via.placeholder.com/800x450?text=No+Video+Available`}
                    controls
                    width="100%"
                    height="85%"
                />
            </div>

        </div>
    );
};

export default CoursePlatform;
