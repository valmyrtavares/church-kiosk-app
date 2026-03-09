import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import formStyles from '../../styles/form.module.scss';
import ActionButton from '../../components/ActionButton';
import { storageService } from '../../services/storageService';

const CustomerRegistration = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        rg: '',
        celular: '',
        email: '',
        indicacao: '',
        frequentadorDesde: '',
        aceitaComunicacao: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nome || !formData.cpf) {
            alert('Nome e CPF são obrigatórios.');
            return;
        }

        setLoading(true);
        try {
            // Remover máscara do CPF para salvar
            const cleanData = {
                ...formData,
                cpf: formData.cpf.replace(/\D/g, '')
            };

            await storageService.addDoc('clientes', cleanData);
            setSuccess('Cadastro realizado com sucesso!');

            // Volta para o início após alguns segundos
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (err) {
            alert('Erro ao realizar cadastro.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={formStyles.container}>
            <h2 className={formStyles.title}>Cadastro de Membro / Visitante</h2>

            {success ? (
                <div className={`${formStyles.feedback} ${formStyles.success}`}>
                    {success}
                </div>
            ) : (
                <form className={formStyles.card} onSubmit={handleSubmit}>
                    <div className={formStyles.inputGroup}>
                        <label>Nome Completo*</label>
                        <input name="nome" value={formData.nome} onChange={handleChange} required />
                    </div>

                    <div className={formStyles.inputGroup}>
                        <label>CPF*</label>
                        <input name="cpf" type="number" placeholder="Somente números" value={formData.cpf} onChange={handleChange} required />
                    </div>

                    <div className={formStyles.inputGroup}>
                        <label>RG</label>
                        <input name="rg" value={formData.rg} onChange={handleChange} />
                    </div>

                    <div className={formStyles.inputGroup}>
                        <label>Celular</label>
                        <input name="celular" type="tel" value={formData.celular} onChange={handleChange} />
                    </div>

                    <div className={formStyles.inputGroup}>
                        <label>E-mail</label>
                        <input name="email" type="email" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className={formStyles.inputGroup}>
                        <label>Quem te indicou?</label>
                        <input name="indicacao" value={formData.indicacao} onChange={handleChange} />
                    </div>

                    <div className={formStyles.inputGroup}>
                        <label>Frequentador desde (Ano/Mês)</label>
                        <input name="frequentadorDesde" value={formData.frequentadorDesde} onChange={handleChange} />
                    </div>

                    <div className={formStyles.inputGroup} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <input
                            name="aceitaComunicacao"
                            type="checkbox"
                            checked={formData.aceitaComunicacao}
                            onChange={handleChange}
                            style={{ width: '24px', height: '24px' }}
                        />
                        <label style={{ marginLeft: '10px' }}>Aceito receber comunicações e avisos da igreja.</label>
                    </div>

                    <div className={formStyles.actionRow}>
                        <ActionButton type="button" variant="outline" fullWidth onClick={() => navigate(-1)}>
                            Cancelar
                        </ActionButton>
                        <ActionButton type="submit" variant="primary" fullWidth disabled={loading}>
                            {loading ? 'Salvando...' : 'Finalizar Cadastro'}
                        </ActionButton>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CustomerRegistration;
