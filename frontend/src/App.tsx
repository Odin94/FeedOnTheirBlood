
import { AppShell } from "@mantine/core";
import { createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Clan, useMyClan } from "./api/clans.types";
import './App.css';
import AppShellNavbar from "./components/AppShellNavbar";
import GreyBox from "./components/GreyBox";
import Inner from "./components/Inner";
import ClanWar from "./pages/ClanWar";
import CreateVampire from "./pages/CreateVampire";
import HuntLycans from "./pages/HuntLycans";
import Login from "./pages/Login";
import MyLair from "./pages/MyLair";
import SignUp from "./pages/SignUp";
import UpdateVampire from "./pages/UpdateVampire";
import Vampires from "./pages/Vampires";


export type ClanContextType = {
  clan?: Clan
}
export const ClanContext = createContext<ClanContextType | null>(null);


const App = () => {
  const { data: clan } = useMyClan()

  return (
    <BrowserRouter>
      <ClanContext.Provider value={{ clan }}>
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
              <Route path="/hunt" element={<HuntLycans />} />
              <Route path="/login" element={<GreyBox><Login /></GreyBox>} />
              <Route path="/vampires/:id" element={<UpdateVampire />} />
              <Route path="/lair" element={<MyLair />} />
              <Route path="/clanwar" element={<ClanWar />} />
            </Routes>
          </Inner>
        </AppShell>
      </ClanContext.Provider>
    </BrowserRouter>
  )
}

export default App;
