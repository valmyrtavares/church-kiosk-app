import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ActionButton from '../ActionButton';
import styles from './SideMenu.module.scss';

const SideMenu = ({ onCloseMenu }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { label: 'Oferta', path: '/oferta', color: 'primary' },
        { label: 'Dízimo', path: '/dizimo', color: 'secondary' },
        { label: 'Oração', path: '/pedido-oracao', color: 'primary' },
        { label: 'Milagre / Graça', path: '/milagre', color: 'secondary' }
    ];

    const handleCancel = () => {
        navigate('/');
        if (onCloseMenu) onCloseMenu();
    };

    const handleNavigate = (path) => {
        navigate(path);
        if (onCloseMenu) onCloseMenu();
    }

    return (
        <aside className={styles.sideMenu}>
            <div className={styles.topSection}>
                <div className={styles.logo}>
                    <h1>Igreja App</h1>
                </div>

                <nav className={styles.navigation}>
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <ActionButton
                                key={index}
                                variant={isActive ? 'primary' : 'outline'}
                                fullWidth
                                onClick={() => handleNavigate(item.path)}
                                className={styles.menuItem}
                            >
                                {item.label}
                            </ActionButton>
                        );
                    })}
                </nav>
            </div>

            <div className={styles.bottomSection}>
                <ActionButton
                    variant="danger"
                    fullWidth
                    onClick={handleCancel}
                >
                    Cancelar operação
                </ActionButton>
            </div>
        </aside>
    );
};

export default SideMenu;
