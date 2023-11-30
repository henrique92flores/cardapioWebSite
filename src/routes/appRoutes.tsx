import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaBase from "../pages/PaginaBase";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import Restaurant from "../pages/Restaurante";
import Cardapio from "../pages/Cardapio";
import Home from "../pages/Home";
import Sobre from "../pages/Sobre";
import AdminFood from "../pages/Admin/Food";
import RotaPrivada from "../utils/RotaPrivada";
import Carrinho from "../pages/Carrinho";
import AdminRestaurante from "../pages/Admin/Restautante";
import AtualizarRestaurante from "../pages/Admin/Restautante/AtualizarRestaurante";
import CadastrarRestaurante from "../pages/Admin/Restautante/CadastrarRestaurante";
import CadastrarFood from "../pages/Admin/Food/CadastrarFood";
import AtualizarFood from "../pages/Admin/Food/AtualizarFood";
import Pesquisa from "../pages/Pequisa";
import Detalhes from "../pages/Pequisa/detalhes";
import Historico from "../pages/HistoricoOrdem";


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PaginaBase />}>
                    <Route index element={<Login />} />
                    <Route element={<Login />}>
                    </Route>
                    <Route path="/sobre" element={<Sobre />} />


                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route element={<RotaPrivada />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/pesquisa" element={<Pesquisa />} />
                        <Route path="/historico" element={<Historico />} />
                        <Route path="/detalhes/:id" element={<Detalhes />} />
                        <Route path="/restaurant" element={<Restaurant />} />
                        <Route path="/cardapio/:id" element={<Cardapio />} /> 
                        <Route path="/Carrinho/:id" element={<Carrinho />} />
                        <Route path="/AdminFood/:id" element={<AdminFood />} />
                        <Route path="/AdminRestaurante" element={<AdminRestaurante />} />
                        <Route path="/AtualizarRestaurante/:id" element={<AtualizarRestaurante />} />
                        <Route path="/CadastrarRestaurante" element={<CadastrarRestaurante />} />
                        <Route path="/AtualizarFood/:id" element={<AtualizarFood />} />
                        <Route path="/CadastrarFood/:id" element={<CadastrarFood />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;