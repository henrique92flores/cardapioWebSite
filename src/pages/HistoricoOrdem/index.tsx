// Pesquisa.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Order from '../../components/interface/IOrder';
import axios from 'axios';
import { IRestaurant } from '../../components/interface/IRestaurant';

const Historico: React.FC = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [orders, setOrders] = useState<Order[]>([]);
    const [restId, setRestId] = useState(0);
    const [message, setMessage] = useState("");
    const [restaurantes, setRestaurantes] = useState<IRestaurant[]>([])
    const API_URL = 'https://localhost:7260';

    useEffect(() => {
        axios.get<IRestaurant[]>(API_URL + '/Restaunt?skip=0&take=50')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    useEffect(() => {

    }, [message])

    const handleSearch = async () => {
        try {
            const formattedStartDate = startDate.toISOString();
            const formattedEndDate = endDate.toISOString();

            // Realizar a chamada à API com os parâmetros de data
            const response = await axios.get(API_URL + `/Orders/Rest/${restId}`, {
                params: {
                    dataInicial: formattedStartDate,
                    dataFinal: formattedEndDate,
                },
            });
            setOrders(response.data);

            if (response.status == 404) {
                setMessage("Nao foram encontrados registros para essa busca, troque a data ou o restaurante")
            } else if (response.status == 200) {
                setMessage("Numero de registros encontrados: " + (response.data.length+1))
            }

            console.log('message: ', message);
            console.log('Dados da API:', response.data);

        } catch (error) {
            console.error('Erro ao chamar a API:', error);

                setMessage("Nao foram encontrados registros para essa busca, troque a data ou o restaurante")
        }
    };

    return (
        <>
            <h1>Historico de Vendas</h1>
            <h2>Selecione um range de data para buscar os pedidos</h2>
            <div>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date as Date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="yyyy-MM-dd HH:mm"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date as Date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    dateFormat="yyyy-MM-dd HH:mm"
                />
                <select value={restId} onChange={(e) => setRestId(parseInt(e.target.value, 10))}>
                    <option value="">Selecione uma tag</option>
                    {restaurantes.map((restaurante) => (
                        <option key={restaurante.id} value={restaurante.id}>
                            {restaurante.nome}
                        </option>
                    ))}
                </select>
                <button onClick={handleSearch}>Pesquisar</button>
            </div>
            <p>{message}</p>
            <div className='Tabel-resultado'>
                <table>
                    <thead>
                        <tr>
                            <th>Id da Transacao</th>
                            <th>Tipo de Pagamento</th>
                            <th>Status</th>
                            <th>Valor Total</th>
                            <th>Data Transacao</th>
                            <th>Ver Detalhes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.paymentType == 0
                                    ? <> Cartao</>
                                    : <> Pix</>
                                }</td>
                                <td>{order.status == 1
                                    ? <>Criado</>
                                    : <>Pago</>
                                }</td>
                                <td>R$ {order.total.toFixed(2)}</td>
                                <td> {order.dateTime?.toString()}</td>
                                <td>
                                    [ <Link to={`/detalhes/${order.id}`}> Ver Detalhes</Link> ]
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Historico;