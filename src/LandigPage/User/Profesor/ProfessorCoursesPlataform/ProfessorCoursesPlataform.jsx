


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

  const [courseData, setCourseData] = useState({
    id: "",
    courseName: "",
    //courseDescription: "",
    //courseDuration: "",
    // category: "",
    //presentationVideo: "",
   // backgroundImage: "",
    startDate: "",
    endDate: "",
    noDate: false,
    //selectedTopics: [],
    classes: []
  }); // creamos una variable de estado donde almacenaremos los datos de back

  //traemos los datos del back 

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3000/courses/${id}`); // Llamada a la API con el ID
        const data = await response.json(); // Convertir la respuesta a JSON
        console.log('Datos antes de almacenar en el estado:', data);
        
        // Transformar los datos a la estructura que necesitas
        const transformedData = {
          id: `course-${data.id}`,
          courseName: data.title || "", 
          //courseDescription: data.description || "", /// este dato no lo uso
          //courseDuration: data.duration ? String(data.duration) : "", //este tampoco
         // category: data.category.name || "", //este tampoco
          //presentationVideo: `https://example.com/path/to/${data.media.videoname}` || "", // esto tampoco
         // backgroundImage: `https://example.com/path/to/${data.media.filename}` || "", // esto tampoco
          startDate: "", // Puedes asignar una fecha de inicio si la tienes
          endDate: "", // Puedes asignar una fecha de finalización si la tienes
          noDate: false,
         // selectedTopics: data.courseTopics.map(topic => topic.topic.topic), // Extraer los nombres de los temas
          classes: data.classes.map((cls, index) => ({
            id: `class-${index + 1}`, // Asignar un ID único
            video: {
              id: `video-${index + 1}`, // ID para el video
              name: cls.title, // Título de la clase
              url: `https://example.com/path/to/${data.media.videoname}` // URL del video (ajusta esto según tu lógica)
            },
            file: {
              name: "", // Aquí puedes agregar lógica si tienes archivos asociados
              url: "" // Aquí puedes agregar la URL si la tienes
            },
            classname: cls.title // Nombre de la clase
          }))
        };

        setCourseData(transformedData); // Almacenamos los datos transformados en el estado
      } catch (error) {
        console.error('Error al obtener los datos del curso:', error);
      }
    };

    fetchCourse(); // Ejecutar la llamada a la API
  }, [id]); // Ejecutar cuando el ID cambie


  // bien, ya tenemos los datos para manipularlos!! :)
  //ahora Bien, esta plataforma busca poder crear nuevas clases, editar las ya existentes y elminar las que sean necesarias

  
  

//////////////////////// creando nueva clase
const [newClassData, setNewClassData] = useState({ // defino la estructura de una nueva clase, ponemos un id pero lo debe hacer el back
  //id: `class-${uuidv4()}`,
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

// funcion apra cerrar el modal
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
    videoName: '',
    videoFile: null,
    fileName: '',
    fileFile: null,
    classname: ''
  });
  const [modifiedClasses, setModifiedClasses] = useState([]); // guardo las clases que ya modifique


  const openUpdateModal = (classItem) => { // abro el modal y lo seteo con los datos de la clase
    
    setSelectedClass(classItem); // la clase que seleccione la guardo en un estado
    setClassData({   // seteo el modal con esa informacion
      videoName: classItem.video.name,
      videoFile: null, 
      fileName: classItem.file.name,
      fileFile: null, 
      classname: classItem.classname
    });
    setIsModalOpen(true); // abro el modal y ya lo veo seteado con la info de la clse que seleccione
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
  }; // sierro el modal y borro los estados

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

  // Función que envía todas las clases nuevas al backend
  if (newClasses.length > 0) {
    const newclassFormData = new FormData();
    console.log("Nuevas Clases:", newClasses);
  
    newClasses.forEach((newClass, index) => {
      // Aquí se envían los nombres de los archivos, no los objetos
      if (newClass.video.url) { /// ponerle indice `fileFiles[${index}]`
        newclassFormData.append(`videoName`, newClass.video.name); // Usa newClass.video.name
      }
      if (newClass.file.url) {
        newclassFormData.append(`fileName`, newClass.file.name); // Usa newClass.file.name
      }
      newclassFormData.append(`title`, newClass.classname);
     
      newclassFormData.append(`videoUrl`, newClass.video.url);
      newclassFormData.append(`fileUrl`, newClass.file.url);
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


    
    console.log("Datos que se enviarán a la API (clases modificadas):", Array.from(formData.entries()));
  
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
                      <p >{classItem.video.name}</p>
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