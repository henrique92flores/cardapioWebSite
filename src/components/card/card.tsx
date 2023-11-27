import styled from "styled-components";
import "./card.css";

const BotaoCustomizado = styled.button`
  bottom: 1;
`;

interface CardProps {
    price: number;
    title: string;
    image: string;
    tagsDescription: string
    description: string;
    onAddToCart: (product: { title: string; price: number }) => void;
}

export function Card({ price, image, description, title, tagsDescription, onAddToCart }: CardProps) {
    return (
        <div className="card">
            <img src={image} alt={title} className="card-image" />
            <div className="card-details">
                <h2>{title}</h2>
                <p>
                    <b>Descricao:</b> {description}
                </p>
                <p>
                    <b>Categoria:</b> {tagsDescription}</p>
                <p>
                    <b>Valor:</b> {price}
                </p>

                    <BotaoCustomizado onClick={() => onAddToCart({ title, price })}>Adicionar ao Carrinho</BotaoCustomizado>

            </div>
        </div>
    );
}