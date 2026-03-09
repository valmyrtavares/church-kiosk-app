import React from 'react';
import styles from './PaymentPopup.module.scss';

const PaymentPopup = ({ method }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.spinner}></div>
                <h2>Aguardando Pagamento</h2>
                <p>Efetue o pagamento na máquina ao lado.</p>
                <div className={styles.methodBadge}>
                    {method === 'PIX' ? 'Pix' : method === 'DEBITO' ? 'Débito' : 'Crédito'}
                </div>
            </div>
        </div>
    );
};

export default PaymentPopup;
