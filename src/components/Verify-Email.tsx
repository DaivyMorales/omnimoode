import React from "react";

interface VerifyEmailProps {
  name: string;
  number: any;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ name, number }) => {
  return (
    <div className="bg-red-500">
      <h1>Verify your email, {name}!</h1>
      <p>your code: {number}</p>
    </div>
  );
};

export default VerifyEmail; // Exporta el componente por defecto.
