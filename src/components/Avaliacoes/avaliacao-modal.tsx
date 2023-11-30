/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { IReview } from "../interface/IReview";
import StarRating from "../StarRating/StarRating";
import "./avaliacao-modal.css"
import Rating from "../Rating/Rating";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value:any): void
}

interface ModalProps {
    restId: number,
    closeModal(): void;

}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function ReviewModal({ restId, closeModal }: ModalProps) {
    const [description, setDescription] = useState('');
    const [preco, setPrice] = useState(0);
    const [reviews, setReview] = useState<IReview[]>([])
    const API_URL = 'https://localhost:7260';

    const submit = () => {
        const dadosDoRestaurante: IReview = {
            restaurantId: restId,
            avaliacao: description,
            nota: preco

        };
        try {
            axios.post(API_URL + '/Review', dadosDoRestaurante)
                .then(resposta => setReview(resposta.data))
            alert("Restaurante Atualizado com Sucesso")
        } catch (e) {
            alert("Erro ao fazer requisição de atualização")
        }
    }

    useEffect(() => {
        axios.get<IReview[]>(API_URL + `/Review/${restId}`)
            .then(resposta => {
                setReview(resposta.data);
            })
    }, [])

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <div className="moda-novoItem">
                        <p>Selecione uma avaliação:</p>
                        <Rating onRatingChange={setPrice} />
                    <form className="input-container">
                        <Input label="description" value={description} updateValue={setDescription} />
                        <button onClick={submit} className="btn-secondary">Add Nova Avaliacao</button>
                    </form>
                </div>
                <p>Avaliacoes</p>
                {reviews?.map(review => (
                    <div key={review.id} className="mini-card">
                        <StarRating nota={review.nota} />
                        <p>
                            <b>Avaliacao:</b> {review.avaliacao}
                        </p>
                    </div>
                ))}

                <button onClick={closeModal} className="btn-secondary">
                    Fechar
                </button>
            </div>
        </div>
    );
}