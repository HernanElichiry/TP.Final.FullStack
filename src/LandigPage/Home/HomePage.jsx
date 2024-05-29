<<<<<<< HEAD
import Navbar from "../navbar/navbar";
import { HomePageText } from "../Background/Background";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
=======
import React from 'react';
import Navbar from '../navbar/navbar';
import { HomePageText } from '../Background/Background';
import ResponsiveCarousel from '../Carousel/ResponsiveCarousel';

const courses = [
  {
    id: 1,
    image: "https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg",
    title: "Curso de Física",
    description: "Descripción del curso de física",
    rating: 5,
    price: "****"
  },
  {
    id: 2,
    image: "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Química",
    description: "Descripción del curso de química",
    rating: 4,
    price: "****"
  },
  {
    id: 3,
    image: "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Matemáticas",
    description: "Descripción del curso de matemáticas",
    rating: 5,
    price: "****"
  },
  {
    id: 4,
    image: "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Biología",
    description: "Descripción del curso de biología",
    rating: 4,
    price: "****"
  },
  {
    id: 5,
    image: "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Historia",
    description: "Descripción del curso de historia",
    rating: 4,
    price: "****"
  },
  {
    id: 6,
    image: "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Literatura",
    description: "Descripción del curso de literatura",
    rating: 5,
    price: "****"
  },
  {
    id: 7,
    image: "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Física",
    description: "Descripción del curso de física",
    rating: 5,
    price: "****"
  },
  {
    id: 8,
    image: "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Química",
    description: "Descripción del curso de química",
    rating: 4,
    price: "****"
  },
  {
    id: 9,
    image: "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Matemáticas",
    description: "Descripción del curso de matemáticas",
    rating: 5,
    price: "****"
  },
  {
    id: 10,
    image: "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Biología",
    description: "Descripción del curso de biología",
    rating: 4,
    price: "****"
  },
  {
    id: 11,
    image: "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Historia",
    description: "Descripción del curso de historia",
    rating: 4,
    price: "****"
  },
  
  {
    id: 12,
    image: "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Literatura",
    description: "Descripción del curso de literatura",
    rating: 5,
    price: "****"
  }
];

>>>>>>> 912ab0511e7ce1f309899682c3912eef67a4ed99

function HomePage() {
  return (
    <>
<<<<<<< HEAD
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePageText />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
=======
        <Navbar/>
        <HomePageText></HomePageText> {/*componente que integra: texto de presentacion, la imagen de einstein y la barra de navegacion*/}   
        <div className='big-box'>
        <ResponsiveCarousel courses={courses} text='Mejor valorados!'/>
        <ResponsiveCarousel courses={courses} text='En promocion!'/>
        <ResponsiveCarousel courses={courses} text='Las mejores universidades promocionan en ENSTEIN'/>
        </div>
  
>>>>>>> 912ab0511e7ce1f309899682c3912eef67a4ed99
    </>
  );
}

export default HomePage;
