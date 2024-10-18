

const  initialCourseData = {
  id: "course-1",
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

import React, { useState } from 'react'; // mas useEffect
import './ProfessorCoursePlataform.css';
import ReactPlayer from 'react-player';
import { v4 as uuidv4 } from 'uuid';
//import { useParams } from 'react-router-dom';


const CoursePlatform = () => {
  const [courseData, setCourseData] = useState(initialCourseData);
  const [expandedClassIndex, setExpandedClassIndex] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classData, setClassData] = useState({
    videoName: '',
    videoFile: null,
    fileName: '',
    fileFile: null,
    classname: ''
  });
  const [modifiedClasses, setModifiedClasses] = useState([]);
  const [deletedClasses, setDeletedClasses] = useState([]);


  //// ahora funciona con un objeto pero deberiamos hacer el llamado a la api
 /* const { id } = useParams(); // Aquí obtenemos el parámetro 'id' de la URL

  useEffect(() => {
    // Función asíncrona para buscar el curso desde la API
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/courses/${id}`); // Haces la solicitud a la API
        if (!response.ok) {
          throw new Error("Error al cargar el curso");
        }
        const data = await response.json(); // Parsear el JSON de la respuesta
        setCourseData(data); // Almacenar los datos del curso
      } catch (err) {
        setError(err.message); // Manejar errores de la solicitud
      } finally {
        setLoading(false); // Termina la carga
      }
    };

    fetchCourse(); // Llamada a la función asíncrona
  }, [id]);

  // Si está cargando, muestra un mensaje de carga
  if (loading) {
    return <div>Loading...</div>;
  }

  // Si hubo un error, mostrar el mensaje de error
  if (error) {
    return <div>{error}</div>;
  }

  // Si courseData aún es null, mostrar un mensaje de curso no encontrado
  if (!courseData) {
    return <div>Curso no encontrado</div>;
  }

  // Si todo va bien, renderizas los datos del curso*/



//// creando nueva clase
const [newClassData, setNewClassData] = useState({
  id: `class-${uuidv4()}`,
  videoName: '',
  videoFile: null,
  fileName: '',
  fileFile: null,
  classname: ''
});
// Arreglo para almacenar todas las clases nuevas creadas
  const [newClasses, setNewClasses] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Estado para controlar el modal de creación de clases

// Función que abre el modal para crear una clase nueva
const openCreateModal = () => {
  setNewClassData({
    videoName: '',
    videoFile: null,
    fileName: '',
    fileFile: null,
    classname: ''
  });
  setIsCreateModalOpen(true);
};


const closeCreateModal = () => {
  setIsCreateModalOpen(false);
};
  
// Función que maneja la creación de una nueva clase en el estado `newClasses`
const handleCreateClassInState = () => {
  const newClass = {
    id: `class-${uuidv4()}`, // ID único para la nueva clase
    video: {
      name: newClassData.videoName,
      url: newClassData.videoFile ? URL.createObjectURL(newClassData.videoFile) : null, // Crear URL solo si hay un archivo de video
    },
    file: {
      name: newClassData.fileName,
      url: newClassData.fileFile ? URL.createObjectURL(newClassData.fileFile) : null, // Crear URL solo si hay un archivo
    },
    classname: newClassData.classname
  };

  // Guardar la nueva clase en el estado `newClasses`
  setNewClasses((prevNewClasses) => [...prevNewClasses, newClass]);

  // Actualizar el estado `courseData` para reflejar los cambios en el frontend
  setCourseData((prevCourseData) => ({
    ...prevCourseData,
    classes: [...prevCourseData.classes, newClass], // Agregar la nueva clase
  }));

  setIsCreateModalOpen(false); // Cerrar el modal
};
//////////////// cerrando nueva clase



  const handleDeleteClass = (classId) => {
    setDeletedClasses((prevClasses) => 
      prevClasses.includes(classId) ? prevClasses : [...prevClasses, classId]
    );
  
    setCourseData((prevCourseData) => {
      const updatedClasses = prevCourseData.classes.filter((classItem) => classItem.id !== classId);
      return { ...prevCourseData, classes: updatedClasses };
    });
  };

  const toggleClassContent = (index) => {
    setExpandedClassIndex(expandedClassIndex === index ? null : index);
    if (expandedClassIndex !== index) {
      setSelectedClass(courseData.classes[index]);
    }
  };

  const openUpdateModal = (classItem) => {
    
    setSelectedClass(classItem);
    setClassData({
      videoName: classItem.video.name,
      videoFile: null, 
      fileName: classItem.file.name,
      fileFile: null, 
      classname: classItem.classname
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setClassData({
      videoName: '',
      videoFile: null,
      fileName: '',
      fileFile: null,
      classname: ''
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      setClassData((prevData) => ({
        ...prevData,
        [name]: files[0], 
      }));
    }
  };

  const handleUpdateClassInState = () => {
    const updatedClass = {
      ...selectedClass,
      video: {
        name: classData.videoName || selectedClass.video.name,
        url: classData.videoFile ? URL.createObjectURL(classData.videoFile) : selectedClass.video.url,
      },
      file: {
        name: classData.fileName || selectedClass.file.name,
        url: classData.fileFile ? URL.createObjectURL(classData.fileFile) : selectedClass.file.url,
      },
      classname: classData.classname || selectedClass.classname,
    };
  
   
  
    // Actualiza el estado de courseData
    setCourseData((prevCourseData) => {
      const updatedClasses = prevCourseData.classes.map((classItem) =>
        classItem.id === selectedClass.id ? updatedClass : classItem
      );
      return { ...prevCourseData, classes: updatedClasses };
    });
  
    // Actualiza el estado de modifiedClasses
    setModifiedClasses((prevClasses) => {
      const existingClassIndex = prevClasses.findIndex((item) => item.id === updatedClass.id);
      if (existingClassIndex !== -1) {
        const newClasses = [...prevClasses];
        newClasses[existingClassIndex] = updatedClass; // Reemplaza la clase existente
        return newClasses;
      }
      return [...prevClasses, updatedClass]; // Agrega la nueva clase
    });
  
    setIsModalOpen(false); // Cierra el modal
  };

  const handleSaveAllChanges = async () => {
    if (modifiedClasses.length === 0 && deletedClasses.length === 0 && newClasses.length === 0) {
      alert('No hay cambios para guardar.');
      return;
    }

  // Función que envía todas las clases nuevas al backend
  if (newClasses.length > 0) {
    const newclassFormData = new FormData();
    console.log("Nuevas Clases:", newClasses);
  
    newClasses.forEach((newClass, index) => {
      // Aquí se envían los nombres de los archivos, no los objetos
      if (newClass.video.file) {
        newclassFormData.append(`class_${index}_video`, newClass.video.name); // Usa newClass.video.name
      }
      if (newClass.file.file) {
        newclassFormData.append(`class_${index}_file`, newClass.file.name); // Usa newClass.file.name
      }
      newclassFormData.append(`class_${index}_name`, newClass.classname);
     
      newclassFormData.append(`class_${index}_videoUrl`, newClass.video.url);
      newclassFormData.append(`class_${index}_fileUrl`, newClass.file.url);
    });
  
    // Enviar la solicitud al backend (ajusta el endpoint según tu API)
    try {
      const response = await fetch('/api/classes', {
        method: 'POST',
        body: newclassFormData,
      });
      if (response.ok) {
        console.log('Clases creadas exitosamente');
      } else {
        const errorResponse = await response.json(); // Obtiene la respuesta de error
        console.error('Error al crear las clases:', errorResponse);
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  }
  
    // Filtrar las clases modificadas para no incluir aquellas que fueron eliminadas
    if (modifiedClasses.length > 0) {
    const filteredModifiedClasses = modifiedClasses.filter(
      (classItem) => !deletedClasses.includes(classItem.id)
    );
  
    console.log("Clases modificadas (sin las eliminadas):", filteredModifiedClasses);
    const formData = new FormData();
   // formData.append('course_id', courseData.id);
  
    // Agregar las clases modificadas para la solicitud PATCH
    filteredModifiedClasses.forEach((classItem) => {
      formData.append(`class_id`, classItem.id);
      formData.append(`title`, classItem.classname);
      formData.append(`videoName`, classItem.video.name);
      formData.append(`fileName`, classItem.file.name);
  
      // Verificar si se ha subido un nuevo video o archivo
      formData.append(`videoUrl`, classItem.videoFile ? classItem.video.url : classItem.video.url);
      formData.append(`fileUrl`, classItem.fileFile ? classItem.file.url : classItem.file.url);
  
      if (classItem.videoFile) {
        formData.append(`videoFile`, classItem.videoFile);
      }
      if (classItem.fileFile) {
        formData.append(`fileFile`, classItem.fileFile);
      }
    });
  
    //console.log("Datos que se enviarán a la API (clases modificadas):", Array.from(formData.entries()));
  
    // Realizar la solicitud PATCH para las clases modificadas
    try {
      const patchResponse = await fetch('/api/update-classes', {
        method: 'PATCH',
        body: formData,
      });
  
      if (patchResponse.ok) {
        alert('Los cambios de las clases se han actualizado con éxito');
      } else {
        alert('Hubo un error al actualizar las clases.');
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Hubo un problema con la actualización.');
    } }


  
    // Procesar las clases eliminadas
    if (deletedClasses.length > 0) {
      console.log("Clases eliminadas:", deletedClasses);
      try {
        const deleteResponse = await fetch('/api/delete-classes', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ classIds: deletedClasses }), //en el backend, se verá así: {"classIds": ["class-1", "class-2"]}
        });
  
        if (deleteResponse.ok) {
          alert('Las clases eliminadas se han procesado con éxito');
          setDeletedClasses([]); // Limpia la lista de eliminadas
        } else {
          alert('Hubo un error al eliminar las clases.');
        }
      } catch (error) {
        console.error('Error al eliminar las clases:', error);
        alert('Hubo un problema con la eliminación.');
      }
    }
  
    // Reiniciar el estado de clases modificadas y eliminadas
    setModifiedClasses([]);
    setDeletedClasses([]);
    setNewClasses([]);
  };

  return (
      <>
      <div className="course-platform">
        <div className="course-list-container">
          <div className="course-details">
            <h1>{courseData.courseName}</h1>
             <p>Fecha de Inicio: {courseData.startDate}</p>
             <p>Fecha de Finalización: {courseData.endDate}</p>
            <h2>Clases</h2>
            <ul className="course-list">
              {courseData.classes.map((classItem, classIndex) => (
                <li key={classItem.id} className="class-section">
                  <div>
                    <h3 onClick={() => toggleClassContent(classIndex)}>{classItem.classname}</h3>
                  </div>
                  <div className={`class-content ${expandedClassIndex === classIndex ? 'open' : ''}`}>
                    <div className="class-video">
                      <p onClick={() => openUpdateModal(classItem)}>{classItem.video.name}</p>
                    </div>
                    <div className="attachment-item">
                      <a href={classItem.file.url} target="_blank" rel="noopener noreferrer">{classItem.file.name}</a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="video-player">
      
      {selectedClass && (
        <>
          <ReactPlayer 
            url={selectedClass.video.url} 
            controls 
            width="100%" 
            height="auto" 
          />
          <div className="video-actions">
            <button className="btn query-btn" onClick={() => openUpdateModal(selectedClass)}>
              Actualizar Clase
            </button>
          </div>
        </>
      )}
    </div>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Actualizar Clase</h2>
              <button onClick={closeModal} style={{ float: 'right', marginBottom: '10px' }}>Cerrar</button>
              <form onSubmit={(e) => { e.preventDefault(); handleUpdateClassInState(); }}>
              <div className="form-group">
               <label htmlFor="classname">Nombre de la Clase</label>
                <input
                  type="text"
                  className="form-input"
                   id="classname"
                     value={classData.classname} // Vincular con el estado de classname
                   onChange={(e) => setClassData({ ...classData, classname: e.target.value })} // Actualizar el estado
                     />
                   </div>
                <div className="form-group">
                  <label htmlFor="videoName">Nombre del Video</label>
                  <input
                    type="text"
                    className="form-input"
                    id="videoName"
                    value={classData.videoName}
                    onChange={(e) => setClassData({ ...classData, videoName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="videoFile">Selecciona Video</label>
                  <input
                    type="file"
                    accept="video/*"
                    name="videoFile"
                    onChange={handleFileChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fileName">Nombre del Archivo</label>
                  <input
                    type="text"
                    className="form-input"
                    id="fileName"
                    value={classData.fileName}
                    onChange={(e) => setClassData({ ...classData, fileName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fileFile">Selecciona Archivo</label>
                  <input
                    type="file"
                    accept=".pdf,.docx,.pptx"
                    name="fileFile"
                    onChange={handleFileChange}
                    className="form-input"
                  />
                </div>

                <div className="modal-actions">
                  <button type="submit" className="btn update-btn">Actualizar Clase</button>
                  <button className="btn update-btn" onClick={() => handleDeleteClass(selectedClass.id)}> Eliminar Clase </button>
                </div>
              </form>
            </div>
          </div>
        )}

       
      </div>
      <div className="save-changes-container">
          <button className="btn save-changes-btn" onClick={handleSaveAllChanges}>Guardar Todos los Cambios</button>
          <button className="btn create-btn" onClick={openCreateModal}>Agregar Nueva Clase</button>
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
            value={newClassData.classname}
            onChange={(e) => setNewClassData({ ...newClassData, classname: e.target.value })}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="videoName">Nombre del Video</label>
          <input
            type="text"
            className="form-input"
            id="videoName"
            value={newClassData.videoName}
            onChange={(e) => setNewClassData({ ...newClassData, videoName: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="videoFile">Selecciona Video</label>
          <input
            type="file"
            accept="video/*"
            name="videoFile"
            onChange={(e) => setNewClassData({ ...newClassData, videoFile: e.target.files[0] })}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fileName">Nombre del Archivo</label>
          <input
            type="text"
            className="form-input"
            id="fileName"
            value={newClassData.fileName}
            onChange={(e) => setNewClassData({ ...newClassData, fileName: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fileFile">Selecciona Archivo</label>
          <input
            type="file"
            accept=".pdf,.docx,.pptx"
            name="fileFile"
            onChange={(e) => setNewClassData({ ...newClassData, fileFile: e.target.files[0] })}
            className="form-input"
          />
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