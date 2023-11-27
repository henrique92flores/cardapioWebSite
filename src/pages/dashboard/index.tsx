import { useState } from "react";
import { Card } from "../../components/card/card";
import { CreateModal } from "../../components/create-modal/create-modal"
import { useFoodData } from "../../hooks/useFoodData";

export default function Dashboard() {
    const { data } = useFoodData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(prev => !prev)
    }
    return (
            <div className="container">
                <h1>Cardapio</h1>
                <div className="card-grid">
                {data?.map(data =>
                    <Card key={data.id}
                        price={data.preco}
                        title={data.titulo}
                        image={data.imagem}
                        />
                    )}
                </div>
                {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
                <button onClick={handleOpenModal}>Novo</button>
            </div>
    )
}