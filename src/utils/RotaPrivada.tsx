import { Navigate, Outlet } from "react-router-dom";
import autenticaStore from "../store/autentica.store"

const RotaPrivada = () => {
    const { estaAutenticado } = autenticaStore;

    return (
        estaAutenticado ? <Outlet /> :  <Navigate to="/login" />
    )
    //    return (<Navigate to="/home" />
    //)
}

export default RotaPrivada;