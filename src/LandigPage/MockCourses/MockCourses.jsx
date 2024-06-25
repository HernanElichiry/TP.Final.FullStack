const courses = [
  {
    id: 1,
    image: "https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg",
    title: "Curso de Física",
    description: "Descripción del curso de física",
    rating: 5,
    price: "****",
  },
  {
    id: 2,
    image:
      "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Química",
    description: "Descripción del curso de química",
    rating: 4,
    price: "****",
  },
  {
    id: 3,
    image:
      "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Matemáticas",
    description: "Descripción del curso de matemáticas",
    rating: 5,
    price: "****",
  },
  {
    id: 4,
    image:
      "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Biología",
    description: "Descripción del curso de biología",
    rating: 4,
    price: "****",
  },
  {
    id: 5,
    image:
      "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Historia",
    description: "Descripción del curso de historia",
    rating: 4,
    price: "****",
  },
  {
    id: 6,
    image:
      "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Literatura",
    description: "Descripción del curso de literatura",
    rating: 5,
    price: "****",
  },
  {
    id: 7,
    image:
      "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Física",
    description: "Descripción del curso de física",
    rating: 5,
    price: "****",
  },
  {
    id: 8,
    image:
      "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Química",
    description: "Descripción del curso de química",
    rating: 4,
    price: "****",
  },
  {
    id: 9,
    image:
      "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Matemáticas",
    description: "Descripción del curso de matemáticas",
    rating: 5,
    price: "****",
  },
  {
    id: 10,
    image:
      "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Biología",
    description: "Descripción del curso de biología",
    rating: 4,
    price: "****",
  },
  {
    id: 11,
    image:
      "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Historia",
    description: "Descripción del curso de historia",
    rating: 4,
    price: "****",
  },

  {
    id: 12,
    image:
      "src/LandigPage/navbar/vecteezy_physics-icon-logo-vector-illustration-molecular-atom_11301216.jpg",
    title: "Curso de Literatura",
    description: "Descripción del curso de literatura",
    rating: 5,
    price: "****",
  },
];

export const getCourses = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(courses);
    }, 200);
  });
};

export const getCourseById = (courseId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(courses.find((course) => course.id == courseId));
    }, 200);
  });
};
