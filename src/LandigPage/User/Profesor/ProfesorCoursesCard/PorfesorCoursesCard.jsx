
import './ProfesorCoursesCard.css'; 
import { useState, useEffect } from 'react';

//import Image from "./wallpaper2.jpg";
import Modal from 'react-modal'; // Importa react-modal


const ProfesorCoursesCard = ({ course }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [formValues, setFormValues] = useState(course);
  const [videoFile, setVideoFile] = useState(null);
  const [backgroundImageFile, setBackgroundImageFile] = useState(null); // Estado para almacenar la URL de la imagen
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() =>{
    const fetchImage = async() => {

    // Construir la URL de la imagen del curso
    const imageResponse = await fetch(`http://localhost:3000/uploads/images/${course.media.filename}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    // Convertir la imagen a Blob y luego a URL
        const imageBlob = await imageResponse.blob();
        setBackgroundImageFile(URL.createObjectURL(imageBlob)); // Guardar la URL de la imagen
  }

  fetchImage();
  }, [] );

 


  const handleClick = () => {
    window.open(`/course-platform/${course.id}`, '_blank'); // Abre en una nueva pestaña
  };

 // Manejador de cambio del precio (input)
 const handlePriceChange = (e) => {
  const rawValue = e.target.value.replace(/\D/g, ''); // Eliminar todo lo que no sea número
  const numericPrice = parseFloat(rawValue) / 100; // Convertir a número decimal
  
  // Actualiza el estado con el valor numérico (sin formato)
  setFormValues({
    ...formValues,
    price: isNaN(numericPrice) ? 0 : numericPrice // Asegurarse que no sea NaN
   
  });

  console.log(formValues.price);
};

// Función para mostrar el precio formateado
const formatPriceForDisplay = (price) => {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price || 0); // Asegurarse de mostrar siempre algo
};
////////////// fin del manejo de precio
  

//////////// manejamos el video file
const handleVideoFileChange = (e) => {
  const file = e.target.files[0]; // Obtener el archivo de video

  if (!file) {
      setVideoFile(null); // No hay archivo, establecer videoFile a null
      setErrorMessages((prev) => ({ ...prev, videoFile: '' })); // Limpiar el mensaje de error
  } else if (file.size > 800 * 1024 * 1024) {
      setErrorMessages((prev) => ({ ...prev, videoFile: 'El video no debe exceder los 800MB.' }));
  } else {
      setVideoFile(file); // Guardar el archivo en videoFile si pasa las validaciones
      setErrorMessages((prev) => ({ ...prev, videoFile: '' })); // Limpiar el mensaje de error
  }
};
////////////////////////

 ///////// Manejo de imagen
 const handleBackgroundImageChange = (e) => {
  const file = e.target.files[0]; // Obtener el archivo de imagen

  if (!file) {
      setBackgroundImageFile(null); // No hay archivo, establecer backgroundImageFile a null
      setErrorMessages((prev) => ({ ...prev, backgroundImageFile: '' })); // Limpiar el mensaje de error
  } else if (file.size > 2 * 1024 * 1024) { // Validación de tamaño (máximo 2MB)
      setErrorMessages((prev) => ({ ...prev, backgroundImageFile: 'La imagen no debe exceder los 2MB.' }));
  } else {
      setBackgroundImageFile(file); // Guardar el archivo en backgroundImageFile si pasa las validaciones
      setErrorMessages((prev) => ({ ...prev, backgroundImageFile: '' })); // Limpiar el mensaje de error
  }
};  ////////////////


  const handleOpenModal = (isDelete) => {
    if (!isModalOpen) {  // Verificación para evitar abrir varias veces
      setIsDeleteConfirm(isDelete);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleCancelButton = () => {
    setFormValues(course);
    setErrorMessages({});  
    handleCloseModal();

  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
  
    let errorMessage = '';
  
    // Validaciones de todos los campos
    switch (name) {
      case 'courseName':
        if (value.trim() === '') {
          errorMessage = 'El nombre del curso es obligatorio.';
        }
       
        break;
  
      case 'courseDescription':
        if (value.trim().length < 10) {
          errorMessage = 'La descripción debe tener al menos 10 caracteres.';
        } 

        if (value.trim().length > 100) {
          errorMessage = 'La descripción no debe superar los 100 caracteres.';
        }
        break;
  
      case 'category':
        if (value.trim() === '') {
          errorMessage = 'La categoría es obligatoria.';
        }
        break;
  
      case 'courseDuration':
        if (isNaN(value) || value <= 0) {
          errorMessage = 'La duración debe ser un número positivo.';
        }
        break;
  
      case 'startDate':
        if (value === '') {
          errorMessage = 'La fecha de inicio es obligatorio.';
        } 
        break;
  
      case 'endDate':
        if (new Date(value) < new Date(formValues.startDate)) {
          errorMessage = 'La fecha de finalización no puede ser anterior a la fecha de inicio.';
        }
        break;
  
        case 'price':
          const priceValue = formValues.price;  // Accede al valor de `price` en `formValues`
          console.log('Valor de precio:', priceValue);  // Verificar el valor que estamos validando
      
          if (isNaN(priceValue) || priceValue <= 0) {
              errorMessage = 'El precio debe ser un número positivo.';
          }
          break;
      default:
        break;
    }
  
    // Actualiza el estado de los valores del formulario
    setFormValues({ ...formValues, [name]: value });
  
    // Actualiza los mensajes de error
    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      [name]: errorMessage,
    }));
  };



  const handleUpdate = async () => {
  // Verificamos campo por campo si hay cambios
  const hasChanges = {
    courseName: formValues.courseName !== course.courseName,
    courseDescription: formValues.courseDescription !== course.courseDescription,
    category: formValues.category !== course.category,
    courseDuration: formValues.courseDuration !== course.courseDuration,
    startDate: formValues.startDate !== course.startDate,
    endDate: formValues.endDate !== course.endDate,
    price: formValues.price !== course.price,
    presentationVideo: videoFile !== null, // verifica Si hay un nuevo video cargado
    backgroundImageFile: backgroundImageFile !== null, 
    
  };

  // Chequeamos si algún valor en el objeto hasChanges es true
  const isModified = Object.values(hasChanges).some(change => change);



  if (!isModified) {
    alert("No hay modificaciones para guardar.");
    return; // Salimos de la función si no hay cambios
  }
  // Verificamos si hay errores de validación
  const hasErrors = Object.values(errorMessages).some(message => message !== '');
  if (hasErrors) {
    alert("Por favor, corrije los errores antes de guardar.");
    return; // Salimos de la función si hay errores
  }
    const formData = new FormData();
  
    // Añadir solo las propiedades que deseas actualizar
    formData.append('courseName', formValues.courseName);
    formData.append('courseDescription', formValues.courseDescription);
    formData.append('category', formValues.category);
    formData.append('courseDuration', formValues.courseDuration);
    formData.append('startDate', formValues.startDate);
    formData.append('endDate', formValues.endDate);
    

    if (videoFile) {
      formData.append('presentationVideo', videoFile);
    }
  
    
    if (backgroundImageFile) formData.append('backgroundImageFile', backgroundImageFile);
    
    formData.append('price', formValues.price);// Enviamos el valor numérico
  
    try {
      const response = await fetch(`/api/courses/${course.id}`, {
        method: 'PATCH',
        body: formData,
      });
      if (response.ok) {
        console.log("Curso actualizado correctamente");
      } else {
        console.error("Error al actualizar el curso");
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
    handleCloseModal();
  };


  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/courses/${course.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log("Curso eliminado correctamente");
      } else {
        console.error("Error al eliminar el curso");
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    }
    handleCloseModal();
  };

  return (
    <div className="profesor-course-card" >
      <div className="profesor-course-image">
        <img src={backgroundImageFile} alt={course.title} onClick={handleClick} />
      </div>
      <div className="profesor-course-info">
        <h2 className="profesor-course-title">{course.title}</h2>
        <p className="profesor-course-details">
          {course.classes.length} Clases - {course.duration} Horas
        </p>
      </div>
      <div className="course-buttons">
        <button className="btn-update" onClick={(e) => { e.stopPropagation(); handleOpenModal(false); }}>Actualizar</button>
        <button className="btn-delete" onClick={(e) => { e.stopPropagation(); handleOpenModal(true); }}>Eliminar</button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel={isDeleteConfirm ? "Confirmar Eliminación" : "Editar Curso"}
        className="modal"
        overlayClassName="overlay"
       
      >
        {isDeleteConfirm ? (
          <div>
            <h2>¿Estás seguro que deseas eliminar este curso?</h2>
            <button onClick={handleDelete}>Confirmar</button>
            <button onClick={handleCloseModal}>Cancelar</button>
          </div>
        ) : (
          <div>
            <h2>Editar Curso</h2>
            <form>
  <div className="form-row">
    <div className="form-column">
    <>
    <label>Nombre del curso:</label>
    <input
      type="text"
      name="courseName"
      value={formValues.title}
      onChange={handleFormChange}
    />
    {errorMessages.courseName && <p className="error">{errorMessages.courseName}</p>}
    </>
      <label htmlFor="courseDescription">Descripción:</label>
      <textarea
        id="courseDescription" // Agrega id para que coincida con htmlFor
        name="courseDescription"
        value={formValues.description}
        onChange={handleFormChange}  
      />
       {errorMessages.courseDescription && <p className="error">{errorMessages.courseDescription}</p>}

      <label htmlFor="category">Categoría:</label>
      <input
        type="text"
        id="category" // Agrega id para que coincida con htmlFor
        name="category"
        value={formValues.category.name}
        onChange={handleFormChange}
      /> {errorMessages.category && <p className="error">{errorMessages.category}</p>}
      
      <div className="form-group">
        <label htmlFor="videoFile">Selecciona Video</label>
        <input
    type="file"
    accept="video/*"
    id="videoFile"
    name="videoFile"
    onChange={handleVideoFileChange} // Llama a la función de manejo
    className="form-input"
/>
{errorMessages.videoFile && <p className="error">{errorMessages.videoFile}</p>}
       
      </div>
    </div>
    <div className="form-column">
      <label htmlFor="courseDuration">Duración (Horas):</label>
      <input
        type="text"
        id="courseDuration" // Agrega id para que coincida con htmlFor
        name="courseDuration"
        value={formValues.duration}
        onChange={handleFormChange}
      />
      {errorMessages.courseDuration && <p className="error">{errorMessages.courseDuration}</p>}
      
      
      <label htmlFor="startDate">Fecha de Inicio:</label>
      <input
        type="date"
        id="startDate" // Agrega id para que coincida con htmlFor
        name="startDate"
        value={formValues.startDate}
        onChange={handleFormChange}
      />
      {errorMessages.startDate && <p className="error">{errorMessages.startDate}</p>}
      
      
      
      <label htmlFor="endDate">Fecha de Finalización:</label>
      <input
        type="date"
        id="endDate" // Agrega id para que coincida con htmlFor
        name="endDate"
        value={formValues.endDate}
        onChange={handleFormChange}
      />
        {errorMessages.endDate && <p className="error">{errorMessages.endDate}</p>}



      <div className="form-group">
        <label htmlFor="backgroundImageFile">Selecciona Imagen de Fondo</label>
        <input
    type="file"
    accept="image/*"
    id="backgroundImageFile" // Agrega id para que coincida con htmlFor
    name="backgroundImageFile"
    onChange={handleBackgroundImageChange}
    className="form-input"
  />
      </div>

      <div className="form-group">
      <label htmlFor="price">Precio del curso:</label>
      <input
      type="text"
       id="price"
       name="price"
       value={formatPriceForDisplay(formValues.price)} // Mostramos el valor formateado
      onChange={handlePriceChange} // Manejamos el valor limpio
       />
       {errorMessages.price && <p className="error">{errorMessages.price}</p>}
      </div>
    
    </div>
  </div>
  <button type="button" onClick={handleUpdate}>Guardar Cambios</button>
  <button type="button" onClick={handleCancelButton}>Cancelar</button>  
</form>
          </div>
        )}
      </Modal>
    </div>
  );
}; 

export default ProfesorCoursesCard;
