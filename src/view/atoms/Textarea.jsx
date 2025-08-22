export default function Textarea({ className = '', ...rest }) {
  return (
    <textarea
      className={`w-full border rounded-xl px-3 py-2 outline-none focus:ring focus:ring-blue-200 min-h-[120px] ${className}`}
      {...rest}
    />
  );
}
