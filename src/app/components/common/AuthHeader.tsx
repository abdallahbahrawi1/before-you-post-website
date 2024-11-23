interface AuthHeaderProps {
  title: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-extrabold bg-gradient-to-br from-purple-500 to-red-400 text-transparent bg-clip-text">
        {title}
      </h2>
    </div>
  );
};

export default AuthHeader;

