import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Order from '../../components/interface/IOrder';
import './detalhes.css'
import { IRestaurant } from '../../components/interface/IRestaurant';
const API_URL = 'https://localhost:7260';


const Detalhes = () => {
    const [order, setOrder] = useState<Order>()
    const [restaurante, setRestaurante] =  useState<IRestaurant | undefined>(undefined);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<IRestaurant>(API_URL + `/Restaunt/${order?.restaurantId}`)
            .then(resposta => setRestaurante(resposta.data))
    }, [order?.restaurantId])

    useEffect(() => {
        axios.get(API_URL + `/Orders/${params.id}`)
            .then(resposta => {
                setOrder(resposta.data)
                console.log("resposta.data", resposta.data)
                resposta.data
            });
    }, [])

    const handleBack = () => {
        navigate('/pesquisa')
    };

    return (
        <div className="Container">
            <h1>Detalhes da Ordem</h1>
            <p>
                <b>Id:</b> {order?.id}
            </p>
            <p>
                <b>Nome do Cartao:</b> {order?.nomeCartao}
            </p>
            <p>
                <b>Numero do Cartao:</b> {order?.numeroCartao}
            </p>
            <p>
                <b>Tipo de Pagamento:</b>{order?.paymentType == 0
                    ? <> Cartao</>
                    : <> Pix</>
                }
            </p>
            <p>
                <b>Nome do Restaurante: </b> {restaurante?.nome }
            </p>
            <p>
                <b>Status da Ordem:</b>{order?.status == 1
                    ? <> Criado</>
                    : <> Pago</>
                }
            </p>
            <p>
                <b>Valor Total: R$ </b> {order?.total.toFixed(2)}
            </p>
            <div>
            <h2>Items do Pedido</h2>
                {order?.orderItemDto.map((orderItem) => (
                    <p key={orderItem.id}>
                        <b>{orderItem.name}</b>
                        <span> Preco: R$ {orderItem.price.toFixed(2)}</span>
                        <span> Quantidade: {orderItem.quantity}</span>
                    </p>
                ))}
            </div>

            <button onClick={handleBack}>Voltar</button>
        </div>
    );
};

export default Detalhes;