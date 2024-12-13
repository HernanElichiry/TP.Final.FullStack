import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddCourseForm.css";
import { useUser } from "../UserContext/UserContext";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const AddCourseForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setValue,
  } = useForm();
  const { user } = useUser();
  const startDate = watch("startDate");
  const [noDates, setNoDates] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null); // Variable de estado para la imagen
  const [categories, setCategories] = useState([]);
  const [availableTopics, setAvailableTopics] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/categories/Categories-With-Topics"
        );
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filtra los tópicos disponibles según la categoría seleccionada
    if (selectedCategoryId) {
      const selectedCategory = categories.find(
        (cat) => cat.id === parseInt(selectedCategoryId)
      );
      const filteredTopics = selectedCategory ? selectedCategory.topics : [];
      setAvailableTopics(filteredTopics);
      setValue("topics", []); // Resetea la selección de tópicos al cambiar de categoría
    } else {
      setAvailableTopics([]);
    }
  }, [selectedCategoryId, categories, setValue]);

  const videoUrl = watch("videoUrl"); // Observa el valor de videoUrl
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  // Función para verificar si la URL es un enlace válido de YouTube
  const isYouTubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  // Función para mostrar el precio formateado
  const formatPriceForDisplay = (price) => {
    return new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price || 0);
  };

  const onSubmit = async (data) => {
    /*if (!noDates && new Date(data.endDate) <= new Date(data.startDate)) {
      setError("endDate", { type: "manual", message: "La fecha de finalización debe ser posterior a la de inicio." });
      return;
    }*/

    const token = Cookies.get("token"); // Obtén el token de las cookies
    const formData = new FormData();

    // Agregar los datos del curso
    formData.append("title", data.courseName);
    formData.append("description", data.courseDescription);
    formData.append("duration", data.courseDuration);
    formData.append("platform", data.institution);
    formData.append("category_id", data.category.toString());
    formData.append("instructor_id", user.sub.toString());

    if (videoUrl) {
      formData.append("videoUrl", data.videoUrl.toString());
    }

    if (backgroundImage) {
      formData.append("file", backgroundImage); //le pongo file y no filename por el interceptor
    }
    formData.append("price", data.price);
    data.topics.forEach((topic) => formData.append("topicIds[]", topic));

    if (!noDates) {
      if (data.endDate) {
        formData.append(
          "deactivationDate",
          new Date(data.endDate).toISOString().split("T")[0]
        );
      }
      //formData.append('startDate', data.startDate);
      //formData.append('endDate', data.endDate);
    }

    // Para verificar que los datos están correctos antes de enviar
    console.log("Datos del formulario a enviar:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch("http://localhost:3000/courses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Curso agregado exitosamente");
        message.success("Curso agregado exitosamente", 2); // Mensaje de éxito
        navigate("/professormenu/my-courses-professor");
      } else {
        const errorData = await response.json();
        console.error("Error al agregar el curso:", errorData);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
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
            rules={{
              required: "El nombre del curso es requerido.",
              maxLength: {
                value: 70,
                message: "El nombre no puede superar los 70 caracteres.",
              },
            }}
            render={({ field }) => (
              <input className="form-input" id="courseName" {...field} />
            )}
          />
          {errors.courseName && (
            <p className="error-message">{errors.courseName.message}</p>
          )}
        </div>
        {/* Descripción */}
        <div className="form-group">
          <label htmlFor="courseDescription">Descripción</label>
          <Controller
            name="courseDescription"
            control={control}
            defaultValue=""
            rules={{
              required: "La descripción es requerida.",
              maxLength: {
                value: 320,
                message: "La descripción no puede superar los 320 caracteres.",
              },
              minLength: {
                value: 100,
                message:
                  "La descripción debe contener al menos 100 caracteres.",
              },
            }}
            render={({ field }) => (
              <textarea
                className="form-input"
                id="courseDescription"
                {...field}
              />
            )}
          />
          {errors.courseDescription && (
            <p className="error-message">{errors.courseDescription.message}</p>
          )}
        </div>
        {/* Duración */}
        <div className="form-group">
          <label htmlFor="courseDuration">Duración (en horas)</label>
          <Controller
            name="courseDuration"
            control={control}
            defaultValue=""
            rules={{
              required: "La duración es requerida.",
              min: {
                value: 1,
                message: "La duracion debe ser un numero positivo.",
              },
            }}
            render={({ field }) => (
              <input
                className="form-input"
                type="number"
                id="courseDuration"
                {...field}
              />
            )}
          />
          {errors.courseDuration && (
            <p className="error-message">{errors.courseDuration.message}</p>
          )}
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
              <select
                className="form-input"
                id="category"
                {...field}
                onChange={(e) => {
                  setSelectedCategoryId(e.target.value);
                  field.onChange(e.target.value);
                }}
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.category && (
            <p className="error-message">{errors.category.message}</p>
          )}
        </div>
        {/* Tópicos */}
        <div className="form-group">
          <label>Temas (mínimo 1)</label>
          <Controller
            name="topics"
            control={control}
            defaultValue={[]}
            rules={{
              validate: (value) =>
                value.length >= 1 || "Selecciona al menos 1 tópico.",
            }}
            render={({ field }) => (
              <div className="topics-container">
                {availableTopics.map((topic) => (
                  <label key={topic.id} className="topic-label">
                    <input
                      type="checkbox"
                      value={topic.id}
                      checked={field.value.includes(topic.id)}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...field.value, topic.id] // Añadir tópico
                          : field.value.filter((t) => t !== topic.id); // Quitar tópico
                        field.onChange(newValue); // Actualiza el valor en el formulario
                      }}
                    />
                    {topic.topic}
                  </label>
                ))}
              </div>
            )}
          />
          {errors.topics && (
            <p className="error-message">{errors.topics.message}</p>
          )}
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
                message: "La institución no puede superar los 50 caracteres.",
              },
            }}
            render={({ field }) => (
              <input className="form-input" id="institution" {...field} />
            )}
          />
          {errors.institution && (
            <p className="error-message">{errors.institution.message}</p>
          )}
        </div>
        {/* Imagen de Fondo */}
        <div className="form-group">
          <label htmlFor="backgroundImage">Imagen de Fondo</label>
          <Controller
            name="backgroundImage"
            control={control}
            defaultValue={null}
            rules={{
              required: "La imagen de fondo es requerida.",
              validate: (file) =>
                (file && file.size <= 5 * 1024 * 1024) ||
                "La imagen no debe exceder los 5MB.",
            }}
            render={({ field }) => (
              <input
                type="file"
                accept="image/*"
                id="backgroundImage"
                onChange={(e) => {
                  const file = e.target.files[0]; // Asegúrate de acceder al primer archivo
                  setBackgroundImage(file); // Almacena el archivo en el estado
                  field.onChange(file); // Almacena el archivo en el control de react-hook-form
                }}
              />
            )}
          />
          {errors.backgroundImage && (
            <p className="error-message">{errors.backgroundImage.message}</p>
          )}
        </div>
        {/* Video Presentación */}
        <div className="form-group">
          <label>Video URL (YouTube)</label>
          <Controller
            name="videoUrl"
            control={control}
            defaultValue={""}
            rules={{
              required: "El video Presentacion es requerido.",
              validate: (url) =>
                isYouTubeUrl(url) ||
                "Por favor, ingresa un URL válido de YouTube.",
            }}
            render={({ field }) => (
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=XXXXXX"
                {...field}
                value={field.value || ""}
                onBlur={() => setIsPreviewVisible(isYouTubeUrl(field.value))}
              />
            )}
          />
          {errors.videoUrl && (
            <p className="error-message">{errors.videoUrl.message}</p>
          )}
        </div>
        {/* Vista previa de YouTube */}
        {isPreviewVisible && (
          <div className="video-preview">
            <h4>Vista previa del video:</h4>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${new URL(
                videoUrl
              ).searchParams.get("v")}`}
              title="YouTube video preview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

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
                    //minDate={startDate ? new Date(startDate) : new Date()}
                  />
                )}
              />
              {errors.endDate && (
                <p className="error-message">{errors.endDate.message}</p>
              )}
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
                  const rawValue = value.toString().replace(/\D/g, ""); // Remover cualquier cosa que no sea número
                  return (
                    rawValue.length <= 10 ||
                    "El precio no debe exceder 10 dígitos."
                  );
                },
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                id="price"
                type="text"
                value={formatPriceForDisplay(field.value)} // Muestra el precio formateado
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, ""); // Mantener solo dígitos
                  const numericPrice = parseFloat(rawValue) / 100; // Convertir a decimal
                  field.onChange(numericPrice); // Actualizar valor en el form (numérico, sin formato)
                }}
                placeholder="0,00"
              />
            )}
          />
          {errors.price && (
            <p className="error-message">{errors.price.message}</p>
          )}
        </div>

        <button type="submit" className="save-course-button">
          Guardar Curso
        </button>
      </form>
    </div>
  );
};

export default AddCourseForm;
