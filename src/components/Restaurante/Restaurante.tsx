import { Link } from "react-router-dom"
import "./Restaurante.css"
interface RestaurantePorps {
    id?: number,
    nome: string,
    nomeFantasia: string,
    imagem: string,
    cnpj: string,
    addresDto?: string
}
export function Restaurante({ id, nome, nomeFantasia, imagem, cnpj }: RestaurantePorps) {

    return (
        <div className="Restaurante">
            <img src={imagem} />
            <h2>{nome}</h2>
            <h3>{nomeFantasia}</h3>
            <h4>{cnpj}</h4>
            <Link to={`/cardapio/${id}`} >Cardapio</Link>
        </div>
    )
}