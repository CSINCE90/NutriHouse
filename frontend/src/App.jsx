import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/layouts/MainLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import ListaPazienti from "./pages/pazienti/Lista";
import NuovoPaziente from "./pages/pazienti/Nuovo";
import DettaglioPaziente from "./pages/pazienti/Dettaglio";
import ModificaPaziente from "./pages/pazienti/Modifica";
import PazienteDelete from "./pages/pazienti/Delete";
import ListaDiete from "./pages/diete/Index";
import NuovaDieta from "./pages/diete/NuovaDieta";
import DettaglioDieta from "./pages/diete/DettaglioDieta";
import ModificaDieta from "./pages/diete/ModificaDieta";
import EliminaDieta from "./pages/diete/EliminaDieta";
import ListaAlimenti from "./pages/alimenti/ListaAlimenti";
import NuovoAlimento from "./pages/alimenti/NuovoAlimento";
import ModificaAlimento from "./pages/alimenti/ModificaAlimento";
import EliminaAlimento from "./pages/alimenti/EliminaAlimento";
import Planner from "./pages/planner/Calendario";
import Info from "./pages/Info";
import PianiIndex from "./pages/piani/Index";
import NuovoPiano from "./pages/piani/Nuovo";
import ModificaPiano from "./pages/piani/Modifica";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pazienti" element={<ListaPazienti />} />
          <Route path="/pazienti/nuovo" element={<NuovoPaziente />} />
          <Route path="/pazienti/:id" element={<DettaglioPaziente />} />
          <Route path="/pazienti/:id/modifica" element={<ModificaPaziente />} />
          <Route path="/pazienti/:id/delete" element={<PazienteDelete />} />

          <Route path="/pazienti/:id/diete" element={<Outlet />}>
            <Route index element={<ListaDiete />} />
            <Route path="nuova" element={<NuovaDieta />} />
            <Route path=":dietaId" element={<DettaglioDieta />} />
            <Route path=":dietaId/modifica" element={<ModificaDieta />} />
            <Route path=":dietaId/elimina" element={<EliminaDieta />} />

            <Route path=":dietaId/alimenti" element={<Outlet />}>
              <Route index element={<ListaAlimenti />} />
              <Route path="nuova" element={<NuovoAlimento />} />
              <Route path=":alimentoId/modifica" element={<ModificaAlimento />} />
              <Route path=":alimentoId/elimina" element={<EliminaAlimento />} />
            </Route>
          </Route>

          {/* Piani alimentari */}
          <Route path="/piani" element={<PianiIndex />} />
          <Route path="/piani/nuovo" element={<NuovoPiano />} />
          <Route path="/piani/:id" element={<ModificaPiano />} />

          <Route path="/planner" element={<Planner />} />
          <Route path="/info" element={<Info />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;