import { FavCard } from "./FavCard/FavCard";

const course = [
  {
    id: 1,
    image:
      "https://concepto.de/wp-content/uploads/2018/08/f%C3%ADsica-e1534938838719.jpg",
    title: "Curso de Física",
    description: "Descripción del curso de física",
    rating: 5,
    price: "****",
  },
];

const Favorites = () => {
  return (
    <div>
      <FavCard course={course} />
    </div>
  );
};

export default Favorites;
