import { FiUpload } from 'react-icons/fi';

const Placeholder: React.FC = () => (
  <div className="flex flex-col items-center gap-4 text-deep-blue">
    <FiUpload size={48} />
    <p>Drag & drop here, or click to select a file</p>
  </div>
);

export default Placeholder;