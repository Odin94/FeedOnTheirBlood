
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { ReactComponent as Logo } from "./logo.svg";
import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Vampires from "./pages/Vampires";
import Login from "./pages/Login";
import CreateVampire from "./pages/CreateVampire";

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
      </Routes>
    </BrowserRouter>
  )
}

export default App;
