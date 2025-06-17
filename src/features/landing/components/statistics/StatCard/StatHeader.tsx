interface StatHeaderProps {
  title: string;
  value: string | number;
}

const StatHeader: React.FC<StatHeaderProps> = ({ title, value }) => {
  return (
    <>
      <h3 className="text-2xl font-semibold">{value}</h3>
      <p className="text-gray-500">{title}</p>
    </>
  );
};

export default StatHeader;
