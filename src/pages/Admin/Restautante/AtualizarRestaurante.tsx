import { useEffect, useState } from 'react';
import axios from 'axios';
import CampoDigitacao from '../../../components/CampoDigitacao';
import { IRestaurant } from '../../../components/interface/IRestaurant';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = 'https://restaurante20231128222416.azurewebsites.net';

function AtualizarRestaurante() {
    const parametros = useParams()
    const [restaurante, setRestaurante] = useState<IRestaurant | undefined>(undefined);

    useEffect(() => {
        axios.get<IRestaurant>(API_URL + `/Restaunt/${parametros.id}`)
            //axios.get<FoodData[]>(API_URL + `/restaurant/food/${parametros.id}`)
            .then(resposta => {
                setRestaurante(resposta.data);
            })
    }, [parametros.id])

    useEffect(() => {
        setNome(restaurante?.nome || '');
        setFantasia(restaurante?.nomeFantasia || '');
        setCnpj(restaurante?.cnpj || '');
        setCep(restaurante?.addresDto?.cep);
        setRua(restaurante?.addresDto?.rua);
        setNumero(restaurante?.addresDto?.numero);
        setComplemento(restaurante?.addresDto?.complemento);
        setEstado(restaurante?.addresDto?.estado);
    }, [restaurante]);


    const [nome, setNome] = useState<string | undefined>(restaurante?.nome || '');
    const [fantasia, setFantasia] = useState<string | undefined>(restaurante?.nomeFantasia);
    const [cnpj, setCnpj] = useState<string | undefined>(restaurante?.cnpj);
    const [imagem, setImagem] = useState('');
    const [cep, setCep] = useState<string | undefined>(restaurante?.addresDto?.cep);
    const [rua, setRua] = useState<string | undefined>(restaurante?.addresDto?.rua);
    const [numero, setNumero] = useState<number | undefined>(restaurante?.addresDto?.numero);
    const [complemento, setComplemento] = useState<string | undefined>(restaurante?.addresDto?.complemento);
    const [estado, setEstado] = useState<string | undefined>(restaurante?.addresDto?.estado);
    const navigate = useNavigate();


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // previne o envio padrão do formulário

    }
    const submit = () => {
        const dadosDoRestaurante: IRestaurant = {
            nome: nome || '',
            nomeFantasia: fantasia || '',
            imagem: imagem,
            cnpj: cnpj || '',
            addresDto: {
                cep: cep || '',
                rua: rua || '',
                numero: numero || 0,
                complemento: complemento || '',
                estado: estado || '',
            }
        };
        try {
            axios.put<IRestaurant | undefined>(API_URL + `/Restaunt/${parametros.id}`, dadosDoRestaurante)
                .then(resposta => {
                    setRestaurante(resposta.data)
                if (resposta.status == 200) {
                    alert("Restaurante Atualizado com Sucesso")
                    navigate('/AdminRestaurante');
                }
        });

        } catch (e) {
            alert("Erro ao fazer requisição de atualização")
        }
    }
    if (!restaurante) {
        return <p>Carregando...</p>; // Ou algum indicador de carregamento enquanto os dados são obtidos
    }

    return (
        < div className="Container">
            <h1>Atualizar Restaurante</h1>
                    <form className="Formulario" onSubmit={handleSubmit}>
                <CampoDigitacao
                    tipo="text"
                    label="Nome do Restaurante"
                    valor={nome || ''}
                    placeholder={nome || ''}
                    onChange={setNome}
                    required={true}
                        />
                        <CampoDigitacao
                            tipo="text"
                            label="Nome Fantasia"
                            valor={fantasia || ''}
                            placeholder={fantasia || ''}
                    onChange={setFantasia}
                    required={true}
                        />
                        <CampoDigitacao
                            tipo="text"
                            label="CNPJ"
                            valor={cnpj || ''}
                            placeholder={cnpj || ''}
                    onChange={setCnpj}
                    required={true}
                        />
                        <CampoDigitacao
                            tipo="text"
                            label="Imagem"
                            valor={imagem || ''}
                            placeholder="Insira a Imagem"
                    onChange={setImagem}
                    required={false}
                        />

                    <h2>Endereço</h2>

                     <CampoDigitacao
                    tipo="text"
                        label="CEP"
                    valor={cep || ''}
                    placeholder={cep || ''}
                    onChange={setCep}
                    required={true}
                     />
                     <CampoDigitacao
                         tipo="text"
                         label="Rua"
                    valor={rua || ''}
                    placeholder={rua || ''}
                    onChange={setRua}
                    required={true}
                     />
                <CampoDigitacao
                    tipo="number"
                    label="Número"
                    valor={numero !== undefined ? numero.toString() : ''}
                    placeholder="Número"
                    onChange={(valor) => setNumero(valor !== '' ? parseInt(valor) : undefined)}
                    required={true}
                />
                     <CampoDigitacao
                         tipo="text"
                    valor={complemento || ''}
                    placeholder={complemento || ''}
                    onChange={setComplemento}
                    required={false}
                     />
                     <CampoDigitacao
                         tipo="text"
                    valor={estado || ''}
                    placeholder={estado || ''}
                    onChange={setEstado}
                    required={true}
                     />

                    <button onClick={submit}>Atualizar</button>
            </form>
            <p></p>
        </div>

    );
}

export default AtualizarRestaurante;