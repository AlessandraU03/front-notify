export default function Badge({ children, color }) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}
    >
      {children}
    </span>
  );
}
