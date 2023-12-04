import styled from 'styled-components';
import logo from './assets/Logo_LoveFood.jpg';
import pesquisa from './assets/pesquisa.png';
import perfil from './assets/perfil.png';
import autenticaStore from '../../store/autentica.store';
import { SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CabecalhoEstilizado = styled.header`
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 0em 4em;
    background-color: orange
`

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-grow: .1;
`


const ContainerPesquisa = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 20px;
  padding: 8px 16px;
`;


const InputCustomizado = styled.input`
  flex: 1;
  border: none;
  background: none;
  outline: none;
`;


const SpanCustomizado = styled.span`
  background-image: url(${pesquisa});
  background-repeat: no-repeat;
  width: 25px;
  height: 25px;
background-position: 10px;
`;


const BotaoEstilizado = styled.a`
background-color: var(--azul-escuro);
border-radius: 8px;
padding: 12px 16px;
color: var(--branco);
text-decoration: none;
`


const handleLogout = () => {
    autenticaStore.logout();
};

function Cabecalho() {
    const [isAutenticado, setIsAutenticado] = useState(autenticaStore.estaAutenticado);
    const [userTipo, setUserTipo] = useState(autenticaStore.usuario.tipoUser);

    //useEffect(() => {
    //    const dadosAutenticacao = localStorage.getItem('autenticacao');
    //    if (dadosAutenticacao) {
    //        const { autenticado, tipoUser } = JSON.parse(dadosAutenticacao);
    //        setIsAutenticado(autenticado);
    //        setUserTipo(tipoUser);
    //        console.log("autenticado: ", autenticado);
    //        console.log("tipoUser:", tipoUser);
    //    }
    //}, []);

    useEffect(() => {
        const disposer = autenticaStore.registrarObservadorAutenticacao((isAutenticado: boolean | ((prevState: boolean) => boolean), usuario: { tipoUser: SetStateAction<number>; }) => {
            setIsAutenticado(isAutenticado);
            setUserTipo(usuario.tipoUser);
        });

        return () => {
            disposer();
        };
    }, []);

    return (
        <CabecalhoEstilizado>
            <img src={logo} alt="logo da empresa LoveFood" />
            <Container>
                {isAutenticado
                    ? <>{userTipo>1
                        ? <>
                            <p><Link to="/AdminRestaurante" >Adiministrativo</Link></p>
                            <p><Link to="/historico" >Historico de Vendas</Link></p>
                        </>
                        : <>
                        </>
                    }
                        <p><Link to="/pesquisa" >Historico de Pedidos</Link></p>
                        <p><Link to="/restaurant" >Restaurantes</Link></p>
                        <p><Link to="/home" >Home</Link></p>
                        <p><Link to="/Carrinho" >Carrinho</Link></p>
                        <img src={perfil} alt="imagem de perfil do usuário" />
                        <p><Link to="/" onClick={handleLogout}>Sair</Link></p>
                    </>
                    : <>
                        <p><Link to="/home" >Home</Link></p>
                        <p><Link to="/sobre" >Sobre</Link></p>
                        <p><Link to="/cadastro">Cadastre-se</Link></p>
                        <ContainerPesquisa>
                            <InputCustomizado type="text" placeholder='Digite sua busca' />
                            <SpanCustomizado />
                        </ContainerPesquisa>
                        <BotaoEstilizado href="/login">Entrar</BotaoEstilizado>
                    </>
                }
            </Container>
        </CabecalhoEstilizado>
    )
}

export default Cabecalho;