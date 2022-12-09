
import { AppShell } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import AppShellHeader from "./components/AppShellHeader";
import AppShellNavbar from "./components/AppShellNavbar";
import CreateVampire from "./pages/CreateVampire";
import Hunt from "./pages/Hunt";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UpdateVampire from "./pages/UpdateVampire";
import Vampires from "./pages/Vampires";

const App = () => {
  return (
    <BrowserRouter>
      <AppShell
        navbar={<AppShellNavbar />}
        header={<AppShellHeader />}
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >
        <Routes>
          <Route path="/" element={<Vampires />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create" element={<CreateVampire />} />
          <Route path="/hunt" element={<Hunt />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vampires/:id" element={<UpdateVampire />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}

export default App;
