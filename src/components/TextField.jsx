const TextField = ({
  containerStyles,
  containerIcon,
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
        className="w-full outline-none py-3.5 pr-5 pl-2 bg-transparent placeholder:text-blue-500 placeholder:font-light placeholder:text-sm"
      />
    </div>
  );
};

export default TextField;
