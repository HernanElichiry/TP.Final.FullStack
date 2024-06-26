import React, { useState } from "react";
import "./AddCourseForm.css";

const AddCourseForm = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [instructor, setInstructor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para agregar el curso
    console.log("Course Added:", {
      courseName,
      courseDescription,
      courseDuration,
      instructor,
      startDate,
      difficultyLevel,
    });
  };

  return (
    <div className="formcont">
      <h2>Agregar Curso</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="courseName">Nombre del Curso</label>
          <input
            className="form-input"
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseDescription">Descripción del Curso</label>
          <textarea
            className="form-input"
            id="courseDescription"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseDuration">Duración del Curso</label>
          <input
            className="form-input"
            type="text"
            id="courseDuration"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructor">Instructor</label>
          <input
            className="form-input"
            type="text"
            id="instructor"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Fecha de Inicio</label>
          <input
            className="form-input"
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="difficultyLevel">Nivel de Dificultad</label>
          <select
            className="form-input"
            id="difficultyLevel"
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(e.target.value)}
            required
          >
            <option value="">Seleccione el nivel</option>
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">
          Agregar Curso
        </button>
      </form>
    </div>
  );
};

export default AddCourseForm;
