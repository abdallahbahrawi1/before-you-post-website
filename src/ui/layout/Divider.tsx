const Divider = ({ text = "or" }) => (
  <div className="flex items-center my-6">
    <div className="flex-grow border-t border-gray-200"></div>
    <span className="px-4 text-gray-500">{text}</span>
    <div className="flex-grow border-t border-gray-200"></div>
  </div>
);

export default Divider;
