import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const LoadingScreen: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <img src='../src/assets/loading.gif' alt="Carregando..." />
            <p>Carregando...</p>
        </div>
    );
};

const SuccessMessage: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '200px', color: 'green', fontSize: 45 }}>
            <p>Aprovado!</p>
        </div>
    );
};

Modal.setAppElement('#root');

export const LoadingPayment: React.FC = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const simulateLoading = () => {
        setModalIsOpen(true);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                setModalIsOpen(false);
            }, 2000);
        }, 5000); 
    };

    const resetState = () => {
        setLoading(false);
        setShowSuccess(false);
        setModalIsOpen(false);
    };

    useEffect(() => {
        return () => {
            resetState();
        };
    }, []);

    return (
        <div>
            <button onClick={simulateLoading}>Iniciar Carregamento</button>

            <Modal isOpen={modalIsOpen}>
                {loading ? <LoadingScreen /> : null}
                {showSuccess ? <SuccessMessage /> : null}
            </Modal>
        </div>
    );
};
