
import { AppShell } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import AppShellNavbar from "./components/AppShellNavbar";
import GreyBox from "./components/GreyBox";
import Inner from "./components/Inner";
import CreateVampire from "./pages/CreateVampire";
import Hunt from "./pages/Hunt";
import Lair from "./pages/Lair";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UpdateVampire from "./pages/UpdateVampire";
import Vampires from "./pages/Vampires";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>

      <BrowserRouter>
        <AppShell
          navbar={<AppShellNavbar />}
          styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
          })}
        >
          <Inner>
            <Routes>
              <Route path="/" element={<Vampires />} />
              <Route path="/signup" element={<GreyBox><SignUp /></GreyBox>} />
              <Route path="/create" element={<GreyBox><CreateVampire /></GreyBox>} />
              <Route path="/hunt" element={<Hunt />} />
              <Route path="/login" element={<GreyBox><Login /></GreyBox>} />
              <Route path="/vampires/:id" element={<UpdateVampire />} />
              <Route path="/lair" element={<Lair />} />
            </Routes>
          </Inner>
        </AppShell>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;
