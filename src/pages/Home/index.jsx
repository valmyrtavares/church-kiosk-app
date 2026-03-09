import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';

const Home = () => {
    const navigate = useNavigate();

    const menuItems = [
        { label: 'Oferta', path: '/oferta', color: 'primary' },
        { label: 'Dízimo', path: '/dizimo', color: 'secondary' },
        { label: 'Pedido de Oração', path: '/pedido-oracao', color: 'primary' },
        { label: 'Milagre ou Graça', path: '/milagre', color: 'secondary' }
    ];

    return (
        <div className={styles.container}>
            <h2>Bem-vindo! Selecione uma opção:</h2>
            <div className={styles.grid}>
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        className={`${styles.card} ${styles[item.color]}`}
                        onClick={() => navigate(item.path)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Home;
