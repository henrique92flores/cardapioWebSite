import { Link } from 'react-router-dom';
import banner from './imagens/cozinhar_01.jpg';
import hamburguer from './imagens/cozinhar_02.jpg';
import cafe from './imagens/cafedamanha.png';
import almoco from './imagens/almoco.png';
import jantar from './imagens/jantar.png';
import sobremesa from './imagens/sobremesa.png';
import "./Home.css"

function Home() {
    return (
        <>
            <div className="MiniBanners">
                <img src={ banner} alt="Um prato conceitual" />
                <div className="CardCentral">
                    <h2>A melhor rede de restaurantes!</h2>
                    <div>
                        <p>seja um parceiro agora:</p>
                        <p>ligue para <a href="callto:99999999999">(99) 99999-999</a></p>
                    </div>
                </div>
                <img src={ hamburguer} alt="Um hambúrguer desconstruído" />
            </div>
            <div className="Categorias">
                <div className="TipoDePrato">
                    <img src={ cafe} alt="Café da manhã" />
                    <h4>Café da manhã</h4>
                </div>
                <div className="TipoDePrato">
                    <img src={ almoco} alt="Almoço" />
                    <h4>Almoço</h4>
                </div>
                <div className="TipoDePrato">
                    <img src={ jantar} alt="Jantar" />
                    <h4>Jantar</h4>
                </div>
                <div className="TipoDePrato">
                    <img src={ sobremesa} alt="Sobremesas" />
                    <h4>Sobremesas</h4>
                </div>
            </div>
            <div className="Links">
                <h3>Conheca os nossos restaurantes</h3>
                <p>Clique <Link to='/restaurant'>aqui</Link></p>
            </div>
        </>
    );
}

export default Home;
