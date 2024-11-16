import "./Background.css";
import SearchBar from "../SearchBar/SearchBar";
import einsteinImage from "./einstein4.png";

export const HomePageText = () => {
  return (
    <div className="landingpage-container">
      <div className="landingpage-text">
        <h1>
          <strong>Einstein.</strong>
        </h1>
        <p className="landingpage-p">Todo el conocimiento en un solo lugar</p>
        <SearchBar/>
      </div>
      <img
        src={einsteinImage}
        alt="Fondo de página"
        className="background-img"
      />
    </div>
  );
};