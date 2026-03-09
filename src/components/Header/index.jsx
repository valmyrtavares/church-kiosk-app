import React from 'react';
import styles from './Header.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === '/';

    return (
        <header className={styles.header}>
            {!isHome && (
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    &larr; Voltar
                </button>
            )}
            <div className={styles.logo}>
                <h1>Sistema de Igreja</h1>
            </div>
        </header>
    );
};

export default Header;
