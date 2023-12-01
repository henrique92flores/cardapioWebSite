import styled from "styled-components";
import { useState } from 'react';
import CampoDigitacao from "../../components/CampoDigitacao";
import { useNavigate } from "react-router-dom";
import IUser from "../../components/interface/IUser";
import axios from "axios";

const Titulo = styled.h2`
    padding: 0em 25em;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: var(--cinza);
`;

const Formulario = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BotaoCustomizado = styled.button`

  margin-top: 15px;
  width: 50%;
  margin-bottom: 50px;
  align-items: center;
`;



export default function Cadastro() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [senhaVerificada, setSenhaVerificada] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState(1);
    const [complemento, setComplemento] = useState('');
    const [estado, setEstado] = useState('');
    const [tipocliente, setTipocliente] = useState(0);
    const API_URL = 'https://localhost:7260';
    const navigate = useNavigate();


    enum Tags {
        Cliente = 1,
        Fornecedor = 2,
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // previne o envio padrão do formulário


        const user: IUser = {
            nome,
            cnpj,
            email,
            senha,
            confirmasenha: senhaVerificada,
            telefone,
            tipocliente: tipocliente,
            endereco: {
                cep,
                rua,
                numero,
                complemento,
                estado
            }

        }
        try {
            axios.post<IUser | undefined>(API_URL + `/User`, user)
                .then(resposta => {
                    if (resposta.status == 200) {
                        alert("Usuario Cadastrado com Sucesso")
                        navigate('/login');
                    }
                });

        } catch(erro) {
            erro && alert('erro ao cadastrar os dados')
        }
    }


    return (
                <>
                    <Titulo>Dados Basicos:</Titulo>
                    <Formulario onSubmit={handleSubmit}>
                        <CampoDigitacao
                    tipo="text"
                    label="Nome"
                    valor={nome}
                    placeholder="Insira seu nome"
                    onChange={setNome}
                    required={true}
                        />
                        <CampoDigitacao
                            tipo="text"
                            label="CNPJ"
                            valor={cnpj}
                            placeholder="Insira seu cnpj"
                    onChange={setCnpj}
                    required={true}
                        />
                        <CampoDigitacao
                            tipo="email"
                            label="Email"
                            valor={email}
                            placeholder="Insira o endereco de e-mail para login"
                    onChange={setEmail}
                    required={true}
                        />
                        <CampoDigitacao
                            tipo="password"
                            label="Senha"
                            valor={senha}
                            placeholder="Digite sua senha"
                    onChange={setSenha}
                    required={true}
                        />
                        <CampoDigitacao
                            tipo="password"
                            label="Confirme a senha"
                            valor={senhaVerificada}
                            placeholder="Confirme sua senha"
                    onChange={setSenhaVerificada}
                    required={true}
                />
                <select value={tipocliente} onChange={(e) => setTipocliente(parseInt(e.target.value))}>
                    <option key="" value="">Selecione uma tag</option>
                    {Object.entries(Tags)
                        .filter(([key, value]) => key === "" || value === Tags.Cliente || value === Tags.Fornecedor)
                        .map(([key, value]) => (
                            <option key={key} value={value}>
                                {key}
                            </option>
                        ))}
                </select>
                    <h2>Endereco</h2>
                    <CampoDigitacao
                        tipo="tel"
                        label="Telefone"
                        valor={telefone}
                        placeholder="(DDD) XXXXX-XXXX"
                    onChange={setTelefone}
                    required={true}
                    />
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
                            valor={numero.toString()}
                            placeholder="Número"
                    onChange={(valor) => setNumero(parseInt(valor))}
                    required={false}
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
                    <BotaoCustomizado type="submit">Cadastrar</BotaoCustomizado>
            </Formulario>
                    <p></p>
                </> 
    )
}