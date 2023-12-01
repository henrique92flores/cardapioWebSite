import { useEffect, useState } from 'react';
import axios from 'axios';
import CampoDigitacao from '../../../components/CampoDigitacao';
import { useNavigate, useParams } from 'react-router-dom';
import { IFood } from '../../../components/interface/IFood';
import ITag from '../../../components/interface/ITag';

const API_URL = 'https://localhost:7260';

function AtualizarFood() {
    const parametros = useParams()
    const [food, setFood] = useState<IFood | undefined>(undefined);
    const [tags, setTags] = useState<ITag[]>([])

    useEffect(() => {
        axios.get<IFood>(API_URL + `/Food/${parametros.id}`)
            .then(resposta => {
                setFood(resposta.data);
            })
    }, [parametros.id])

    useEffect(() => {
        axios.get<ITag[]>(API_URL + '/Tag')
            .then(resposta => setTags(resposta.data))

    }, [])

    useEffect(() => {
        setTitulo(food?.titulo || '');
        setDescription(food?.description || '');
        setImagem(food?.imagem || '');
        setPreco(food?.preco);
        setTagsId(tags.find(tag => tag.id === food?.tagsId)?.id);
        setTagDescription(food?.tagsDescription || '');
        console.log(food)
    }, [food]);


    const [titulo, setTitulo] = useState<string | undefined>(food?.titulo || '');
    const [description, setDescription] = useState<string | undefined>(food?.description);
    const [imagem, setImagem] = useState<string | undefined>(food?.imagem);
    const [preco, setPreco] = useState<number | undefined>(food?.preco);
    const [tagsId, setTagsId] = useState<number | undefined>(food?.tagsId || 1);
    const [tagsDescription, setTagDescription] = useState<string | undefined>(food?.tagsDescription || '');
    const navigate = useNavigate();


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // previne o envio padrão do formulário

    }
    const submit = () => {
        const dadosDoRestaurante: IFood= {
            titulo: titulo || '',
            description: description || '',
            imagem: imagem || '',
            preco: preco || 0,
            tagsId: tagsId || 0,
            tagsDescription: tagsDescription || ''
        };
        try {
            axios.put<IFood | undefined>(API_URL + `/Food/${parametros.id}`, dadosDoRestaurante)
                .then(resposta => {
                    setFood(resposta.data)
                    if (resposta.status == 200) {
                        alert("Comida Atualizada com Sucesso")
                        navigate('/AdminRestaurante');
                    }
                });
        } catch (e) {
            alert("Erro ao fazer requisição de atualização: "+ e)
        }
    }
    if (!food) {
        return <p>Carregando...</p>; // Ou algum indicador de carregamento enquanto os dados são obtidos
    }

    return (
        < div className="Container">
            <h1>Atualizar Prato</h1>
                    <form className="Formulario" onSubmit={handleSubmit}>
                        <CampoDigitacao
                            tipo="text"
                            label="Nome da Comida"
                            valor={titulo || ''}
                            placeholder={titulo || ''}
                    onChange={setTitulo}
                    required={true}
                        />
                        <CampoDigitacao
                            tipo="text"
                            label="Descricao do Prato"
                            valor={description || ''}
                            placeholder={description || ''}
                    onChange={setDescription}
                    required={true}
                        />
                        <CampoDigitacao
                            tipo="text"
                            label="Imagem do Prato"
                            valor={imagem || ''}
                            placeholder={imagem || ''}
                    onChange={setImagem}
                    required={false}
                          />

                    <CampoDigitacao
                    tipo="number"
                    label="Preco"
                    valor={preco !== undefined ? preco.toString() : ''}
                    placeholder="Preco"
                    onChange={(valor) => setPreco(valor !== '' ? parseInt(valor) : undefined)}
                    required={true}
                    />

                <select value={tagsId} onChange={(e) => setTagsId(parseInt(e.target.value, 10))}>
                    <option value="">{tagsDescription}</option>
                    {tags.map((tag) => (
                        <option key={tag.id} value={tag.id}>
                            {tag.descricao}
                        </option>
                    ))}
                </select>
                    <button onClick={submit}>Atualizar</button>
                    </form>
        </div>

    );
}

export default AtualizarFood;