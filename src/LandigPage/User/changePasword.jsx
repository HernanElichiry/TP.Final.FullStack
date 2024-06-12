import React from 'react';

const ChangePasswordForm = () => {
  return (
    <form>
      <div>
        <label htmlFor="currentPassword">Contraseña actual:</label>
        <input type="password" id="currentPassword" required />
      </div>
      <div>
        <label htmlFor="newPassword">Nueva contraseña:</label>
        <input type="password" id="newPassword" required />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirmar nueva contraseña:</label>
        <input type="password" id="confirmPassword" required />
      </div>
      <button type="submit">Cambiar contraseña</button>
    </form>
  );
};

export default ChangePasswordForm;