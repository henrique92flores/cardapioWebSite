import { useEffect, useState } from 'react';

import axios from 'axios';

import ITag from '../../../components/interface/ITag';
import CampoDigitacao from '../../../components/CampoDigitacao';
import { IRestaurant } from '../../../components/interface/IRestaurant';
import { useNavigate, useParams } from 'react-router-dom';

interface InitalProps {
        titulo: string;
        description: string;
        preco: number;
        tagsId: number;
        imagem: string;
}

function CadastrarRestaurante() {
    const parametros = useParams()
    const [restaurante, setRestaurante] = useState<IRestaurant>()


    const [nome, setNome] = useState('');
    const [fantasia, setFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [cep, setCep] = useState('');
    const [imagem, setImagem] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState(0);
    const [complemento, setComplemento] = useState('');
    const [estado, setEstado] = useState('');
    const [resposta, setResposta] = useState('');
    const navigate = useNavigate();
    const API_URL = 'https://localhost:7260';




    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // previne o envio padrão do formulário

    }
    const submit = () => {
        const dadosDoRestaurante: IRestaurant = {
            nome: nome,
            nomeFantasia: fantasia,
            imagem: imagem,
            cnpj: cnpj,
            addresDto: {
                cep: cep,
                rua: rua,
                numero: numero,
                complemento: complemento,
                estado: estado,
            }
        };
        try {
            axios.post<IRestaurant[]>(API_URL + `/Restaunt`, dadosDoRestaurante)
                .then(resposta => {
                    setRestaurante(resposta.data)
                    if (resposta.status == 200) {
                        alert("Restaurante Cadastrado com Sucesso")
                        navigate('/AdminRestaurante');
                    }
                });

        } catch (e) {
            alert("Erro ao fazer requisição de atualização")
        }
    }

    return (
        < div className="Container">
            <h1>Cadastrar Restaurante</h1>
                    <form className="Formulario" onSubmit={handleSubmit}>
                        <CampoDigitacao
                            tipo="text"
                            label="Nome do Restaurante"
                            valor={nome}
                            placeholder="Nome do Restaurante"
                    onChange={setNome}
                    required={true}
                        />
                        <CampoDigitacao
                            tipo="text"
                            label="Nome Fantasia"
                            valor={fantasia}
                            placeholder="Nome Fantasia"
                    onChange={setFantasia}
                    required={true}
                        />
                        <CampoDigitacao
                            tipo="text"
                            label="CNPJ"
                            valor={cnpj}
                            placeholder="012345678"
                    onChange={setCnpj}
                    required={true}
                          />

                         <CampoDigitacao
                             tipo="text"
                             label="Imagem"
                             valor={imagem}
                             placeholder="Insira a Imagem"
                    onChange={setImagem}
                    required={false}
                         />
                    <h2>Endereco</h2>

                     <CampoDigitacao
                        tipo="number"
                        label="CEP"
                        valor={cep}
                        placeholder="Insira o CEP"
                    onChange={setCep}
                    required={true}
                     />
                     <CampoDigitacao
                         tipo="text"
                         label="Rua"
                         valor={rua}
                         placeholder="Rua"
                    onChange={setRua}
                    required={true}
                     />
                <CampoDigitacao
                    tipo="number"
                    label="Numero"
                    valor={numero !== undefined ? numero.toString() : ''}
                    placeholder="Numero"
                    onChange={(valor) => setNumero(parseInt(valor))}
                    required={true}
                />
                     <CampoDigitacao
                         tipo="text"
                         valor={complemento}
                         placeholder="Complemento"
                    onChange={setComplemento}
                    required={false}
                     />
                     <CampoDigitacao
                         tipo="text"
                         valor={estado}
                         placeholder="Estado"
                    onChange={setEstado}
                    required={true}
                     />

                    <button onClick={submit}>Cadastrar</button>
            </form>
                    <p></p>
        </div>

    );
}

export default CadastrarRestaurante;