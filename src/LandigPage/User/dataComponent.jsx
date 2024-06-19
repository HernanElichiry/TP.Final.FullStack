import React, { useState } from "react";
import "./dataComponent.css";
import { Form, Input, Button, DatePicker } from "antd";

const DataComponent = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    birthDate: null,
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleDateChange = (date, dateString) => {
    setUserData({
      ...userData,
      birthDate: dateString,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar userData a tu backend o API
    console.log("Datos del usuario actualizados:", userData);
  };

  return (
    <Form
      className="form-container"
      layout="vertical"
      onSubmitCapture={handleSubmit}
    >
      <h2>Actualizar Perfil</h2>
      <Form.Item label="Nombre">
        <Input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          placeholder="Ingrese su nombre"
        />
      </Form.Item>
      <Form.Item label="Apellido">
        <Input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          placeholder="Ingrese su apellido"
        />
      </Form.Item>
      <Form.Item label="Fecha de Nacimiento">
        <DatePicker
          name="birthDate"
          value={userData.birthDate ? moment(userData.birthDate) : null}
          onChange={handleDateChange}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item label="Email">
        <Input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Ingrese su email"
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" className="btn-submit">
        Actualizar
      </Button>
    </Form>
  );
};
export default DataComponent;
