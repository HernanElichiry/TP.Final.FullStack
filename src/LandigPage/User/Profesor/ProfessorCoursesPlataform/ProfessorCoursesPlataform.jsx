import React, { useState, useEffect } from 'react'; // mas useEffect
import './ProfessorCoursePlataform.css';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const CoursePlatform = () => {
  const { id } = useParams(); // Aquí obtenemos el parámetro 'id' de la URL
  const { courseName, startDate, endDate } = JSON.parse(sessionStorage.getItem('courseData'));
  const [courseData, setCourseData] = useState({
    classes: []
  },
  ); 
  // creamos una variable de estado donde almacenaremos los datos de back

  //traemos los datos del back 
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3000/classes/bycourseid/${id}`); // Llamada a la API con el ID
        const data = await response.json(); // Convertir la respuesta a JSON
        const transformedData = {
          courseName: courseName || "", // los datos del curso no vienen del endpoint sino del storage
          startDate: startDate || "", //  los datos del curso no vienen del endpoint sino del storage
          endDate: endDate || "", //  los datos del curso no vienen del endpoint sino del storage
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
      }
    };

    fetchCourse(); // Ejecutar la llamada a la API
  }, [id]); // Ejecutar cuando el ID cambie

  //////////////////////// creando nueva clase
  const [newClassData, setNewClassData] = useState({ // defino la estructura de una nueva clase, ponemos un id pero lo debe hacer el back
    videoFile: '',
    fileFile: null,
    classname: ''
  });

  // Arreglo para almacenar todas las clases nuevas creadas
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Estado para controlar el modal de creación de clases
  // Función que abre el modal para crear una clase nueva
  const openCreateModal = () => {
    setNewClassData({
      videoFile: '',     // Reiniciar el campo del enlace de video
      fileFile: null,    // Reiniciar el campo de archivo
      classname: ''      // Reiniciar el nombre de la clase
    });
    setIsPreviewVisible(false); // Asegurarse de ocultar la vista previa del video
    setIsCreateModalOpen(true); // Abrir el modal
  };

  // funcion apra cerrar el modal
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setErrorMessages({
      classname: "",
      videoFile: "",
      fileFile: ""
    });
  };

  const [errorMessages, setErrorMessages] = useState({
    classname: "",
    videoFile: "",
    fileFile: ""
  });

  // Función que maneja la creación de una nueva clase en el estado `newClasses`
  const handleCreateClassInState = async () => {

    // Validación rápida en el submit
    if (!newClassData.classname || !newClassData.videoFile) {
      setErrorMessages((prev) => ({
        ...prev,
        classname: !newClassData.classname ? "El nombre de la clase es obligatorio." : "",
        videoFile: !newClassData.videoFile ? "La URL del video es obligatoria." : "",
      }));
      return;
    }

    // Verificar si hay errores de validación antes de proceder
    const hasErrors = Object.values(errorMessages).some(error => error !== "");
    if (hasErrors) {
      alert("Hay errores en el formulario.");
      return; // No enviar si hay errores
    }

    const newClass = {
      videourl: newClassData.videoFile,
      fileurl: newClassData.fileFile,
      classname: newClassData.classname
    };

    const classFormData = new FormData();
    classFormData.append('course_id', id.toString()); // ID del curso, asumiendo que ya es un string
    classFormData.append('title', newClass.classname); // Título de la clase
    classFormData.append('videourl', newClass.videourl.toString()); // Contenido de la clase

    // Agrega el archivo si está disponible
    if (newClass.fileurl) {
      classFormData.append('file', newClass.fileurl); // Archivo cargado por el input
    }

    const token = Cookies.get('token');

    try {
      const response = await fetch('http://localhost:3000/classes', {
        method: 'POST',
        body: classFormData,
        headers: {
          'Authorization': `Bearer ${token}`, // Asegúrate de que el token esté presente
          }
      });

      if (response.ok) {
        console.log(`Clase '${newClass.classname}' creada exitosamente`);
        const createdClass = await response.json();

        // Actualizar el estado `courseData` para reflejar los cambios en el frontend
        setCourseData((prevCourseData) => ({
          ...prevCourseData,
          classes: [
            ...prevCourseData.classes,
            {
              classname: createdClass.title, // Asegúrate de que el nombre de la clase sea correcto
              id: createdClass.id, // Usamos el ID del backend
              videourl: createdClass.videourl, // Asegúrate de usar la URL del video del backend
              fileurl: createdClass.fileurl === "no se recibio ningun archivo" ? null : `http://localhost:3000/uploads/files/${createdClass.fileurl}`, // Agregamos la URL del archivo
            }
          ],
        }));

        // Limpiar el formulario
        setNewClassData({
          videoFile: '',
          fileFile: null,
          classname: ''
        });

        // Cerrar el modal
        setIsCreateModalOpen(false);
      } else {
        const errorResponse = await response.json();
        console.error(`Error al crear la clase '${newClass.classname}':`, errorResponse);
      }
    } catch (error) {
      console.error(`Error en la petición para la clase '${newClass.classname}':`, error);
    }
  };

  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  //Función para verificar si la URL es un enlace válido de YouTube
  const isYouTubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };
  ////////////////////////////////////// cerrando nueva clase


  /////////////////////////// logica para eliminar clase

  const handleDeleteClass = async (classId, className) => {
    if (!classId) return;

    const isConfirmed = window.confirm(`¿Estás seguro que deseas eliminar la clase "${className}"?`);
    const token = Cookies.get('token');

    if (isConfirmed) {
      try {
        const deleteResponse = await fetch(`http://localhost:3000/classes/${classId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`, // Incluye el token
          },
        });

        if (deleteResponse.ok) {
          alert('La clase ha sido eliminada con éxito');

        } else {
          alert('Hubo un error al eliminar la clase.');
        }
      } catch (error) {
        console.error('Error al eliminar la clase:', error);
      }

      // Actualizar el estado en el frontend
      setCourseData((prevCourseData) => {
        const updatedClasses = prevCourseData.classes.filter((classItem) => classItem.id !== classId);
        return { ...prevCourseData, classes: updatedClasses };
      });
      setSelectedClass(null);

    }
  };
  ///////////////////////////////// fin de la seccion de eliminacion de clases 

  //////// funcion que maneja el menu desplegable para cada clase
  const [expandedClassIndex, setExpandedClassIndex] = useState(null);

  const toggleClassContent = (index) => {
    setExpandedClassIndex(expandedClassIndex === index ? null : index);
    if (expandedClassIndex !== index) {
      setSelectedClass(courseData.classes[index]);
    }
  };
  //////////////////////////////////

  /// actualizacion de clases
  const [selectedClass, setSelectedClass] = useState(null); // Selecciono la clase para editar
  const [isModalOpen, setIsModalOpen] = useState(false); // Manejo del modal de edición
  const [classData, setClassData] = useState({ // Datos de la clase a editar
    videoFile: '',
    fileFile: null,
    classname: ''
  });

  // Abro el modal y seteo los datos de la clase
  const openUpdateModal = (classItem) => {
    setSelectedClass(classItem); // Almaceno la clase seleccionada
    setClassData({ // Seteo la información en el modal
      videoFile: classItem.videourl || '',
      fileFile: null,
      classname: classItem.classname
    });
    setIsModalOpen(true); // Abro el modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setClassData({ videoFile: '', fileFile: null, classname: '' }); // Limpio el estado al cerrar
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Actualizar el estado de los datos
    setNewClassData(prevData => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));

    // Validación general
    let errorMessage = "";

    if (name === "classname") {
      if (!value) {
        errorMessage = "El nombre de la clase es obligatorio.";
      } else if (value.length > 70) {
        errorMessage = "El nombre de la clase no debe superar los 70 caracteres.";
      }
    } else if (name === "videoFile") {
      if (!isYouTubeUrl(value)) {
        errorMessage = "La URL debe ser un enlace válido de YouTube.";
      }
    } else if (name === "fileFile" && files[0]?.size > 5 * 1024 * 1024) {
      errorMessage = "El archivo no debe superar los 5 MB.";
    }

    // Actualizar los mensajes de error
    setErrorMessages(prev => ({
      ...prev,
      [name]: errorMessage
    }));
  };

  const handleUpdateClassInState = async () => {

    const { classname, videoFile, fileFile } = classData;

    // Reseteo de los errores previos
    setErrorMessages({});
  
    // Validaciones antes de enviar
    let errorMessages = {};
 
    if (classname.length > 70) {
      errorMessages.classname = "El nombre de la clase no debe superar los 70 caracteres.";
    }
  
    if (videoFile && !isYouTubeUrl(videoFile)) {
      errorMessages.videoFile = "La URL del video debe ser un enlace válido de YouTube.";
    }
  
    if (fileFile && fileFile.size > 5 * 1024 * 1024) {
      errorMessages.fileFile = "El archivo no debe superar los 5 MB.";
    }
  
    // Si hay errores, no se procede
    if (Object.keys(errorMessages).length > 0) {
      setErrorMessages(errorMessages);
      return;
    }

    const updatedClass = {
      ...selectedClass,
      videourl: classData.videoFile || selectedClass.videourl,

      fileurl: classData.fileFile || selectedClass.fileurl,

      classname: classData.classname || selectedClass.classname,
    };

    // Verificar si hay cambios reales
    const hasChanges =
      updatedClass.videourl !== selectedClass.videourl ||
      updatedClass.fileurl !== selectedClass.fileurl ||
      updatedClass.classname !== selectedClass.classname ||
      classData.fileFile !== null;

    if (!hasChanges) {
      closeModal();
      alert('No hay cambios para guardar');
      return;
      // No hacer la solicitud PATCH si no hay cambios
    }

    const updatedFormData = new FormData();
    updatedFormData.append('title', updatedClass.classname); // Título de la clase
    updatedFormData.append('videourl', updatedClass.videourl); // URL del video

    // Agrega el archivo si está disponible
    if (classData.fileFile) {
      updatedFormData.append('file', classData.fileFile); // Archivo cargado por el input
    }


   
     const token = Cookies.get('token'); // Obtén el token de las cookies

    try {
      const response = await fetch(`http://localhost:3000/classes/${selectedClass.id}`, {
        method: 'PATCH',
        body: updatedFormData,
        headers: {
        'Authorization': `Bearer ${token}`, // Asegúrate de que el token esté presente
        }
      });

      if (response.ok) {
        alert(`Clase modificada exitosamente`);
        setCourseData((prevCourseData) => {
          const updatedClasses = prevCourseData.classes.map((classItem) =>
            classItem.id === selectedClass.id ? updatedClass : classItem
          );
          return { ...prevCourseData, classes: updatedClasses };
        });
        closeModal(); // Cierra el modal después de actualizar
      } else {
        const errorResponse = await response.json(); // Obtiene la respuesta de error
        console.error(`Error al modificar la clase '${updatedClass.classname}':`, errorResponse);
      }
    } catch (error) {
      console.error(`Error en la petición para la clase '${updatedClass.classname}':`, error);
    }
  };

  if (!courseData) {
    return <p> Cargandooo...</p>; // Evita renderizar si los datos aún no están disponibles
  }

  return (
    <>
      <div className="save-changes-container">
      </div>
      <div className="course-platform">
        <div className="course-list-container">
          <div className="course-dates">
            <h1>{courseName}</h1>
            <p>Fecha de Inicio: {startDate}</p>
            <p>Fecha de Finalización: {endDate}</p>
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
          <>
            <ReactPlayer
              url={selectedClass?.videourl || `https://via.placeholder.com/800x450?text=No+Video+Available`}
              controls
              width="100%"
              height="85%"
            />
          </>
          <div className="video-actions">
            <button className="btn create-btn" onClick={openCreateModal}>Agregar Nueva Clase</button>
            <button className="btn query-btn" onClick={() => openUpdateModal(selectedClass)}> Actualizar Clase </button>
            <button className="btn update-btn" onClick={() => handleDeleteClass(selectedClass.id, selectedClass.classname)}> Eliminar Clase </button>
          </div>

        </div>


        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Actualizar Clase</h2>
              <button onClick={closeModal} style={{ float: 'right', marginBottom: '10px' }}>Cerrar</button>
              <form onSubmit={(e) => { e.preventDefault(); handleUpdateClassInState(); }}>
                {/* Campo para editar el nombre de la clase */}
                <div className="form-group">
                  <label htmlFor="classname">Nombre de la Clase</label>
                  <input
                    type="text"
                    className="form-input"
                    id="classname"
                    value={classData.classname}
                    onChange={(e) => setClassData({ ...classData, classname: e.target.value })}
                  />
                 {errorMessages.classname && <p className="error-message">{errorMessages.classname}</p>}
                </div>

                {/* Campo para ingresar la URL del video de YouTube */}
                <div className="form-group">
                  <label>Video URL (YouTube)</label>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=XXXXXX"
                    value={classData.videoFile || ''} // Usar videoFile para la URL
                    onChange={(e) => setClassData({ ...classData, videoFile: e.target.value })}
                    onBlur={() => setIsPreviewVisible(isYouTubeUrl(classData.videoFile))}
                    className="form-input"
                  />
                   {errorMessages.videoFile && <p className="error-message">{errorMessages.videoFile}</p>}
                </div>

                {/* Vista previa del video de YouTube */}
                {isPreviewVisible && isYouTubeUrl(classData.videoFile) && (
                  <div className="video-preview">
                    <h4>Vista previa del video:</h4>
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${new URL(classData.videoFile).searchParams.get('v')}`}
                      title="YouTube video preview"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                {/* Campo para seleccionar un archivo adicional */}
                <div className="form-group">
                  <label htmlFor="fileFile">Selecciona Archivo</label>
                  <input
                    type="file"
                    accept=".pdf,.docx,.pptx"
                    name="fileFile"
                    onChange={(e) => setClassData({ ...classData, fileFile: e.target.files[0] })}
                    className="form-input"
                  />
                   {errorMessages.fileFile && <p className="error-message">{errorMessages.fileFile}</p>}
                </div>
                <div className="modal-actions">
                  <button type="submit" className="btn update-btn">Actualizar Clase</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {isCreateModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Crear Nueva Clase</h2>
            <button onClick={closeCreateModal} style={{ float: 'right', marginBottom: '10px' }}>Cerrar</button>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateClassInState(); }}>
              <div className="form-group">
                <label htmlFor="classname">Nombre de la Clase</label>
                <input
                  type="text"
                  className="form-input"
                  id="classname"
                  name="classname"
                  value={newClassData.classname}
                  onChange={handleChange}
                />
                {errorMessages.classname && <p className="error-message">{errorMessages.classname}</p>}
              </div>

              <div>
                {/* Campo para ingresar la URL del video de YouTube */}
                <div className="form-group">
                  <label htmlFor="videoFile">Video URL (YouTube)</label>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=XXXXXX"
                    name="videoFile"
                    value={newClassData.videoFile}
                    onChange={handleChange}
                    onBlur={() => setIsPreviewVisible(isYouTubeUrl(newClassData.videoFile))}
                    className="form-input"
                  />
                  {errorMessages.videoFile && <p className="error-message">{errorMessages.videoFile}</p>}
                </div>

                {/* Vista previa del video de YouTube */}
                {isPreviewVisible && (
                  <div className="video-preview">
                    <h4>Vista previa del video:</h4>
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${new URL(newClassData.videoFile).searchParams.get('v')}`}
                      title="YouTube video preview"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="fileFile">Selecciona Archivo</label>
                <input
                  type="file"
                  accept=".pdf,.docx,.pptx"
                  name="fileFile"
                  onChange={handleChange}
                  className="form-input"
                />
                {errorMessages.fileFile && <p className="error-message">{errorMessages.fileFile}</p>}
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn update-btn">Crear Clase</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursePlatform; 