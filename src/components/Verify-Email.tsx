interface VerifyEmailProps {
  name: string;
}

export const VerifyEmail: React.FC<Readonly<VerifyEmailProps>> = ({ name }) => (
  <div className="bg-red-500">
    <h1>Verify your email, {name}!</h1>
  </div>
);
