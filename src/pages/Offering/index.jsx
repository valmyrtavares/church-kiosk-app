import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formStyles from '../../styles/form.module.scss';
import ActionButton from '../../components/ActionButton';
import UserIdentificationForm from '../../components/UserIdentificationForm';
import { storageService } from '../../services/storageService';

const Offering = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState(null); // { isAnonymous: boolean, client: ClientObject | null }
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleIdentified = (data) => {
        setUserData(data);
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount) return;

        setLoading(true);
        try {
            await storageService.addDoc('pagamentos', {
                tipo: 'OFERTA',
                valor: parseFloat(amount),
                clienteId: userData.isAnonymous ? null : userData.client.id,
                isAnonymous: userData.isAnonymous
            });

            setSuccess('Oferta registrada com sucesso. Obrigado!');
            setTimeout(() => navigate('/'), 3000);
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
            <h2 className={formStyles.title}>Deseja Contribuir com sua Oferta</h2>

            {step === 1 && (
                <UserIdentificationForm onIdentified={handleIdentified} />
            )}

            {step === 2 && (
                <form className={formStyles.card} onSubmit={handleSubmit}>
                    {!userData.isAnonymous && userData.client && (
                        <div className={formStyles.feedback}>
                            Deus te abençoe, {userData.client.nome}!
                        </div>
                    )}

                    <div className={formStyles.inputGroup}>
                        <label>Valor da Oferta (R$)</label>
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
                        <ActionButton type="button" variant="outline" fullWidth onClick={() => setStep(1)}>
                            Voltar
                        </ActionButton>
                        <ActionButton type="submit" variant="primary" fullWidth disabled={loading || !amount}>
                            {loading ? 'Processando...' : 'Confirmar Pagamento'}
                        </ActionButton>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Offering;
