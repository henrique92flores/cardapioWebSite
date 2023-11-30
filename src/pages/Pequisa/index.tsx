// Pesquisa.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Order from '../../components/interface/IOrder';
import axios from 'axios';

const Pesquisa: React.FC = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [orders, setOrders] = useState<Order[]>([]);
    const API_URL = 'https://localhost:7260';

    const handleSearch = async () => {
        try {
            const formattedStartDate = startDate.toISOString();
            const formattedEndDate = endDate.toISOString();

            // Realizar a chamada à API com os parâmetros de data
            const response = await axios.get(API_URL + '/Orders/User/2', {
                params: {
                    dataInicial: formattedStartDate,
                    dataFinal: formattedEndDate,
                },
            });
            setOrders(response.data);

            console.log('Dados da API:', response.data);

        } catch (error) {
            console.error('Erro ao chamar a API:', error);
        }
    };

    return (
        <>
            <h1>Historico de Pedidos do Usuario</h1>
            <h2>Selecione um range de data para buscar os pedidos</h2>
        <div>
            <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date as Date)} />
            <DatePicker selected={endDate} onChange={(date: Date) => setEndDate(date as Date)} />
            <button onClick={handleSearch}>Pesquisar</button>
        </div>
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