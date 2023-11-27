import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Order from '../../components/interface/IOrder';
import './detalhes.css'
const API_URL = 'https://localhost:7260';


const Detalhes = () => {
    const [order, setOrder] = useState<Order>()
    const params = useParams();

    useEffect(() => {
        axios.get(API_URL + `/Orders/${params.id}`)
            .then(resposta => {
                setOrder(resposta.data)
                console.log("resposta.data", resposta.data)
                resposta.data
            });
    }, [])

    const handleBack = () => {
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
                <b>Numero do Cartao:</b> {order?.paymentType}
            </p>
            <p>
                <b>Restaurante Id: </b> {order?.restaurantId}
            </p>
            <p>
                <b>Status: </b> {order?.status}
            </p>
            <p>
                <b>Valor Total R$: </b> {order?.total}
            </p>
            <div>
            <h2>Items do Pedido</h2>
                {order?.orderItemDto.map((orderItem) => (
                    <p key={orderItem.id}>
                        <b>{orderItem.name}</b>
                        <span> Preco :{orderItem.price}</span>
                        <span> Quantidade :{orderItem.quantity}</span>
                    </p>
                ))}
            </div>

            <button onClick={handleBack}>Voltar</button>
        </div>
    );
};

export default Detalhes;