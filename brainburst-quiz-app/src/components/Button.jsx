function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        w-full 
        sm:w-auto        
        px-6 py-2 
        bg-blue-600 
        text-white 
        font-medium
        rounded-lg 
        hover:bg-blue-700 
        transition-colors
      "
    >
      {children}
    </button>
  );
}

export default Button;
