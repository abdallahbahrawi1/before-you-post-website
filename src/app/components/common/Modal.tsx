const Modal: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(27,45,69,0.5)] backdrop-blur z-50">
    {children}
  </div>
  );
}

export default Modal;