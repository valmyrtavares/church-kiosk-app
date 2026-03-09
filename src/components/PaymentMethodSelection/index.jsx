import React from 'react';
import formStyles from '../../styles/form.module.scss';
import ActionButton from '../ActionButton';

const PaymentMethodSelection = ({ onSelect, disabled }) => {
    return (
        <div className={formStyles.inputGroup}>
            <label>Forma de Pagamento</label>
            <div className={formStyles.modeSelection}>
                <ActionButton
                    type="button"
                    variant="outline"
                    onClick={() => onSelect('PIX')}
                    disabled={disabled}
                >
                    Pix
                </ActionButton>
                <ActionButton
                    type="button"
                    variant="outline"
                    onClick={() => onSelect('DEBITO')}
                    disabled={disabled}
                >
                    Débito
                </ActionButton>
                <ActionButton
                    type="button"
                    variant="outline"
                    onClick={() => onSelect('CREDITO')}
                    disabled={disabled}
                    className={formStyles.fullSpanIfOdd} // Se precisar ajustar no grid depois
                >
                    Crédito
                </ActionButton>
            </div>
        </div>
    );
};

export default PaymentMethodSelection;
