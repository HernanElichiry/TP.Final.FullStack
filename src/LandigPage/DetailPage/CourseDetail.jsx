import React from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '../MockCourses/MockCourses';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find(course => course.id === parseInt(id));

  if (!course) {
    return <div>Curso no encontrado</div>;
  }

  return (
    <div className="course-container">
            <div className="course-image">
                <img src={course.image} alt={course.title} />
            <h1>{course.title}</h1>
            <h2>{course.instructor}</h2>
            <h2>{course.duration}Hs</h2>
            <p>{course.description}</p>
            <button className="button is-primary">
                <span className="icon">
                    <i className="fas fa-arrow-right"></i>
                </span>
                <span>Link del curso</span>
            </button>
            </div>
            <div className="course-info">
                <section className="course-info-section">
                    <h2>Descripcion del curso</h2>
                    
                    <p>{course.description}</p>
                </section>
                <section className="course-info-section">
                    <h2>Temas del curso</h2>
                    {course.topics.map(topic => <p>{topic}</p>)}
                </section>

                <section className="course-info-section">
                    <h2> Categoria</h2>
                    <p>{course.category}</p>
                    <h2>Precio del curso</h2>
                    <p>{course.price} euros</p>
                    <h2>Rating del curso</h2>
                    <p>{course.rating}</p>
                    <h2>Plataforma del curso</h2>
                    <p>{course.platform}</p>
                </section>

            </div>



        </div> );
};

export default CourseDetail;
