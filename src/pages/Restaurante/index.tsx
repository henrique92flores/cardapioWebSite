import { Restaurante } from "../../components/Restaurante/Restaurante";
import { IRestaurant } from "../../components/interface/IRestaurant";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Restaurant() {

    const API_URL = 'https://restaurante20231128222416.azurewebsites.net';
    const [restaurantes, setRestaurantes] = useState<IRestaurant[]>([])

    useEffect(() => {
        axios.get<IRestaurant[]>(API_URL + '/Restaunt?skip=0&take=50')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])


    return (
            <div className="container">
                <h1>Restaurantes</h1>
                <div className="restaurant-grid">
                {restaurantes?.map(restaurantes =>
                    <Restaurante key={restaurantes.id}
                        id={restaurantes.id }
                        nome={restaurantes.nome}
                        nomeFantasia={restaurantes.nomeFantasia}
                        imagem={restaurantes.imagem}
                        cnpj={restaurantes.cnpj}
                    />,
                )}
            </div>
                <p></p>
            </div>
    )
}