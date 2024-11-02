import React, { useState } from 'react';
import { Form, Input, Button, Radio, Divider, notification } from 'antd';
import { CreditCardOutlined, WalletOutlined, BarcodeOutlined } from '@ant-design/icons';

const CheckoutPage = ({ course }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const handlePaymentSubmit = (values) => {
    // Aquí podrías agregar la lógica para enviar la compra al backend
    notification.success({
      message: 'Compra exitosa',
      description: `El pago del curso "${course.title}" ha sido procesado exitosamente.`,
      placement: 'topRight',
    });
    console.log('Detalles de pago:', values, 'Método de pago:', paymentMethod);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Proceso de Pago</h2>
      <Divider />
      <Radio.Group
        onChange={(e) => setPaymentMethod(e.target.value)}
        value={paymentMethod}
        style={{ marginBottom: '20px' }}
      >
        <Radio.Button value="credit_card">
          <CreditCardOutlined /> Tarjeta de Crédito
        </Radio.Button>
        <Radio.Button value="debit_card">
          <CreditCardOutlined /> Tarjeta de Débito
        </Radio.Button>
        <Radio.Button value="wallet">
          <WalletOutlined /> Billetera Digital
        </Radio.Button>
        <Radio.Button value="cash">
          <BarcodeOutlined /> Pago en Efectivo
        </Radio.Button>
      </Radio.Group>

      <Form layout="vertical" onFinish={handlePaymentSubmit}>
        {paymentMethod === 'credit_card' || paymentMethod === 'debit_card' ? (
          <>
            <Form.Item
              name="cardNumber"
              label="Número de Tarjeta"
              rules={[{ required: true, message: 'Por favor ingresa tu número de tarjeta' }]}
            >
              <Input placeholder="1234 5678 9012 3456" maxLength={19} />
            </Form.Item>
            <Form.Item
              name="cardName"
              label="Nombre en la Tarjeta"
              rules={[{ required: true, message: 'Por favor ingresa el nombre que aparece en la tarjeta' }]}
            >
              <Input placeholder="Juan Pérez" />
            </Form.Item>
            <Form.Item
              name="expiryDate"
              label="Fecha de Expiración"
              rules={[{ required: true, message: 'Por favor ingresa la fecha de expiración' }]}
            >
              <Input placeholder="MM/AA" maxLength={5} />
            </Form.Item>
            <Form.Item
              name="cvv"
              label="CVV"
              rules={[{ required: true, message: 'Por favor ingresa el CVV' }]}
            >
              <Input placeholder="123" maxLength={3} />
            </Form.Item>
          </>
        ) : paymentMethod === 'wallet' ? (
          <Form.Item
            name="walletNumber"
            label="Número de Billetera Digital"
            rules={[{ required: true, message: 'Por favor ingresa el número de tu billetera digital' }]}
          >
            <Input placeholder="Número de Billetera" />
          </Form.Item>
        ) : paymentMethod === 'cash' ? (
          <p>Instrucciones para pago en efectivo: Acude a la sucursal más cercana para realizar el pago.</p>
        ) : null}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Completar Pago
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CheckoutPage;
