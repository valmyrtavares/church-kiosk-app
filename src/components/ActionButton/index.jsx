import React from 'react';
import styles from './ActionButton.module.scss';

const ActionButton = ({
    children,
    onClick,
    variant = 'primary', // primary, secondary, danger, outline
    fullWidth = false,
    className = '',
    icon,
    ...props
}) => {
    return (
        <button
            className={`
        ${styles.button} 
        ${styles[variant]} 
        ${fullWidth ? styles.fullWidth : ''}
        ${className}
      `}
            onClick={onClick}
            {...props}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.content}>{children}</span>
        </button>
    );
};

export default ActionButton;
