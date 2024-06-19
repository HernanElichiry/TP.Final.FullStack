import React, { useState } from "react";
import "./ChangePassword.css";
import { Form, Input, Button } from "antd";

const ChangePasswordForm = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes añadir la lógica para cambiar la contraseña
    console.log("Datos de la contraseña:", passwordData);
  };

  return (
    <Form
      className="form-container"
      layout="vertical"
      onSubmitCapture={handleSubmit}
    >
      <h2>Cambiar Contraseña</h2>
      <Form.Item label="Contraseña Actual">
        <Input.Password
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={handleChange}
          placeholder="Ingrese su contraseña actual"
        />
      </Form.Item>
      <Form.Item label="Nueva Contraseña">
        <Input.Password
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handleChange}
          placeholder="Ingrese su nueva contraseña"
        />
      </Form.Item>
      <Form.Item label="Confirmar Nueva Contraseña">
        <Input.Password
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirme su nueva contraseña"
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" className="btn-submit">
        Cambiar Contraseña
      </Button>
    </Form>
  );
};

export default ChangePasswordForm;
