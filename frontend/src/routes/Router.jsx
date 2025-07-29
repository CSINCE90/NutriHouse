import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";  // added Outlet
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import ListaPazienti from "../pages/pazienti/Lista";
import NuovaDieta from "../pages/diete/NuovaDieta";
import ModificaDieta from "../pages/diete/ModificaDieta";
import EliminaDieta from "../pages/diete/EliminaDieta";
import ListaDiete from "../pages/diete/Index";
import DettaglioDieta from "../pages/pazienti/diete/DettaglioDieta";
//import Planner from "../pages/planner/Calendario";
//import ListaAlimenti from "../pages/alimenti/ListaAlimenti";
//import NuovoAlimento from "../pages/alimenti/NuovoAlimento";
//import ModificaAlimento from "../pages/alimenti/ModificaAlimento";
//import EliminaAlimento from "../pages/alimenti/EliminaAlimento";
import PrivateRoute from "../components/PrivateRoute";
import MainLayout from "../components/layouts/MainLayout";
import NuovoPaziente from "../pages/pazienti/Nuovo";
import DettaglioPaziente from "../pages/pazienti/Dettaglio";
import ModificaPaziente from "../pages/pazienti/Modifica";
import PazienteDelete from "../pages/pazienti/Delete";
import PianiIndex from "../pages/piani/Index";
import NuovoPiano from "../pages/piani/Nuovo";
import ModificaPiano from "../pages/piani/Modifica";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pazienti" element={<ListaPazienti />} />
          <Route path="/pazienti/nuovo" element={<NuovoPaziente />} />
          {/* Dettaglio paziente */}
          <Route path="/pazienti/:id" element={<DettaglioPaziente />} />

          {/* Modifica ed elimina paziente a livello principale */}
          <Route path="/pazienti/:id/modifica" element={<ModificaPaziente />} />
          <Route path="/pazienti/:id/delete" element={<PazienteDelete />} />

          {/* Piani alimentari */}
          <Route path="/piani" element={<PianiIndex />} />
          <Route path="/piani/nuovo" element={<NuovoPiano />} />
          <Route path="/piani/:id" element={<ModificaPiano />} />

          {/* Diete nested under a patient */}
          <Route path="/pazienti/:id/diete" element={<Outlet />}>
            <Route index element={<ListaDiete />} />
            <Route path="nuova" element={<NuovaDieta />} />
            <Route path=":dietaId" element={<DettaglioDieta />} />
            <Route path=":dietaId/modifica" element={<ModificaDieta />} />
            <Route path=":dietaId/elimina" element={<EliminaDieta />} />
            {/* Alimenti nested under a specific diet */}
            <Route path=":dietaId/alimenti" element={<Outlet />}>
              <Route index element={<ListaAlimenti />} />
              <Route path="nuova" element={<NuovoAlimento />} />
              <Route path=":alimentoId/modifica" element={<ModificaAlimento />} />
              <Route path=":alimentoId/elimina" element={<EliminaAlimento />} />
            </Route>
          </Route>

          <Route path="/planner" element={<Planner />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
