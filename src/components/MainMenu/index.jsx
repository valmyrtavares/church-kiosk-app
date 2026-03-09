import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../ActionButton';
import styles from './MainMenu.module.scss';

const MainMenu = () => {
    const navigate = useNavigate();

    const options = [
        { label: 'Oferta', path: '/oferta', color: 'primary', desc: 'Semeie no reino de Deus' },
        { label: 'Dízimo', path: '/dizimo', color: 'secondary', desc: 'Devolva sua primícia' },
        { label: 'Pedido de Oração', path: '/pedido-oracao', color: 'primary', desc: 'Deixe seu pedido' },
        { label: 'Milagre ou Graça', path: '/milagre', color: 'secondary', desc: 'Compartilhe seu testemunho' }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Seja Bem-Vindo!</h2>
                <p>Como podemos ajudar você hoje?</p>
            </div>

            <div className={styles.grid}>
                {options.map((option, index) => (
                    <button
                        key={index}
                        className={`${styles.card} ${styles[option.color]}`}
                        onClick={() => navigate(option.path)}
                    >
                        <span className={styles.title}>{option.label}</span>
                        <span className={styles.desc}>{option.desc}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MainMenu;
