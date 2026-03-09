import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SideMenu from '../SideMenu';
import styles from './LayoutTotem.module.scss';
import ActionButton from '../ActionButton';

const LayoutTotem = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Fecha o menu lateral quando a rota muda (clicou num link no mobile)
    React.useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div className={styles.layout}>
            {/* Botão Hambúrguer Mobile */}
            <div className={styles.mobileHeader}>
                <div className={styles.brand}>Igreja App</div>
                <button className={styles.hamburgerBtn} onClick={toggleMenu}>
                    {menuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* SideMenu com classe de estado para o mobile */}
            <div className={`${styles.sidebarWrapper} ${menuOpen ? styles.open : ''}`}>
                <SideMenu onCloseMenu={() => setMenuOpen(false)} />
            </div>

            {/* Fundo escuro atrás do menu no mobile se aberto */}
            {menuOpen && (
                <div className={styles.mobileOverlay} onClick={toggleMenu}></div>
            )}

            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </div>
    );
};

export default LayoutTotem;
