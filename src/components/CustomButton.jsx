"use client";

const CustomButton = ({ type, containerStyles, handleButton, title }) => {
  return (
    <button
      type={type || "button"}
      className={containerStyles || ""}
      onClick={handleButton}
    >
      {title}
    </button>
  );
};

export default CustomButton;
