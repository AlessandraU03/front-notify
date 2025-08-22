export default function Button({ className = '', ...rest }) {
  return (
    <button
      className={`px-4 py-2 rounded-2xl shadow text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 ${className}`}
      {...rest}
    />
  );
}
