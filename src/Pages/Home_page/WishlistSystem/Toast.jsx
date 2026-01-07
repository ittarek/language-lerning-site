const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-blue-500';
  const Icon = type === 'success' ? FaCheckCircle : FaInfoCircle;

  return (
    <div
      className={`fixed top-20 right-4 ${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-slide-in`}>
      <Icon className="w-5 h-5" />
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:bg-white/20 rounded-full p-1">
        <FaTimes className="w-4 h-4" />
      </button>
    </div>
  );
};
export default Toast;