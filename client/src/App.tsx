
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css';
import CreateVampire from "./pages/CreateVampire";
import Login from "./pages/Login";
import UpdateVampire from "./pages/UpdateVampire";
import Vampires from "./pages/Vampires";

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <h1>Feast on their Blood</h1>
        <Link to="/login">Login</Link>
        <Link to="/">Vampires</Link>
        <Link to="/create">Create New Vampire</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Vampires />} />
        <Route path="/create" element={<CreateVampire />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vampires/:id" element={<UpdateVampire />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
