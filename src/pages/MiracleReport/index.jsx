import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formStyles from '../../styles/form.module.scss';
import ActionButton from '../../components/ActionButton';
import UserIdentificationForm from '../../components/UserIdentificationForm';
import { storageService } from '../../services/storageService';

const MiracleReport = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState(null);
    const [testimony, setTestimony] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleIdentified = (data) => {
        setUserData(data);
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!testimony) return;

        setLoading(true);
        try {
            await storageService.addDoc('testemunhos', {
                tipo: 'MILAGRE_GRACA',
                texto: testimony,
                clienteId: userData.isAnonymous ? null : userData.client.id,
                isAnonymous: userData.isAnonymous
            });

            setSuccess('Obrigado por compartilhar seu testemunho! Toda glória a Deus.');
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
            <h2 className={formStyles.title}>Milagre ou Graça Alcançada</h2>

            {step === 1 && (
                <UserIdentificationForm onIdentified={handleIdentified} />
            )}

            {step === 2 && (
                <form className={formStyles.card} onSubmit={handleSubmit}>
                    {!userData.isAnonymous && userData.client && (
                        <div className={formStyles.feedback}>
                            Alegre-se no Senhor, {userData.client.nome}!
                        </div>
                    )}

                    <div className={formStyles.inputGroup}>
                        <label>Conte seu testemunho</label>
                        <textarea
                            value={testimony}
                            onChange={(e) => setTestimony(e.target.value)}
                            placeholder="Descreva aqui o milagre ou a graça que você alcançou..."
                            required
                        />
                    </div>

                    <div className={formStyles.actionRow}>
                        <ActionButton type="button" variant="outline" fullWidth onClick={() => setStep(1)}>
                            Voltar
                        </ActionButton>
                        <ActionButton type="submit" variant="primary" fullWidth disabled={loading || !testimony}>
                            {loading ? 'Salvando...' : 'Enviar Testemunho'}
                        </ActionButton>
                    </div>
                </form>
            )}
        </div>
    );
};

export default MiracleReport;
