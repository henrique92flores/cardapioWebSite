import { useEffect, useState } from "react";
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import { IFood } from "../interface/IFood";
import "./modal.css";
import ITag from "../interface/ITag";
import axios from "axios";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value:any): void
}

interface ModalProps {
    closeModal(): void;
    initialValues: {
        titulo: string;
        description: string;
        preco: number;
        tagsId: number;
        imagem: string;
    };
}

const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
        setImagem(evento.target.files[0])
    } else {
        setImagem(null)
    }
}  

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function CreateModal({ closeModal, initialValues }: ModalProps) {

    const [titulo, setTitle] = useState(initialValues.titulo);
    const [description, setDescription] = useState(initialValues.description);
    const [preco, setPrice] = useState(initialValues.preco);
    const [imagem, setImage] = useState(initialValues.imagem);
    const [selectedTag, setSelectedTag] = useState(initialValues.selectedTag);

    const { mutate, isSuccess, isLoading } = useFoodDataMutate();
    const [arquivo, setArquivo] = useState<File | null>(null)
    const [tags, setTags] = useState<ITag[]>([])
    const API_URL = 'https://localhost:7260';

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setArquivo(evento.target.files[0])
        } else {
            setArquivo(null)
        }
    }  

    const submit = () => {
        const foodData: IFood = {
            titulo,
            preco,
            imagem,
            restaurantId: 1,
            tagsId: selectedTag,
            description
        }
        mutate(foodData)
    }

    useEffect(() => {
        axios.get<ITag[]>(API_URL + '/Tag')
            .then(resposta => setTags(resposta.data))
        if (!isSuccess) return
        closeModal();
    }, [isSuccess])

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardapio</h2>
                <form className="input-container">
                    <Input label="title" value={titulo} updateValue={setTitle} />
                    <Input label="description" value={description} updateValue={setDescription} />
                    <Input label="price" value={preco} updateValue={setPrice} />
                    <select value={selectedTag} onChange={(e) => setSelectedTag(parseInt(e.target.value, 10))}>
                        <option value="">Selecione uma tag</option>
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.descricao}
                            </option>
                        ))}
                    </select>

                    <input type="file" onChange={selecionarArquivo} />
                    <Input label="image" value={imagem} updateValue={setImage} />
                </form>
                <button onClick={closeModal} className="btn-secondary"> Fechar
                </button>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? 'postando ...' : 'postar'}
                </button>
            </div>
        </div>
    )
}