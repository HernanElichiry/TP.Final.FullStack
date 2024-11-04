
/*const  initialCourseData = {
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
};*/

import React, { useState, useEffect } from 'react'; // mas useEffect
import './ProfessorCoursePlataform.css';
import ReactPlayer from 'react-player';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';

const CoursePlatform = () => {
 
  const { id } = useParams(); // Aquí obtenemos el parámetro 'id' de la URL
  const { courseName, startDate, endDate } = JSON.parse(sessionStorage.getItem('courseData'));
  const [courseData, setCourseData] = useState({
    
    classes: []
  }); // creamos una variable de estado donde almacenaremos los datos de back

  //traemos los datos del back 
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3000/classes/bycourseid/${id}`); // Llamada a la API con el ID
        const data = await response.json(); // Convertir la respuesta a JSON
        console.log('Datos antes de almacenar en el estado:', data);
  
        // Transformar los datos a la estructura que necesitas
        const transformedData = {
          //classId: data.id,  //id de las clases
          courseName: courseName || "", // los datos del curso no vienen del endpoint sino del storage
          startDate: startDate || "", //  los datos del curso no vienen del endpoint sino del storage
          endDate: startDate || "", //  los datos del curso no vienen del endpoint sino del storage
          //noDate: false, // este dato es manual
          classes: data.map((cls, index) => ({
            classname: cls.title, // Nombre de la clase
            id: cls.id || `class-${index + 1}`, // aqui deberia ser cls.id pero aun no se ha asignado
            video: {
              //id: `video-${index + 1}`, // ID para el video deberia venir del back
             // name: "", // Título del video pero no esta llegando
              url: cls.videourl 
            },
            file: {
             // name: "Material descargable", // Aquí puedes agregar lógica si tienes archivos asociados
               url: `http://localhost:3000/uploads/files/${cls.fileurl}` || "no hay archivo" // Aquí puedes agregar la URL si la tienes
            },
            
          }))
        };

        setCourseData(transformedData); // Almacenamos los datos transformados en el estado
      } catch (error) {
        console.error('Error al obtener los datos del curso:', error);
      }
    };

    fetchCourse(); // Ejecutar la llamada a la API
  }, [id, courseData]); // Ejecutar cuando el ID cambie

//////////////////////// creando nueva clase
const [newClassData, setNewClassData] = useState({ // defino la estructura de una nueva clase, ponemos un id pero lo debe hacer el back
  videoFile: '',
  fileFile: null,
  classname: ''
});

// Arreglo para almacenar todas las clases nuevas creadas
  const [newClasses, setNewClasses] = useState([]);
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
};
  
// Función que maneja la creación de una nueva clase en el estado `newClasses`
const handleCreateClassInState = () => {
  const newClass = {
    id: `class-${uuidv4()}`, // ID único para la nueva clase
    video: {
      //name: newClassData.videoName || '',
      url: newClassData.videoFile  // ? URL.createObjectURL(newClassData.videoFile) : null, // Crear URL solo si hay un archivo de video
    },
    file: {
      //name: newClassData.fileName || 'Material descargable',
      url: newClassData.fileFile //? URL.createObjectURL(newClassData.fileFile) : null, // Crear URL solo si hay un archivo
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

const [isPreviewVisible, setIsPreviewVisible] = useState(false);

//Función para verificar si la URL es un enlace válido de YouTube
const isYouTubeUrl = (url) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return youtubeRegex.test(url);
};

// Manejar el cambio en el input de URL
const handleUrlChange = (e) => {
  const url = e.target.value || ''; // Si el campo está vacío, asigna una cadena vacía
  setNewClassData((prevData) => ({
    ...prevData,
    videoFile: url
  }));
  setIsPreviewVisible(isYouTubeUrl(url)); // Solo muestra la vista previa si es un enlace de YouTube válido
};
////////////////////////////////////// cerrando nueva clase


/////////////////////////// logica para eliminar clase
const [deletedClasses, setDeletedClasses] = useState([]); //guardo las clases que voy a borrar

  const handleDeleteClass = (classId) => {
    setDeletedClasses((prevClasses) => 
      prevClasses.includes(classId) ? prevClasses : [...prevClasses, classId]
    ); // selecciono la clase que quiero borrar, capto su id y lo guardo a un estado para luego enviar esos id al back
  
    setCourseData((prevCourseData) => { // para reflejar los cambios en el front antes de hacer una solicitud quito el la clase
      //que pienso eliminar
      const updatedClasses = prevCourseData.classes.filter((classItem) => classItem.id !== classId);
      return { ...prevCourseData, classes: updatedClasses };
    });
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
  const [selectedClass, setSelectedClass] = useState(null); //1. seleciono la clase para editar
  const [isModalOpen, setIsModalOpen] = useState(false); // manejo del modal de edicion
  const [classData, setClassData] = useState({ // 
    videoFile:'',
    fileFile: null,
    classname: ''
  });
  const [modifiedClasses, setModifiedClasses] = useState([]); // guardo las clases que ya modifique

  const openUpdateModal = (classItem) => { // abro el modal y lo seteo con los datos de la clase
    
    setSelectedClass(classItem); // la clase que seleccione la guardo en un estado
    setClassData({   // seteo el modal con esa informacion,
      videoFile: selectedClass.video.url || '', 
      fileFile: null, 
      classname: classItem.classname
    });
    setIsModalOpen(true); // abro el modal y ya lo veo seteado con la info de la clse que seleccione
  };  

  const closeModal = () => {
    setIsModalOpen(false);
    setClassData({
      videoFile: '',
      fileFile: null,
      classname: ''
    });
  }; // sierro el modal y borro los estados



  const handleUpdateClassInState = () => {
    const updatedClass = {
      ...selectedClass,
      video: {
        //name: classData.videoName || selectedClass.video.name,
        url: classData.videoFile ? classData.videoFile : selectedClass.video.url,
      },
      file: {
       // name: classData.fileName || selectedClass.file.name,
        url: classData.fileFile  ? classData.fileFile : selectedClass.file.url,
      },
      classname: classData.classname || selectedClass.classname,
    };
  
  
    // Actualiza el estado de courseData para ver los cambios en front
    setCourseData((prevCourseData) => {
      const updatedClasses = prevCourseData.classes.map((classItem) =>
        classItem.id === selectedClass.id ? updatedClass : classItem
      );
      return { ...prevCourseData, classes: updatedClasses };
    });
  
    // Actualiza el estado de modifiedClasses dejando las clases modificadas listas para ser enviadas al back
  
    setModifiedClasses((prevClasses) => [
      ...prevClasses.filter(item => item.id !== updatedClass.id), // Filtra clases existentes
      updatedClass // Agrega la clase actualizada
  ]);

    setIsModalOpen(false); // Cierra el modal
  };


//////////// logica para enviar los cambios al backend

  const handleSaveAllChanges = async () => {
    if (modifiedClasses.length === 0 && deletedClasses.length === 0 && newClasses.length === 0) {
      alert('No hay cambios para guardar.');
      return;
    }


    if (newClasses.length > 0) {
      console.log("Nuevas Clases:", newClasses);
  
      for (const newClass of newClasses) {
        const classFormData = new FormData();
  
        classFormData.append('course_id', id.toString()); // ID del curso, asumiendo que ya es un string
        classFormData.append('title', newClass.classname); // Título de la clase
        //classFormData.append('duration', id.toString()); // Duración como string (ajusta si tienes un valor específico)
        classFormData.append('videourl', newClass.video.url.toString()); // Contenido de la clase
  
        // Agrega el archivo si está disponible
        if (newClass.file && newClass.file.url) {
          classFormData.append('file', newClass.file.url); // Archivo cargado por el input
        }
  
        try {
          const response = await fetch('http://localhost:3000/classes', {
            method: 'POST',
            body: classFormData,
          });
  
          if (response.ok) {
            console.log(`Clase '${newClass.classname}' creada exitosamente`);
          } else {
            const errorResponse = await response.json(); // Obtiene la respuesta de error
            console.error(`Error al crear la clase '${newClass.classname}':`, errorResponse);
          }
        } catch (error) {
          console.error(`Error en la petición para la clase '${newClass.classname}':`, error);
        }
      }
    };
  
     // Realizar la solicitud PATCH para las clases modificadas
    // 1 Filtrar las clases modificadas para no incluir aquellas que fueron eliminadas
    if (modifiedClasses.length > 0) {
    const filteredModifiedClasses = modifiedClasses.filter(
      (classItem) => !deletedClasses.includes(classItem.id)
    );

    console.log("Nuevas Clases:", filteredModifiedClasses);
    for (const updatedClasses of filteredModifiedClasses) {
      const updatedFormData = new FormData(); 
    
      //updatedFormData.append('course_id', id.toString()); // ID del curso, asumiendo que ya es un string
      updatedFormData.append('title',updatedClasses.classname); // Título de la clase
      updatedFormData.append('videourl', updatedClasses.video.url.toString()); // Contenido de la clase

      // Agrega el archivo si está disponible
      if (updatedClasses.file && updatedClasses.file.url) {
        updatedFormData.append('file',updatedClasses.file.url); // Archivo cargado por el input
      }
    
      try {
        const response = await fetch(`http://localhost:3000/classes/${updatedClasses.id}`, {
          method: 'PATCH', 
          body: updatedFormData,
        });

        if (response.ok) {
          console.log(`Clase modificada exitosamente`);
        } else {
          const errorResponse = await response.json(); // Obtiene la respuesta de error
          console.error(`Error al modificar la clase '${updatedClasses.classname}':`, errorResponse);
        }
      } catch (error) {
        console.error(`Error en la petición para la clase '${updatedClasses.classname}':`, error);
      }
    }
   
   
    }

    // Procesar las clases eliminadas
    if (deletedClasses.length > 0) {
      console.log("Clases eliminadas:", deletedClasses);
     
      for( const deletedClass of deletedClasses) {
        try {
          const deleteResponse = await fetch(`http://localhost:3000/classes/${deletedClass}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ classIds: deletedClass }), 
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
      
     
    }
  
    // Reiniciar el estado de clases modificadas y eliminadas
    setModifiedClasses([]);
    setDeletedClasses([]);
    setNewClasses([]);
  };

  if (!courseData) {
    return <p> Cargandooo...</p>; // Evita renderizar si los datos aún no están disponibles
  }

  return (
      <>

<div className="save-changes-container">
          <button className="btn save-changes-btn" onClick={handleSaveAllChanges}>Guardar Todos los Cambios</button>
          <button className="btn create-btn" onClick={openCreateModal}>Agregar Nueva Clase</button>
        </div>
      <div className="course-platform">
        <div className="course-list-container">
          <div className="course-dates">
            <h1>{courseName}</h1>
             <p>Fecha de Inicio: {startDate}</p>
             <p>Fecha de Finalización: {endDate}</p>
            <h2>Clases</h2>
            <ul className="course-list">
              {courseData.classes.map((classItem, classIndex) => (
                <li key={classItem.id} className="class-section">
                  <div>
                    <h3 onClick={() => toggleClassContent(classIndex)}>{classItem.classname}</h3>
                  </div>
                  <div className={`class-content ${expandedClassIndex === classIndex ? 'open' : ''}`}>
                    <div className="class-video">
                      <p >{classItem.video.name}</p>
                    </div>
                    <div className="attachment-item">
                      <a href={classItem.file.url} target="_blank" rel="noopener noreferrer">Material descargable</a>
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
            height="85%" 
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
        <div>
      {/* Campo para ingresar la URL del video de YouTube */}
      <div className="form-group">
        <label>Video URL (YouTube)</label>
        <input
          type="text"
          placeholder="https://www.youtube.com/watch?v=XXXXXX"
          value={newClassData.videoFile}
          onChange={handleUrlChange}
          onBlur={() => setIsPreviewVisible(isYouTubeUrl(newClassData.videoFile))}
          className="form-input"
        />
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