export default function Input({ className = '', ...rest }) {
  return (
    <input
      className={`w-full border rounded-xl px-3 py-2 outline-none focus:ring focus:ring-blue-200 ${className}`}
      {...rest}
    />
  );
}
