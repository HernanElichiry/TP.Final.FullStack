import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Input, Button, Radio, Divider, notification, Spin } from "antd";
import { CreditCardOutlined, WalletOutlined, BarcodeOutlined, ShoppingOutlined, LoadingOutlined } from "@ant-design/icons";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const location = useLocation();
  const { course, user } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [isLoading, setIsLoading] = useState(false);

  if (!course || !user) {
    return <div className="checkout-error">Error al cargar los detalles de compra.</div>;
  }

  // Manejo del envío del formulario
  const handlePaymentSubmit = (values) => {
    setIsLoading(true); // Inicia el estado de carga
    setTimeout(() => {
      setIsLoading(false); // Detiene el estado de carga después de un tiempo simulado
      notification.success({
        message: "Compra exitosa",
        description: `El pago del curso "${course.title}" ha sido procesado exitosamente.`,
      });
    }, 5000); // Simula una espera de 2 segundos
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Proceso de Pago</h2>
      <Divider className="checkout-divider" />
      <div className="checkout-details">
        <p><strong>Curso:</strong> {course.title}</p>
        <p><strong>Instructor:</strong> {course.instructor.name}</p>
        <p><strong>Precio:</strong> ${course.price}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <Divider className="checkout-divider" />

      <Form layout="vertical" onFinish={handlePaymentSubmit} className="checkout-form">
        <Form.Item name="paymentMethod" label="Método de Pago" rules={[{ required: true, message: "Selecciona un método de pago" }]}>
          <Radio.Group onChange={handlePaymentMethodChange} value={paymentMethod} className="checkout-radio-group">
            <Radio.Button value="creditCard" className="checkout-radio-button"><CreditCardOutlined /> Tarjeta de Crédito</Radio.Button>
            <Radio.Button value="debitCard" className="checkout-radio-button"><CreditCardOutlined /> Tarjeta de Débito</Radio.Button>
            <Radio.Button value="paypal" className="checkout-radio-button"><WalletOutlined /> PayPal</Radio.Button>
            <Radio.Button value="bankTransfer" className="checkout-radio-button"><BarcodeOutlined /> Transferencia Bancaria</Radio.Button>
            <Radio.Button value="mercadoPago" className="checkout-radio-button"><ShoppingOutlined /> Mercado Pago</Radio.Button>
          </Radio.Group>
        </Form.Item>

        {(paymentMethod === "creditCard" || paymentMethod === "debitCard") && (
          <>
            <Form.Item name="cardNumber" label="Número de Tarjeta" rules={[{ required: true, message: "Ingresa el número de la tarjeta" }]}>
              <Input placeholder="1234 5678 9012 3456" maxLength={16} className="checkout-input" />
            </Form.Item>
            <Form.Item name="expiryDate" label="Fecha de Vencimiento" rules={[{ required: true, message: "Ingresa la fecha de vencimiento" }]}>
              <Input placeholder="MM/AA" maxLength={5} className="checkout-input" />
            </Form.Item>
            <Form.Item name="cvv" label="CVV" rules={[{ required: true, message: "Ingresa el código CVV" }]}>
              <Input placeholder="123" maxLength={3} className="checkout-input" />
            </Form.Item>
            <Form.Item name="cardHolderName" label="Nombre del Titular" rules={[{ required: true, message: "Ingresa el nombre del titular" }]}>
              <Input placeholder="Nombre en la tarjeta" className="checkout-input" />
            </Form.Item>
          </>
        )}

        {paymentMethod === "paypal" && (
          <p className="checkout-info-text">Pagarás con PayPal. Serás redirigido al sitio web de PayPal para completar el pago.</p>
        )}

        {paymentMethod === "bankTransfer" && (
          <Form.Item name="bankReference" label="Número de Referencia Bancaria" rules={[{ required: true, message: "Ingresa el número de referencia bancaria" }]}>
            <Input placeholder="Referencia de transferencia bancaria" className="checkout-input" />
          </Form.Item>
        )}

        {paymentMethod === "mercadoPago" && (
          <p className="checkout-info-text">Pagarás con Mercado Pago. Serás redirigido a la plataforma de Mercado Pago para completar el pago.</p>
        )}

        <Divider className="checkout-divider" />

        <Form.Item>
          {isLoading ? (
            <div className="loading-container">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: "#ffd700" }} spin />} />
              <p className="loading-text">Verificando datos...</p>
            </div>
          ) : (
            <Button type="primary" htmlType="submit" block className="checkout-button">
              Completar Pago
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default CheckoutPage;
