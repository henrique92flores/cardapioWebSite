import styled from 'styled-components';
import whatsapp from './assets/whatsapp.png';
import instagram from './assets/instagram.png';
import google from './assets/google.png';
import facebook from './assets/facebook.png';

const RodapeEstilizado = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0em;
  background-color: orange;
  text-align: center;
  z-index: 1; 
`

const ListaEstilizada = styled.ul`
  display: flex;
  justify-content: space-around;
  width: 10%;
  margin: 1em auto;
`

const ItemEstilizado = styled.li`
  list-style-type: none;
`

function Rodape() {
    return (
        <div style={{ paddingBottom: '5em' }}>
            {/* Espaço de preenchimento no final do conteúdo para acomodar o rodapé */}
            <RodapeEstilizado>
                <ListaEstilizada>
                    <ItemEstilizado>
                        <a href="#">
                            <img src={facebook} alt="logo do facebook" />
                        </a>
                    </ItemEstilizado>
                    <ItemEstilizado>
                        <a href="#">
                            <img src={whatsapp} alt="logo do whatsapp" />
                        </a>
                    </ItemEstilizado>
                    <ItemEstilizado>
                        <a href="#">
                            <img src={google} alt="logo do google" />
                        </a>
                    </ItemEstilizado>
                    <ItemEstilizado>
                        <a href="#">
                            <img src={instagram} alt="logo do instagram" />
                        </a>
                    </ItemEstilizado>
                </ListaEstilizada>
                <p>2023 © Puc Minas | Projeto fictício sem fins comerciais.</p>
            </RodapeEstilizado>
        </div>
    )
}

export default Rodape;
