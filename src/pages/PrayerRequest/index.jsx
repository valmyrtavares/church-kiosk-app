import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formStyles from '../../styles/form.module.scss';
import ActionButton from '../../components/ActionButton';
import UserIdentificationForm from '../../components/UserIdentificationForm';
import { storageService } from '../../services/storageService';

const PrayerRequest = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState(null);
    const [requestText, setRequestText] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleIdentified = (data) => {
        setUserData(data);
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!requestText) return;

        setLoading(true);
        try {
            await storageService.addDoc('pedidos_oracao', {
                tipo: 'ORACAO',
                texto: requestText,
                clienteId: userData.isAnonymous ? null : userData.client.id,
                isAnonymous: userData.isAnonymous
            });

            setSuccess('Seu pedido de oração foi registrado e estaremos orando por você!');
            setTimeout(() => navigate('/'), 4000);
        } catch (err) {
            alert('Houve um erro.');
        } finally {
            setLoading(false);
        }
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
            <h2 className={formStyles.title}>Pedido de Oração</h2>

            {step === 1 && (
                <UserIdentificationForm onIdentified={handleIdentified} />
            )}

            {step === 2 && (
                <form className={formStyles.card} onSubmit={handleSubmit}>
                    {!userData.isAnonymous && userData.client && (
                        <div className={formStyles.feedback}>
                            Deus está no controle, {userData.client.nome}!
                        </div>
                    )}

                    <div className={formStyles.inputGroup}>
                        <label>Escreva seu pedido</label>
                        <textarea
                            value={requestText}
                            onChange={(e) => setRequestText(e.target.value)}
                            placeholder="Descreva aqui o seu pedido de oração..."
                            required
                        />
                    </div>

                    <div className={formStyles.actionRow}>
                        <ActionButton type="button" variant="outline" fullWidth onClick={() => setStep(1)}>
                            Voltar
                        </ActionButton>
                        <ActionButton type="submit" variant="primary" fullWidth disabled={loading || !requestText}>
                            {loading ? 'Salvando...' : 'Enviar Pedido'}
                        </ActionButton>
                    </div>
                </form>
            )}
        </div>
    );
};

export default PrayerRequest;
