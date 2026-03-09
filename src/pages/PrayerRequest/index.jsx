import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formStyles from '../../styles/form.module.scss';
import ActionButton from '../../components/ActionButton';
import UserIdentificationForm from '../../components/UserIdentificationForm';
import PaymentMethodSelection from '../../components/PaymentMethodSelection';
import PaymentPopup from '../../components/PaymentPopup';
import { storageService } from '../../services/storageService';

const PrayerRequest = () => {
    const navigate = useNavigate();
    // Passos: 1 = Valor + Texto, 2 = Identificação, 3 = Pagamento
    const [step, setStep] = useState(1);
    const [requestText, setRequestText] = useState('');
    const [amount, setAmount] = useState('');
    const [userData, setUserData] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleIdentified = (data) => {
        setUserData(data);
        setStep(3);
    };

    const handlePayment = async () => {
        if (!amount || !paymentMethod || !requestText) return;

        setLoading(true);
        setShowPopup(true);

        setTimeout(async () => {
            try {
                await storageService.addDoc('pagamentos', {
                    tipo: 'ORACAO',
                    valor: parseFloat(amount),
                    texto: requestText,
                    data: new Date().toISOString(),
                    metodoPagamento: paymentMethod,
                    clienteId: userData.isAnonymous ? null : userData.client.id,
                    isAnonymous: userData.isAnonymous
                });

                setShowPopup(false);
                setSuccess('Pedido de oração junto com seu voto registrado com sucesso. Estaremos orando por você!');
                setTimeout(() => navigate('/'), 4000);
            } catch (err) {
                alert('Houve um erro.');
                setShowPopup(false);
            } finally {
                setLoading(false);
            }
        }, 4000);
    };

    if (success) {
        return (
            <div className={formStyles.container}>
                <div className={`${formStyles.feedback} ${formStyles.success}`}>
                    {success}
                </div>
            </div>
        );
    }

    return (
        <div className={formStyles.container}>
            {showPopup && <PaymentPopup method={paymentMethod} />}

            <h2 className={formStyles.title}>Pedido de Oração</h2>

            {step === 1 && (
                <form className={formStyles.card} onSubmit={(e) => { e.preventDefault(); if (amount && requestText) setStep(2); }}>
                    <div className={formStyles.inputGroup}>
                        <label>1. Escreva seu pedido</label>
                        <textarea
                            value={requestText}
                            onChange={(e) => setRequestText(e.target.value)}
                            placeholder="Descreva aqui o seu pedido de oração..."
                            required
                        />
                    </div>

                    <div className={formStyles.inputGroup}>
                        <label>Valor do Voto / Oferta (R$)</label>
                        <input
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            required
                        />
                    </div>

                    <div className={formStyles.actionRow}>
                        <ActionButton type="button" variant="outline" fullWidth onClick={() => navigate('/')}>Cancelar</ActionButton>
                        <ActionButton type="submit" variant="primary" fullWidth disabled={!amount || !requestText}>Próximo</ActionButton>
                    </div>
                </form>
            )}

            {step === 2 && (
                <>
                    <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>2. Como deseja se identificar?</h3>
                    <UserIdentificationForm onIdentified={handleIdentified} />
                    <div className={formStyles.actionRow} style={{ marginTop: '10px' }}>
                        <ActionButton type="button" variant="outline" fullWidth onClick={() => setStep(1)}>Voltar</ActionButton>
                    </div>
                </>
            )}

            {step === 3 && (
                <div className={formStyles.card}>
                    <h3 style={{ marginBottom: '10px' }}>3. Pagamento</h3>

                    {!userData.isAnonymous && userData.client && (
                        <div className={formStyles.feedback} style={{ marginBottom: '20px' }}>
                            Deus está no controle, {userData.client.nome}!
                        </div>
                    )}

                    <div style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                        <strong>Valor total:</strong> R$ {parseFloat(amount).toFixed(2)}
                    </div>

                    <PaymentMethodSelection onSelect={setPaymentMethod} disabled={loading} />

                    {paymentMethod && (
                        <div style={{ marginTop: '15px', fontWeight: 'bold', color: '#2b6cb0' }}>
                            Forma selecionada: {paymentMethod}
                        </div>
                    )}

                    <div className={formStyles.actionRow}>
                        <ActionButton type="button" variant="outline" fullWidth onClick={() => setStep(2)} disabled={loading}>
                            Voltar
                        </ActionButton>
                        <ActionButton type="button" variant="primary" fullWidth onClick={handlePayment} disabled={loading || !paymentMethod}>
                            Efetuar Pagamento
                        </ActionButton>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrayerRequest;
