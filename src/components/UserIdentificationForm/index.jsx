import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formStyles from '../../styles/form.module.scss';
import ActionButton from '../../components/ActionButton';
import { storageService } from '../../services/storageService';

const UserIdentificationForm = ({ onIdentified }) => {
    const navigate = useNavigate();
    const [mode, setMode] = useState(null);
    const [cpf, setCpf] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleModeSelect = (selectedMode) => {
        setMode(selectedMode);
        if (selectedMode === 'anonymous') {
            onIdentified({ isAnonymous: true, client: null });
        }
    };

    const handleCpfSubmit = async () => {
        if (!cpf || cpf.length < 11) {
            setError('Por favor, informe um CPF válido.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const cleanCpf = String(cpf).replace(/\D/g, '');
            const client = await storageService.getClientByCpf(cleanCpf);

            if (client) {
                onIdentified({ isAnonymous: false, client });
            } else {
                setError('Cliente não encontrado.');
            }
        } catch (err) {
            setError('Erro ao buscar cadastro.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = () => {
        navigate('/cadastro');
    };

    if (!mode) {
        return (
            <div className={formStyles.card}>
                <div className={formStyles.inputGroup}>
                    <div className={formStyles.modeSelection}>
                        <ActionButton variant="outline" onClick={() => handleModeSelect('anonymous')}>
                            Anônimo
                        </ActionButton>
                        <ActionButton variant="primary" onClick={() => handleModeSelect('assisted')}>
                            Assistido (Buscar CPF)
                        </ActionButton>
                    </div>
                </div>
            </div>
        );
    }

    if (mode === 'assisted') {
        return (
            <div className={formStyles.card}>
                <div className={formStyles.inputGroup}>
                    <label>Informe seu CPF (apenas números)</label>
                    <input
                        type="number"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        placeholder="000.000.000-00"
                        disabled={loading}
                    />
                </div>

                {error && (
                    <div className={`${formStyles.feedback} ${formStyles.error}`}>
                        {error}
                    </div>
                )}

                <div className={formStyles.actionRow}>
                    <ActionButton variant="outline" fullWidth onClick={() => setMode(null)} disabled={loading}>
                        Voltar
                    </ActionButton>

                    {error === 'Cliente não encontrado.' ? (
                        <ActionButton variant="secondary" fullWidth onClick={handleRegister} disabled={loading}>
                            Cadastrar Agora
                        </ActionButton>
                    ) : (
                        <ActionButton variant="primary" fullWidth onClick={handleCpfSubmit} disabled={loading || !cpf}>
                            {loading ? 'Buscando...' : 'Buscar'}
                        </ActionButton>
                    )}
                </div>
            </div>
        );
    }

    return null;
};

export default UserIdentificationForm;
