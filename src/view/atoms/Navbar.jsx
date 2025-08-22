import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold">Sistema de Notificaciones</Link>
        <div className="space-x-3">
          <Link to="/" className="text-sm hover:underline">Inicio</Link>
        </div>
      </div>
    </nav>
  );
}
