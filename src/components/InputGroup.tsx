type InputGroup = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  inputProps?: Record<string, unknown>;
};
export default function InputGroup({
  name,
  label,
  placeholder,
  type = "text",
  inputProps,
}: InputGroup) {
  return (
    <div className="mb-3">
      {label && (
        <label
          className="block text-gray-300 text-sm font-bold mb-2"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        {...inputProps}
      />
    </div>
  );
}
