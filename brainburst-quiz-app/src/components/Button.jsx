function Button({ children, onClick, className = "", type = "button", disabled = false }) {
  const baseClasses = `
        w-full 
        px-6 py-2 
        bg-blue-600 
        text-white 
        font-medium
        rounded-lg 
        hover:bg-blue-700 
        transition-colors
        disabled:opacity-60
        disabled:cursor-not-allowed
      `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
