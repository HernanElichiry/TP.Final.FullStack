import { useState } from "react";
import "./ChangePassword.css";
import { Form, Input, Button } from "antd";
import Cookies from "js-cookie";
import { useUser } from "../UserContext/UserContext";

const ChangePasswordForm = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación de que las nuevas contraseñas coincidan
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      message.error("Las contraseñas no coinciden");
      return;
    }
    setLoading(true); // Comienza a cargar
    try {
      const token = Cookies.get("token"); // Obtener el token del usuario
      const user_id = user.sub;
      console.log(user_id);
      console.log(token);
      const response = await fetch(`http://localhost:3000/auth/change-password/${user_id}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Enviar el token en el encabezado para autenticación
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        message.success("Contraseña actualizada con éxito");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        message.error(data.message || "falla la consulta");
      }
    } catch (error) {
      console.error("falla la consulta:", error);
      message.error("Ocurrió un error, inténtalo nuevamente");
    } finally {
      setLoading(false);
    }

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
          required
        />
      </Form.Item>
      <Form.Item label="Nueva Contraseña">
      <Input.Password
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handleChange}
          placeholder="Ingrese su nueva contraseña"
          required
        />
      </Form.Item>
      <Form.Item label="Confirmar Nueva Contraseña">
      <Input.Password
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirme su nueva contraseña"
          required
        />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        className="btn-submit"
        loading={loading}
      >
        Cambiar Contraseña
      </Button>
    </Form>
  );
};

export default ChangePasswordForm;
