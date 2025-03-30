import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-indigo-600">SVETA</div>
      <nav className="space-x-4">
        <Link to="/projects">Projets</Link>
        <Link to="/projects/create">Créer un projet</Link>
      </nav>
    </div>
  );
}
