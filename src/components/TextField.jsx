const TextField = ({
  containerStyles,
  name,
  type,
  placeholder,
  inputValue,
  changeHandler,
}) => {
  return (
    <div className={containerStyles || ""}>
      {containerIcon && <div>{containerIcon}</div>}
      <input
        name={name}
        type={type || "text"}
        placeholder={placeholder || "Type here"}
        value={inputValue}
        onChange={changeHandler}
      />
    </div>
  );
};

export default TextField;
