
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import "./AddCourseForm.css";
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.us';

const AddCourseForm = () => {
  const { control, handleSubmit, formState: { errors }, watch, setError } = useForm();
 // const [selectedTopics, setSelectedTopics] = useState([]);
  const [classes, setClasses] = useState([{ id: uuidv4(), video: { videoId: uuidv4(), name: "", url: "" }, file: { name: "", url: "" }, className: "" }]);
  const [noDates, setNoDates] = useState(false);
  
  const startDate = watch('startDate');


  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data); // Asumiendo que `data` es un arreglo de categorías
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  


  const availableTopics = ["HTML", "CSS", "JavaScript", "React", "Node.js"];

 /* const handleTopicChange = (e) => {
    const topic = e.target.value;
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };*/

  const handleFileChange = (index, field, file) => {
    const updatedClasses = [...classes];
  
    if (file) {
      // Si hay archivo, actualiza la información
      if (field === "video") {
        updatedClasses[index][field] = {
          videoId: uuidv4(),
          name: file.name,
          url: URL.createObjectURL(file), // Genera una URL temporal para el archivo
        };
      } else {
        updatedClasses[index][field] = {
          name: file.name,
          url: URL.createObjectURL(file),
        };
      }
    } else {
      // Si no hay archivo, limpia el campo
      updatedClasses[index][field] = {
        videoId: "",
        name: "",
        url: "",
      };
    }
  
    setClasses(updatedClasses); // Actualiza el estado
  };
  
 


  const addNewClass = () => {
    setClasses([...classes, { id: uuidv4(), video: { videoId: uuidv4(), name: "", url: "" }, file: { name: "", url: "" }, className: "" }]);
  };
  
  const handleRemoveClass = (index) => {
    // Crea una copia de las clases
    const updatedClasses = [...classes];
    // Elimina la clase en la posición dada
    updatedClasses.splice(index, 1);
    // Actualiza el estado
    setClasses(updatedClasses);
    // Actualiza el formulario
    setValue("classes", updatedClasses);
  };

  /*const onSubmit = async (data) => {
    
    if (!noDates && new Date(data.endDate) <= new Date(data.startDate)) {
      setError("endDate", { type: "manual", message: "La fecha de finalización debe ser posterior a la de inicio." });
      return;
    }

    const combinedData = {
      id: uuidv4(),
      courseName: data.courseName,
      courseDescription: data.courseDescription,
      courseDuration: data.courseDuration,
      category: data.category,
      certification: data.certification,
      institution: data.institution,
      requirements: data.requirements,
      presentationVideo: URL.createObjectURL(data.presentationVideo[0]),
      backgroundImage: URL.createObjectURL(data.backgroundImage[0]),
      startDate: data.startDate,
      endDate: data.endDate,
      noDate: noDates,
      topics: data.topics,
      price: data.price,
      classes: classes.map((classItem) => ({
        id: classItem.id,
        video: {
            id: classItem.video.videoId,
            name: classItem.video.name,
            url: classItem.video.url,
        },
        file: {
            name: classItem.file.name,
            url: classItem.file.url,
        },
        className: classItem.title,
    })),
  };

    console.log("Curso agregado:", combinedData);


   try {
      const response = await fetch("http://localhost:3000/courses", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      });
  
      if (response.ok) {
        console.log('Curso agregado exitosamente');
      } else {
        console.error('Error al agregar el curso');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };*/


  const onSubmit = async (data) => {
    if (!noDates && new Date(data.endDate) <= new Date(data.startDate)) {
      setError("endDate", { type: "manual", message: "La fecha de finalización debe ser posterior a la de inicio." });
      return;
    }
  
    const formData = new FormData();
  
    // Agregar los datos del curso
    formData.append('title', data.courseName);
    formData.append('description', data.courseDescription);
    formData.append('duration', data.courseDuration);
    formData.append('category', data.category);
    formData.append('certification', data.certification);
    formData.append('platform', data.institution);
    formData.append('requirements', data.requirements);
    formData.append('presentationVideo', data.presentationVideo[0]); // Suponiendo que es un archivo
    formData.append('backgroundImage', data.backgroundImage[0]); // Suponiendo que es un archivo
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    formData.append('noDate', noDates);
   // formData.append('topics', data.topics);
    formData.append("topics", JSON.stringify(data.topics)); 
    formData.append('price', data.price);
  
    // Agregar clases
    classes.forEach((classItem) => {
      // Verificar que classItem.file tenga nombre y url
      if (classItem.file && classItem.file.name && classItem.file.url) {
        formData.append(`classes[${classItem.id}][className]`, classItem.title);
        formData.append(`classes[${classItem.id}][file][name]`, classItem.file.name);
        formData.append(`classes[${classItem.id}][file]`, classItem.file.url); // Aquí se añade el archivo (URL)
  
        // Si el video también tiene un nombre y URL
        if (classItem.video && classItem.video.name && classItem.video.url) {
          formData.append(`classes[${classItem.id}][video][name]`, classItem.video.name);
          formData.append(`classes[${classItem.id}][video][url]`, classItem.video.url); // Aquí se añade el URL del video
        }
      }
    });


    // Para verificar que los datos están correctos antes de enviar
console.log("Datos del formulario a enviar:");
for (const [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}
  
    /*try {
      const response = await fetch("http://localhost:3000/courses/user_id", {
        method: 'POST',
        body: formData, // Enviar formData directamente
      });
  
      if (response.ok) {
        console.log('Curso agregado exitosamente');
      } else {
        console.error('Error al agregar el curso');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }*/
  };


  return (
    <div className="formcont">
      <h2>Agregar Curso</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Nombre del Curso */}
        <div className="form-group">
          <label htmlFor="courseName">Nombre del Curso</label>
          <Controller
            name="courseName"
            control={control}
            defaultValue=""
            rules={{ required: "El nombre del curso es requerido.", maxLength: { value: 50, message: "El nombre no puede superar los 50 caracteres." }}}
            render={({ field }) => <input className="form-input" id="courseName" {...field} />}
          />
          {errors.courseName && <p className="error-message">{errors.courseName.message}</p>}
        </div>

        {/* Descripción */}
        <div className="form-group">
          <label htmlFor="courseDescription">Descripción</label>
          <Controller
            name="courseDescription"
            control={control}
            defaultValue=""
            rules={{ required: "La descripción es requerida.", maxLength: { value: 200, message: "La descripción no puede superar los 200 caracteres." }}}
            render={({ field }) => <textarea className="form-input" id="courseDescription" {...field} />}
          />
          {errors.courseDescription && <p className="error-message">{errors.courseDescription.message}</p>}
        </div>

        {/* Duración */}
        <div className="form-group">
          <label htmlFor="courseDuration">Duración (en horas)</label>
          <Controller
            name="courseDuration"
            control={control}
            defaultValue=""
            rules={{ required: "La duración es requerida.", min: 1 }}
            render={({ field }) => <input className="form-input" type="number" id="courseDuration" {...field} />}
          />
          {errors.courseDuration && <p className="error-message">{errors.courseDuration.message}</p>}
        </div>
 {/* Categoría */}
 <div className="form-group">
        <label htmlFor="category">Categoría</label>
        <Controller
          name="category"
          control={control}
          defaultValue=""
          rules={{ required: "Selecciona una categoría." }}
          render={({ field }) => (
            <select className="form-input" id="category" {...field}>
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option> // Usa cat.name aquí
              ))}
            </select>
          )}
        />
        {errors.category && <p className="error-message">{errors.category.message}</p>}
      </div>
        
         {/* Temas */}
         <div className="form-group">
        <label>Temas (máx. 5)</label>
        <Controller
          name="topics"
           control={control}
           defaultValue={[]}
           rules={{
            validate: (value) => value.length >= 2 || "Selecciona al menos 2 topics."
           }}
          render={({ field }) => (
          <>
          {availableTopics.map((topic, index) => (
          <label key={index} >
            <input
              type="checkbox"
              value={topic}
              checked={field.value.includes(topic)}
              onChange={(e) => {
                const newValue = e.target.checked
                  ? [...field.value, topic]
                  : field.value.filter((t) => t !== topic);
                field.onChange(newValue);
              }}
            />
            {topic}
          </label>
           ))}
          </>
           )}
          />
  
  {/* Mostrar mensaje de error si hay un error en "topics" */}
  {errors.topics && <p className="error-message" >{errors.topics.message} </p>} 
         </div>

       {/* Institución */}
         <div className="form-group">
  <label htmlFor="institution">Institución</label>
  <Controller
    name="institution"
    control={control}
    defaultValue=""
    rules={{ 
      required: "La institución es requerida.",
      maxLength: {
        value: 50,
        message: "La institución no puede superar los 50 caracteres."
      }
    }}
    render={({ field }) => <input className="form-input" id="institution" {...field} />}
  />
  {errors.institution && <p className="error-message">{errors.institution.message}</p>}
        </div>

        {/* Requisitos */}
        <div className="form-group">
  <label htmlFor="requirements">Requisitos</label>
  <Controller
    name="requirements"
     control={control}
    defaultValue=""
    rules={{ 
     
      maxLength: {
        value: 100,
        message: "Los requisitos no pueden superar los 100 caracteres."
      }
    }}
    render={({ field }) => <textarea className="form-input" id="requirements" 
    placeholder = "Por ej: se recomienda tener conocimientos de ingles  "   {...field} />}
  />
  {errors.requirements && <p className="error-message">{errors.requirements.message}</p>}
        </div>

          {/* ¿Ofrece certificación? */}
        <div className="form-group">
  <label htmlFor="certification">¿Ofrece certificación?</label>
  <Controller
    name="certification"
    control={control}
    defaultValue={false}
    render={({ field }) => <input type="checkbox" className="form-check-input" id="certification" {...field} />}
  /> 
         </div>

         
       {/* Video Presentación */}
       <div className="form-group">
  <label htmlFor="presentationVideo">Video de Presentación</label>
  <Controller
    name="presentationVideo"
    control={control}
    defaultValue={""}
    rules={{
      validate: {
        required: (files) => files.length > 0 || "Debes seleccionar un video.",
        maxSize: (files) => 
          // Convierte FileList a array y verifica el tamaño
          Array.from(files).every((file) => file.size <= 800 * 1024 * 1024) ||
          "El video no debe superar los 800MB.",
      },
    }}
    render={({ field }) => (
      <input
        type="file"
        accept="video/*"
        id="presentationVideo"
        onChange={(e) => field.onChange(e.target.files)}
      />
    )}
  />
  {errors.presentationVideo && (
    <p className="error-message">{errors.presentationVideo.message}</p>
  )}
       </div>


        {/* Imagen de Fondo */}
        <div className="form-group">
          <label htmlFor="backgroundImage">Imagen de Fondo</label>
          <Controller
            name="backgroundImage"
            control={control}
            defaultValue={null}
            rules={{ required: "La imagen de fondo es requerida." }}
            render={({ field }) => (
              <input type="file" accept="image/*" id="backgroundImage" onChange={(e) => field.onChange(e.target.files)} />
            )}
          />
          {errors.backgroundImage && <p className="error-message">{errors.backgroundImage.message}</p>}
        </div>

        {/* Clases */}
        <h3>Clases</h3>
        {classes.map((classItem, index) => (
       <div key={classItem.id} className="class-section">
        <h4>Clase {index + 1}</h4>

       {/* Nombre de la clase */}
        <div className="form-group">
        <label htmlFor={`title-${classItem.id}`}>Nombre de la clase</label>
        <Controller
        name={`classes[${index}].title`}
        control={control}
        defaultValue={classItem.title || ""}
        rules={{
          required: "El nombre del archivo requerido.",
          maxLength: {
            value: 50,
            message: "El nombre del archivo no puede superar los 50 caracteres.",
          },
        }}
        render={({ field }) => (
          <input
            className="form-input"
            id={`title-${classItem.id}`}
            {...field}
            onChange={(e) => {
              field.onChange(e.target.value);
              const updatedClasses = [...classes];
              updatedClasses[index].title = e.target.value; // Actualizar el estado local
              setClasses(updatedClasses);
            }} 
          />
        )}
      />
      {errors.classes?.[index]?.className && <p className="error-message">{errors.classes[index].className.message}</p>}
    </div>

 {/* Video de Clase */}
<div className="form-group">
  <label htmlFor={`classVideo-${classItem.id}`}>Video de Clase</label>
  <Controller
    name={`classes[${index}].video.file`}
    control={control}
    rules={{
      validate: {
        required: (files) => files && files.length > 0 || "El video es requerido.",
        maxSize: (files) =>
          files && Array.from(files).every((file) => file.size <= 800 * 1024 * 1024) ||
          "El video no debe superar los 800MB.",
      },
    }}
    render={({ field }) => (
      <input
        className="form-input"
        type="file"
        accept="video/*"
        id={`classVideo-${classItem.id}`}
        onChange={(e) => {
          const file = e.target.files[0]; // Obtiene el archivo

          // Maneja el caso cuando no hay archivo (es decir, cuando se cancela la selección)
          if (file) {
            field.onChange([file]); // Envuelve el archivo en un array
            handleFileChange(index, "video", file); // Procesa el archivo

            // Guardar solo la URL del video como blob en el estado
            const updatedClasses = [...classes];
            updatedClasses[index].video.url = URL.createObjectURL(file); // Establece la URL del archivo en el estado
            setClasses(updatedClasses);
          } else {
            field.onChange([]); // Limpia el valor como un array vacío
            handleFileChange(index, "video", null); // Limpia el estado
          }
        }}
      />
    )}
  />
  {errors.classes?.[index]?.video?.file && (
    <p className="error-message">{errors.classes[index].video.file.message}</p>
  )}
</div>


    {/* Campo para el nombre del video */}
    <div className="form-group">
      <label htmlFor={`videoName-${classItem.id}`}>Nombre del Video</label>
      <Controller
        name={`classes[${index}].video.name`}
        control={control}
        defaultValue={classItem.video.name}
        rules={{
          required: "El nombre del video es requerido.",
          maxLength: {
            value: 50,
            message: "El nombre del video no puede superar los 50 caracteres.",
          },
        }}
        render={({ field }) => (
          <input
            className="form-input"
            id={`videoName-${classItem.id}`}
            {...field}
            onChange={(e) => {
              field.onChange(e.target.value);
              const updatedClasses = [...classes];
              updatedClasses[index].video.name = e.target.value; // Actualizar el nombre en el estado
              setClasses(updatedClasses);
            }}
          />
        )}
      />
      {errors.classes?.[index]?.video?.name && <p className="error-message">{errors.classes[index].video.name.message}</p>}
    </div>

{/* Archivo Adjunto */}
<div className="form-group">
  <label htmlFor={`classFile-${classItem.id}`}>Archivo Adjunto</label>
  <Controller
    name={`classes[${index}].file.file`}
    control={control}
    rules={{
      validate: {
        // Validación para tipos de archivo permitidos
        fileType: (file) => {
          if (!file) return true; // Si no hay archivo, es válido
          const allowedTypes = ['.rar', '.pdf', '.doc', '.docx', '.ppt', '.pptx', '.jpg', '.jpeg', '.png'];
          const fileExtension = file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1);
          return allowedTypes.includes(`.${fileExtension}`) || "El archivo debe ser .rar, .pdf, .doc, .docx, .ppt, .pptx, .jpg, .jpeg o .png.";
        },
        // Validación para tamaño máximo del archivo
        maxSize: (file) => {
          if (!file) return true; // Si no hay archivo, es válido
          return file.size <= 50 * 1024 * 1024 || "El archivo no debe superar los 50MB.";
        },
      },
    }}
    render={({ field }) => (
      <input
        className="form-input"
        type="file"
        id={`classFile-${classItem.id}`}
        onChange={(e) => {
          const file = e.target.files[0];
          field.onChange(file);
          handleFileChange(index, "file", file);
        }}
      />
    )}
  />

  {errors.classes?.[index]?.file?.file && <p className="error-message">{errors.classes[index].file.file.message}</p>}
</div>


{/* Campo para el nombre del archivo */}
<div className="form-group">
  <label htmlFor={`attachmentName-${classItem.id}`}>Nombre del Archivo</label>
  <Controller
    name={`classes[${index}].file.name`}
    control={control}
    defaultValue={classItem.file.name}
    rules={{
      required: "El nombre del archivo requerido.",
      maxLength: {
        value: 50,
        message: "El nombre del archivo no puede superar los 50 caracteres.",
      },
    }}
    render={({ field }) => (
      <input
        className="form-input"
        id={`attachmentName-${classItem.id}`}
        {...field}
        onChange={(e) => {
          field.onChange(e.target.value);
          const updatedClasses = [...classes];
          updatedClasses[index].file.name = e.target.value; // Actualizar el nombre en el estado
          setClasses(updatedClasses);
        }}
      />
    )}
  />
  {errors.classes?.[index]?.file?.name && <p className="error-message">{errors.classes[index].file.name.message}</p>}
</div>

   {/* Botón para quitar clase */}
   <button
      type="button"
      className="btn-remove-class"
      onClick={() => handleRemoveClass(index)}
    >
      Quitar Clase
    </button>

  </div>
))}
       <button type="button" onClick={addNewClass}>Agregar Nueva Clase</button>

        {/* Fechas */}
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={noDates}
              onChange={(e) => setNoDates(e.target.checked)}
            />
            Curso en línea (sin fechas específicas)
          </label>
        </div>

        {!noDates && (
          <>
            <div className="form-group">
              <label htmlFor="startDate">Fecha de Inicio</label>
              <Controller
                name="startDate"
                control={control}
                defaultValue=""
                rules={{ required: "La fecha de inicio es requerida." }}
                render={({ field }) => (
                  <DatePicker
                    id="startDate"
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date)}
                  />
                )}
              />
              {errors.startDate && <p className="error-message">{errors.startDate.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="endDate">Fecha de Fin</label>
              <Controller
                name="endDate"
                control={control}
                defaultValue=""
                rules={{ required: "La fecha de finalización es requerida." }}
                render={({ field }) => (
                  <DatePicker
                    id="endDate"
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date)}
                    minDate={startDate ? new Date(startDate) : new Date()}
                  />
                )}
              />
              {errors.endDate && <p className="error-message">{errors.endDate.message}</p>}
            </div>
          </>
        )}

          {/* Precio */}
         <div className="form-group">
  <label htmlFor="price">Precio $</label>
  <Controller
    name="price"
    control={control}
    rules={{
      required: "El precio es requerido.",
      validate: {
        maxDigits: (value) => {
          const rawValue = value.replace(/[^\d]/g, ''); // Remover cualquier cosa que no sea número
          return rawValue.length <= 10 || "El precio no debe exceder 10 dígitos.";
        },
      },
    }}
    render={({ field }) => (
      <Cleave
        {...field}
        value={field.value || ''} // El valor inicial puede estar vacío
        id="price"
        options={{
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
          numeralDecimalScale: 2, // Mantén siempre 2 decimales
          numeralIntegerScale: 8, // Limita el número máximo de dígitos antes del punto decimal
          rawValueTrimPrefix: true,
          onValueChanged: (e) => {
            // Lógica para manejar cómo se muestran los dígitos
            const rawValue = e.target.rawValue.replace(/[^\d]/g, ''); // Mantener sólo dígitos
            if (rawValue.length > 10) return; // No permitir más de 10 dígitos
            field.onChange(e.target.value); // Actualizar el valor en el form
          },
        }}
        placeholder="0,00"
      />
    )}
  />
  {errors.price && <p className="error-message">{errors.price.message}</p>}
          </div>

        <button type="submit">Guardar Curso</button>
      </form>
    </div>
  );
};

export default AddCourseForm;
