import { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, message } from "antd";
import moment from "moment";
import { useUser } from "../UserContext/UserContext";
import "./dataComponent.css";
import Cookies from "js-cookie";

const DataComponent = () => {
  const { user, logout } = useUser(); // Obtener el usuario del contexto
  const [userData, setUserData] = useState({
    name: "",
    birthDate: null,
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const userId = user?.sub; // Obtener el ID del usuario desde el contexto

  // Cargar los datos del usuario al montar el componente
  useEffect(() => {
    if (!userId) {
      message.error("No se pudo identificar al usuario.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData({
            name: data.name,
            birthDate: data.birthdate,
            email: data.email,
          });
        } else {
          message.error("Error al cargar los datos del usuario");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        message.error("Error al conectar con el servidor");
      }
    };

    fetchUserData();
  }, [userId]);

  // Manejadores para cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setUserData((prevData) => ({
      ...prevData,
      birthDate: dateString,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, birthDate, email } = userData;
    if (!name || !birthDate || !email) {
      message.error(
        "Por favor, complete todos los campos antes de actualizar."
      );
      return;
    }

    setLoading(true);

    try {
      const token = Cookies.get("token"); // Obtener el token de las cookies

      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        message.success("Datos del usuario actualizados con éxito");
      } else {
        message.error("Error al actualizar los datos del usuario");
      }
    } catch (error) {
      console.error("Error al actualizar los datos del usuario:", error);
      message.error("Ocurrió un error, inténtalo nuevamente");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveUser = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");

      const response = await fetch(
        `http://localhost:3000/users/${userId}/deactivate`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        message.success("Cuenta eliminada exitosamente.");
        logout();
        window.location.ref = "/login";
      } else {
        message.error("Error al eliminar la cuenta.");
      }
    } catch (err) {
      console.error("Error al eliminar la cuenta:", err);
      err.message("Ocurrió un error, intentalo nuevamente.");
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
      <h2>Actualizar Perfil</h2>
      <Form.Item label="Nombre Completo">
        <Input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Ingrese su nombre completo"
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
        <Input type="email" name="email" value={userData.email} readOnly />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        className="btn-submit"
        loading={loading}
      >
        Actualizar
      </Button>
      <Button
        type="primary"
        danger
        onClick={handleRemoveUser}
        className="btn-submit"
        style={{ marginTop: "1rem" }}
        loading={loading}
      >
        Eliminar cuenta
      </Button>
    </Form>
  );
};

export default DataComponent;
