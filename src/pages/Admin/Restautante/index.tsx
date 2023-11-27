import { useEffect, useState } from "react"
import "../../../pages/Admin/Food/table.css"
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import { IRestaurant } from "../../../components/interface/IRestaurant";
function AdminRestaurante() {
    //const parametros = useParams()
    const API_URL = 'https://localhost:7260';
    const [restaurants, setRestaurants] = useState<IRestaurant[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<IRestaurant[]>(API_URL + '/Restaunt')
            //axios.get<FoodData[]>(API_URL + `/restaurant/food/${parametros.id}`)
            .then(resposta => setRestaurants(resposta.data))
    }, [])

    const handleOpenModal = () => {
        navigate('/CadastrarRestaurante')
    }

    const excluir = (restaurantsAhSerExcluido: IRestaurant) => {
        try {
        axios.delete(API_URL + `/Restaunt/${restaurantsAhSerExcluido.id}/`)
            .then(resposta => {
                if (resposta.status == 200) {
                    alert("Restaurante Excluido com Sucesso")
                    navigate(`/home`);
                }
            });
        } catch (e) {
        alert("Erro ao Tentar excluir um Restaurante")
        }
    }
    return (
        <>
                <table className="table">
                <thead>
                    <tr>
                        <th>Nome do Restaurante</th>
                        <th>Nome Fantasia</th>
                        <th>CNPJ</th>
                        <th>imagem</th>
                        <th>Editar Restaurante</th>
                        <th>Editar Cardapio</th>
                        <th>Excluir</th>
                        </tr>
                </thead>
                <tbody>
                    {restaurants.map((restaurant) => (
                        <tr key={restaurant.id}>
                        <td>{restaurant.nome}</td>
                        <td>{restaurant.nomeFantasia}</td>
                        <td>{restaurant.cnpj}</td>
                        <td>
                            [<a href={restaurant.imagem} target="_blank" rel="noreferrer">ver imagem</a>]
                        </td>
                        <td>
                            [ <Link to={`/AtualizarRestaurante/${restaurant.id}`}>editar</Link> ]
                        </td>
                        <td>
                            [ <Link to={`/adminFood/${restaurant.id}`}>Editar Cardapio</Link> ]
                        </td>
                        <td>
                            <button onClick={() => excluir(restaurant)}>Excluir</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <script>

                </script>
            <button onClick={handleOpenModal}>Novo</button>
        </>
    );
}

export default AdminRestaurante;