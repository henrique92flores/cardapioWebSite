import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { IFood } from "../../components/interface/IFood";
import { Card } from "../../components/card/card";
import Cart from "../../components/Cart/cart";
import { useNavigate } from "react-router-dom";
import Order from "../../components/interface/IOrder";
import { ReviewModal } from "../../components/Avaliacoes/avaliacao-modal";



const Cardapio = () => {
    const parametros = useParams()
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order>({
        orderItemDto: [], total: 0, status: 1,restaurantId: 0, userId: 0 });
    const API_URL = 'https://localhost:7260';
    const [restaurantes, setRestaurantes] = useState<IFood[]>([])
    const token = localStorage.getItem('token');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState(0);
    const [redirecionar, setRedirecionar] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev)
    }

    if (!token) {
        navigate('/login');
    }

    const updateCart = (updatedCart: any) => {
        setOrder({ ...order, orderItemDto: updatedCart });
    };

    const handleAddToCart = (product: IFood) => {
        // Verifica se o produto já está no carrinho
        const existingItem = order.orderItemDto.find(item => item.id === product.id);
        const dadosAutenticacao = localStorage.getItem('autenticacao');
        if (dadosAutenticacao) {
            const { autenticado, tipoUser, userId } = JSON.parse(dadosAutenticacao);
            setUserId(userId);
        }

        if (existingItem) {
            // Se o produto já estiver no carrinho, atualiza a quantidade
            const updatedItems = order.orderItemDto.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );

            setOrder({
                ...order,
                orderItemDto: updatedItems,
                total: order.total + product.preco // Atualiza o preço total
            });
        } else {
            // Se o produto não estiver no carrinho, adiciona como um novo item
            setOrder({
                ...order,
                orderItemDto: [
                    ...order.orderItemDto,
                    {
                        id: product.id || 0,
                        productid: product.id || 0,
                        name: product.titulo,
                        price: product.preco,
                        quantity: 1
                    }
                ],
                total: order.total + product.preco, // Atualiza o preço total
                restaurantId: parseInt(parametros.id || "0"),
                userId: userId,
            });
        }
    };

    useEffect(() => {
         axios.get<IFood[]>(API_URL + `/restaurant/food/${parametros.id}`)
            .then(resposta => setRestaurantes(resposta.data))
    }, [])



    const finalizeOrder = async () => {
      await axios.post(API_URL + '/orders', order)
            .then(resposta =>
            {
                if (resposta.status == 201) {
                    setRedirecionar(true);
                    console.log("resposta true");
                } 
                setOrder(resposta.data);

            })
    }

    useEffect(() => {
        if (redirecionar) {
            // showSuccess tornou-se verdadeiro, podemos redirecionar
            navigate(`/carrinho/${order.id}`);
        }
    }, [navigate, order.id, redirecionar]);

    return (
        <div className="container">
                <h1>Cardapio</h1>
                <div className="restaurant-grid">
                {restaurantes?.map(data =>
                    <Card key={data.id}
                        price={data.preco}
                        title={data.titulo}
                        image={data.imagem}
                        tagsDescription={data.tagsDescription}
                        description={data.description}
                        onAddToCart={() => handleAddToCart(data)}
                    />,
                )}
            </div>
            <div className="Avaliacoes">
                {isModalOpen && <ReviewModal restId={parseInt(parametros.id || "0")} closeModal={handleOpenModal} />}
                <button onClick={handleOpenModal}>Avaliacoes</button>
                <p></p>
            </div>
            <div className="Carrinho-grid">
                <Cart items={order.orderItemDto} updateCart={updateCart} />
                <button onClick={finalizeOrder}>Finalizar Pedido</button>
                <p></p>
            </div>
        </div>

    )
}
export default Cardapio