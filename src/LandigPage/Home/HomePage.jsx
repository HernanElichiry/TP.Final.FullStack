import Navbar from "../navbar/navbar";
import { HomePageText } from "../Background/Background";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePageText />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default HomePage;
