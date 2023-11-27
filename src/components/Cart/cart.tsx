import { useState } from 'react';
import OrderItem from '../interface/IOrderItem';
import "./cart.css";

interface CartProps {
    items: OrderItem[];
    updateCart: (updatedCart: OrderItem[]) => void;
}

function Cart({ items, updateCart }: CartProps) {
    const [total, setTotal] = useState(calculateTotal(items));

    const handleQuantityChange = (itemId: number, newQuantity: number) => {
        const updatedCart = items.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        updateCart(updatedCart);
        setTotal(calculateTotal(updatedCart));
    };

    const handleRemoveItem = (itemId: number) => {
        const updatedCart = items.filter(item => item.id !== itemId);
        updateCart(updatedCart);
        setTotal(calculateTotal(updatedCart));
    };

    return (
        <div className="cart-container">
            <div className="Titulo">Seu Carrinho de Compras</div>
            <ul className="cart-items">
                {items?.map(item => (
                    <li key={item.id}>
                        <span>{item.name}</span>
                        <span>R$ {item.price.toFixed(2)}</span>
                        <span>
                            Quantidade:     
                            <button onClick={() => handleQuantityChange(item.id || 0, item.quantity - 1)}> - </button>
                            {item.quantity}
                            <button onClick={() => handleQuantityChange(item.id || 0, item.quantity + 1)}> + </button>
                        </span>
                        <button onClick={() => handleRemoveItem(item.productid)}> Excluir </button>
                    </li>
                ))}
                <p>Total: R$ {total.toFixed(2)}</p>
            </ul>
        </div>
    );
}

function calculateTotal(cart: OrderItem[]) {
    return (cart || []).reduce((total, item) => total + item.price * item.quantity, 0);
}

export default Cart;




