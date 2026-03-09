import React from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from '../SideMenu';
import styles from './LayoutTotem.module.scss';

const LayoutTotem = () => {
    return (
        <div className={styles.layout}>
            <SideMenu />
            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </div>
    );
};

export default LayoutTotem;
