import { useEffect, useState } from "react"
import { IFood } from "../../../components/interface/IFood"
import "./table.css"
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IRestaurant } from "../../../components/interface/IRestaurant";
function AdminFood() {
    const parametros = useParams()
    const API_URL = 'https://localhost:7260';
    const [foods, setFood] = useState<IFood[]>([])
    const [restaurant, setRestaurant] = useState<IRestaurant>()
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<IFood[]>(API_URL + `/restaurant/food/${parametros.id}`)
            .then(resposta => setFood(resposta.data))
    }, [])

    useEffect(() => {
        axios.get<IRestaurant>(API_URL + `/Restaunt/${parametros.id}`)
            .then(resposta => setRestaurant(resposta.data))
    }, [])

    const handleOpenModal = () => {
        navigate(`/CadastrarFood/${parametros.id}`)
    }

    const excluir = (foodExcluir: IFood) => {
        try { 
        axios.delete(API_URL + `/Food/${foodExcluir.id}`)
            .then(resposta => {
                if (resposta.status == 200) {
                    alert("Comida Excluida com Sucesso")
                    navigate(`/AdminRestaurante`);
                }
            });
        } catch (e) {
        alert("Erro ao Tentar excluir uma comida")
        }
    }
    return (
        <>
            <div>
                <h1>Nome do Restaurante: {restaurant?.nome}</h1>
            </div>
                <style>
                    <h1>{restaurant?.nome}</h1>
            </style>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome do Prato</th>
                            <th>description</th>
                            <th>Preco</th>
                            <th>tag</th>
                            <th>imagem</th>
                            <th>Editar Prato</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods.map((food) => (
                        <tr key={food.id}>
                        <td>{food.titulo}</td>
                        <td>{food.description}</td>
                        <td>{food.preco}</td>
                        <td>{food.tagsDescription}</td>
                        <td>
                            [<a href={food.imagem} target="_blank" rel="noreferrer">Ver Imagem</a>]
                        </td>
                                <td>
                                    [ <Link to={`/AtualizarFood/${food.id}`}>Editar</Link> ]
                                </td>
                        <td>
                            <button onClick={() => excluir(food)}>
                                Excluir
                            </button>
                        </td>
                            </tr>
                        ))}
                        </tbody>
                </table>

                <script>

                </script>
            <button onClick={() => handleOpenModal()}>Novo</button>
        </>
    );
}

export default AdminFood;