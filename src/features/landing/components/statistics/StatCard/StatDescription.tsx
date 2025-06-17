interface StatDescriptionProps {
  description?: React.ReactNode;
}

const StatDescription: React.FC<StatDescriptionProps> = ({ description }) => {
  return description ? <div className="mt-2">{description}</div> : null;
};

export default StatDescription;
