import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import CreateProjectPage from "./features/projects/create/CreateProjectPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="projects" element={<h1>Projets</h1>} />
        <Route path="projects/create" element={<CreateProjectPage />} />
      </Route>
    </Routes>
  );
}

export default App;
