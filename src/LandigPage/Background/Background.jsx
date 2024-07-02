import React from "react";
import "./Background.css";
import SearchBar from "../SearchBar/SearchBar";
import einsteinImage from "./einstein4.png";
import { Row, Col } from 'antd';

export const HomePageText = () => {
  return (
    <div className="landingpage-container">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={12} className="landingpage-text">
          <h1>Einstein.</h1>
          <p>Descubre. Aprende. Avanza.</p>
          <p>
            En Einstein, creemos que el conocimiento es tan infinito como el
            universo, que hemos venido a este mundo para aprender y que todos
            tenemos algo para enseñar. Por eso, te ofrecemos una galaxia de cursos
            para que explores y amplíes tus horizontes.
          </p>
          <SearchBar />
        </Col>
        <Col xs={24} md={12}>
          <img
            src={einsteinImage}
            alt="Fondo de página"
            className="background-img"
            style={{ width: '100%', height: 'auto' }}
          />
        </Col>
      </Row>
    </div>
  );
};
