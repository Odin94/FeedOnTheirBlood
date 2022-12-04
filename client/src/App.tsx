
import { AppShell, Box, Header, Navbar, Text } from "@mantine/core";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './App.css';
import CreateVampire from "./pages/CreateVampire";
import Login from "./pages/Login";
import UpdateVampire from "./pages/UpdateVampire";
import Vampires from "./pages/Vampires";

const App = () => {
  return (
    <BrowserRouter>
      <AppShell
        navbar={<Navbar width={{ base: 300 }} height={500} p="xs">
          {
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text component={Link} variant="link" to="/login">
                Login
              </Text>
              <Text component={Link} variant="link" to="/">
                Vampires
              </Text>
              <Text component={Link} variant="link" to="/create">
                Create New Vampire
              </Text>
            </div>
          }
        </Navbar>}
        header={<Header height={60} p="xs">{<h1>Feast on their Blood</h1>}</Header>}
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >
        <Routes>
          <Route path="/" element={<Vampires />} />
          <Route path="/create" element={<CreateVampire />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vampires/:id" element={<UpdateVampire />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}

export default App;
