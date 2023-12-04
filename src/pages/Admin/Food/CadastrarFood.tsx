import { useEffect, useState } from 'react';
import axios from 'axios';
import CampoDigitacao from '../../../components/CampoDigitacao';
import { useNavigate, useParams } from 'react-router-dom';
import { IFood } from '../../../components/interface/IFood';
import ITag from '../../../components/interface/ITag';

const API_URL = 'https://restaurante20231128222416.azurewebsites.net';

function CadastrarFood() {
    const parametros = useParams()
    const [, setFood] = useState<IFood | undefined>(undefined);
    const [titulo, setTitulo] = useState('');
    const [description, setDescription] = useState('');
    const [imagem, setImagem] = useState('');
    const [preco, setPreco] = useState(0);
    const [tagsId, setTagsId] = useState(0);
    const [tags, setTags] = useState<ITag[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<ITag[]>(API_URL + '/Tag')
            .then(resposta => setTags(resposta.data))

    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // previne o envio padrão do formulário

    }
    const submit = () => {
        const dadosDoPrato: IFood = {
            restaurantId: parseInt(parametros.id || ''),
            titulo,
            imagem,
            preco,
            tagsId,
            description,
            tagsDescription: ''
        };
        try {
            axios.post<IFood | undefined>(API_URL + '/Food', dadosDoPrato)
                .then(resposta => {
                    setFood(resposta.data)
                    if (resposta.status == 201) {
                        alert("Comida Cadastrada com Sucesso")
                        navigate(`/AdminFood/${parametros.id}`);
                    }
                });

        } catch (e) {
            alert("Erro ao fazer requisição de atualização")
        }
    }


    return (
        < div className="Container">
            <h1>Cadastrar Prato</h1>
            <form className="Formulario" onSubmit={handleSubmit}>
                <CampoDigitacao
                    tipo="text"
                    label="Nome da Comida"
                    valor={titulo}
                    placeholder="Nome da Comida"
                    onChange={setTitulo}
                    required={true}
                />
                <CampoDigitacao
                    tipo="text"
                    label="Descricao do Prato"
                    valor={description}
                    placeholder="Descricao do Prato"
                    onChange={setDescription}
                    required={true}
                />
                <CampoDigitacao
                    tipo="text"
                    label="Imagem do Prato"
                    valor={imagem || ''}
                    placeholder="Imagem do Prato"
                    onChange={setImagem}
                    required={false}
                />

                <CampoDigitacao
                    tipo="number"
                    label="Preco"
                    valor={preco !== undefined ? preco.toString() : ''}
                    placeholder="Preco"
                    onChange={(valor) => setPreco(parseInt(valor))}
                    required={true}
                />

                <select value={tagsId} onChange={(e) => setTagsId(parseInt(e.target.value, 10))}>
                    <option value="">Selecione uma tag</option>
                    {tags.map((tag) => (
                        <option key={tag.id} value={tag.id}>
                            {tag.descricao}
                        </option>
                    ))}
                </select>

                <button onClick={submit}>Cadastrar</button>
            </form>
            <p></p>
        </div>

    );
}

export default CadastrarFood;