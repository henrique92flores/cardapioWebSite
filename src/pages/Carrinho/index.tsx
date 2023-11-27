import { useEffect, useState } from 'react';
import Cart from '../../components/Cart/cart';
import axios from 'axios';
import './index.css';
import Order from '../../components/interface/IOrder';
import { useParams } from 'react-router-dom';
import CampoDigitacao from '../../components/CampoDigitacao';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';

const LoadingScreen: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <img src='../src/assets/loading.gif' alt="Carregando..." />
            <p>Carregando...</p>
        </div>
    );
};

const SuccessMessage: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '200px', color: 'green', fontSize: 45 }}>
            <p>Pagamento Aprovado!</p>
        </div>
    );
};

Modal.setAppElement('#root');

function Carrinho() {
    enum Tags {
        credito = "Cartao de Credito",
        pix = "Pix",
        boleto = "Boleto",
    }

    const parametros = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState(0);
    const [selectedTag, setSelectedTag] = useState<Tags | undefined>(undefined);
    const [data, setData] = useState('');
    const [order, setOrder] = useState<Order>({ orderItemDto: [], total: 0, status: 1, paymentType: 0, numeroCartao: 0, nomeCartao: "", restaurantId:0, userId:0 });
    const API_URL = 'https://localhost:7260';
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [redirecionar, setRedirecionar] = useState(false);
    const [status, setStatus] = useState(false);

    const simulateLoading = () => {
        setModalIsOpen(true);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                setModalIsOpen(false);
                setRedirecionar(true);
            }, 2000);
        }, 5000);
    };

    const updateCart = (updatedCart: any) => {

        setOrder({ ...order, orderItemDto: updatedCart });
    };

    useEffect(() => {
        axios.get<Order>(API_URL + `/orders/${parametros.id}`)
            .then(resposta => {
                setOrder(resposta.data)
            });
    }, [])

    useEffect(() => {
        setOrder(order);
        console.log('order', order)
    }, [order]);

    useEffect(() => {
        if (redirecionar && status) {
            // showSuccess tornou-se verdadeiro, podemos redirecionar
            navigate('/home');
        }
    }, [redirecionar]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // previne o envio padrão do formulário

        simulateLoading();


        const finalOrder: Order = {
            id: parseInt(parametros.id || ''),
            orderItemDto: order.orderItemDto,
            total: order.total,
            status: 2,
            paymentType: order.paymentType,
            numeroCartao: numero,
            nomeCartao: nome,
            restaurantId: order.restaurantId,
            userId: order.userId
            }
        try {
            await axios.put(API_URL + `/orders/${order.id}`, finalOrder)
                .then(resposta => {
                    if (resposta.status == 200) {
                        setStatus(true);
                        alert("Ordem Paga com Sucesso")
                        console.log(resposta);
                    }
                    else if (resposta.status == 400){
                        console.log(finalOrder);
                    }
                });
        } catch (erro) {
            erro && alert("Erro ao salvar Ordem")
            console.log(finalOrder);
        }
    }

    return (
        < div className = "Container">
            <h1>Seu Carrinho de Compras</h1>
            <div>
                <h2>Pedido de Numero: {order.id}</h2>            {order.orderItemDto ? (
                    <Cart items={order.orderItemDto} updateCart={updateCart} />
                ) : (
                    <p>Carregando...</p> // Trocar por algo que for mais interessante
                )}
            </div>
            <div className="Titulo">Opcoes de Pagamento:</div>
            <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value as Tags)}>
                <option value="">Selecione uma tag</option>
                {Object.values(Tags).map((tag) => (
                    <option key={tag} value={tag}>
                        {tag}
                    </option>
                ))}
            </select>
               {selectedTag == Tags.pix
                ? <>
                        <form className="Formulario" onSubmit={handleSubmit}>
                            <CampoDigitacao
                                tipo="text"
                                label="Nome"
                                valor={nome}
                                placeholder="Nome do Pagador"
                            onChange={setNome}
                            required={true}
                        />
                        <img src='../src/assets/websiteQRCode.png' alt="QRCode..." />
                        <p></p>
                        <button type="submit">Avisar Pagamento</button>
                    </form>

                    </>
                : <>
                    <form className="Formulario" onSubmit={handleSubmit}>
                        <CampoDigitacao
                            tipo="text"
                            label="Nome"
                            valor={nome}
                            placeholder="Nome do Cartao"
                            onChange={setNome}
                            required={true}
                        />
                        <CampoDigitacao
                            tipo="number"
                            label="Numero"
                            valor={numero !== undefined ? numero.toString() : ''}
                            placeholder="Número"
                            onChange={(valor) => setNumero(parseInt(valor))}
                            required={true}
                        />
                        <CampoDigitacao
                            tipo="text"
                            label="Data de expiracao"
                            valor={data}
                            placeholder="mm/aa"
                            onChange={setData}
                            required={true}
                        />
                        <button type="submit">Pagar</button>
                    </form> 
                    <div>
                        < Modal isOpen={modalIsOpen} >
                            {loading ? <LoadingScreen /> : null}
                            {showSuccess ? <SuccessMessage /> : null}

                        </Modal >
                    </div>
                    </>
                }
            <p></p>
        </div>

    );
}

export default Carrinho;
