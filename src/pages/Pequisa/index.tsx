// Pesquisa.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Order from '../../components/interface/IOrder';
import axios from 'axios';

const Pesquisa: React.FC = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [orders, setOrders] = useState<Order[]>([]);
    const [userId, setUserId] = useState(0);
    const [message, setMessage] = useState("");
    const API_URL = 'https://restaurante20231128222416.azurewebsites.net';

    useEffect(() => {

    }, [message])

    const handleSearch = async () => {
        try {
            const formattedStartDate = startDate.toISOString();
            const formattedEndDate = endDate.toISOString();
            const dadosAutenticacao = localStorage.getItem('autenticacao');
            if (dadosAutenticacao) {
                const { userId } = JSON.parse(dadosAutenticacao);
                setUserId(userId);
            }
            // Realizar a chamada à API com os parâmetros de data
            const response = await axios.get(API_URL + `/Orders/User/${userId}`, {
                params: {
                    dataInicial: formattedStartDate,
                    dataFinal: formattedEndDate,
                },
            });
            setOrders(response.data);

            if (response.status == 404) {
                setMessage("Nao foram encontrados registros de compra para essa data, selecione outra data")
            } else if (response.status == 200) {
                setMessage("Numero de registros encontrados: " + (response.data.length + 1))
            }

            console.log('Dados da API:', response.data);

        } catch (error) {
            setMessage("Nao foram encontrados registros para essa busca,")
        }
    };

    return (
        <>
            <h1>Historico de Pedidos do Usuario</h1>
            <h2>Selecione um range de data para buscar os pedidos</h2>
        <div>
                <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date as Date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="yyyy-MM-dd HH:mm"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date as Date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    dateFormat="yyyy-MM-dd HH:mm"
                />
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
                                    :<>Pago</>
                                }</td>
                                <td>R$ {order.total.toFixed(2)}</td>
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

export default Pesquisa;