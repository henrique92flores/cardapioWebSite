/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import usePost from '../../hooks/usePost';
import autenticaStore from '../../store/autentica.store';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  flex-direction: column;
  display: flex;
    justify-content: center;
  align-items: center;
  height: 100vh;

`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Alterado para column para garantir que os itens estejam em uma única coluna */
  border: 2px solid black;
    background-color: #fddbb4; /* Laranja claro */
  border-radius: 10px;
  width: 40%;
  height: 45%;
`;

const Formulario = styled.form`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Titulo = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #444; /* Cinza escuro */
  margin-bottom: 20px;
`;

const LinkCustomizado = styled(Link)`
  color: #007bff; /* Azul claro */
  font-weight: 700;
  text-decoration: none;
`;

const ImagemContainer = styled.div`

  justify-content: center;
  align-items: center;
`;

const ImagemLogo = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Paragrafo = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #001f3f; /* Azul escuro */
  margin-top: 10px; /* Adicionado para espaço entre o formulário e o parágrafo */
`;

const ParagrafoCadastro = styled(Paragrafo)`
  color: #444; /* Cinza escuro */
`;

interface InputProps {
    label: string,
    tipo: string,
    value: string | number,
    updateValue(value: any): void,
    required: boolean
}

const Input = ({ label, tipo, value, updateValue, required }: InputProps) => {
    return (
        <>

            <label>{label}</label>
            <input
                type={tipo}
                value={value}
                onChange={event => updateValue(event.target.value)}
                required={required}
            />
        </>
    )
}

export default function Login() {
    const [id] = useState();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostraErro, setMostraErro] = useState(false);
    const [tipoUser] = useState(0);
    const { cadastrarDados, erro, sucesso, resposta, usertype } = usePost();
    const navigate = useNavigate();

    useEffect(() => {
        if (resposta != null && sucesso) {
            navigate('/home');
        } else if (mostraErro) {
            alert('Usuario ou senha nao encontrados, valide os dados informados');
        }
    }, [sucesso, resposta, usertype, erro, navigate]);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const usuario = {
            id,
            email,
            senha,
            tipoUser,
        };

        if (!email || !senha) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            await cadastrarDados({ url: 'user/login', dados: usuario });
            await autenticaStore.login({ id, email, token: resposta, tipoUser: usertype });
            if (!sucesso)
                setMostraErro(true);

        } catch (erro) {
            erro && alert('Não foi possível fazer o login');
        }
    };

    return (
        <Container>
            <ImagemContainer>
                <ImagemLogo src="../src/assets/Logo_LoveFood.jpg" alt="logo da empresa LoveFood" />
            </ImagemContainer>
            <FormContainer>
                <Formulario onSubmit={handleLogin}>
                    <Titulo>Faca login em sua conta</Titulo>
                    <Input label="Email" tipo="email" value={email} updateValue={setEmail} required={true} />
                    <Input label="Senha" tipo="password" value={senha} updateValue={setSenha} required={true} />
                    <button type="submit">Entrar</button>
                </Formulario>
                <Paragrafo>Esqueceu sua senha?</Paragrafo>
                <ParagrafoCadastro>
                    Ainda nao tem conta? <LinkCustomizado to="/cadastro">Faca seu cadastro!</LinkCustomizado>
                </ParagrafoCadastro>
            </FormContainer>

        </Container>
    );
}
