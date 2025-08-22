export default function Badge({ children }) {
  const color =
    children === 'Enviado' ? 'bg-green-100 text-green-700'
    : children === 'Pendiente' ? 'bg-yellow-100 text-yellow-700'
    : 'bg-red-100 text-red-700';
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{children}</span>;
}
