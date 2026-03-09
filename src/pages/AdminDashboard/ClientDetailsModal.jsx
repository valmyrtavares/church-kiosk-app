import React from 'react';
import styles from './Admin.module.scss';

const ClientDetailsModal = ({ client, payments, onClose }) => {
    if (!client) return null;

    // Filter payments belonging to this client
    const clientPayments = payments.filter(p => p.clienteId === client.id)
        .sort((a, b) => new Date(b.data) - new Date(a.data));

    const total = clientPayments.reduce((acc, curr) => acc + (curr.valor || 0), 0);

    const formatDate = (isoString) => {
        const d = new Date(isoString);
        return d.toLocaleDateString('pt-BR') + ' às ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    const getTypeName = (type) => {
        switch (type) {
            case 'OFERTA': return 'Oferta';
            case 'DIZIMO': return 'Dízimo';
            case 'ORACAO': return 'Pedido de Oração';
            case 'MILAGRE_GRACA': return 'Milagre / Graça';
            default: return type;
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>

                <div className={styles.modalHeader}>
                    <h3>Detalhes do Fiel</h3>
                    <button onClick={onClose}>&times;</button>
                </div>

                <div className={styles.modalBody}>
                    <div className={styles.summaryHeader}>
                        <div>
                            <span>Nome</span>
                            <strong>{client.nome}</strong>
                        </div>
                        <div>
                            <span>Celular</span>
                            <strong>{client.celular || 'Não informado'}</strong>
                        </div>
                        <div>
                            <span>Total Contribuído</span>
                            <strong>R$ {total.toFixed(2)}</strong>
                        </div>
                    </div>

                    <h4>Histórico de Movimentações</h4>
                    <div className={styles.historyList} style={{ marginTop: '15px' }}>
                        {clientPayments.length === 0 ? (
                            <p>Nenhuma movimentação encontrada para este fiel.</p>
                        ) : (
                            clientPayments.map(p => (
                                <div key={p.id} className={styles.historyItem}>
                                    <div className={styles.row}>
                                        <span className={styles.type}>{getTypeName(p.tipo)}</span>
                                        <span className={styles.date}>{formatDate(p.data)}</span>
                                    </div>
                                    <div className={styles.row} style={{ marginTop: '5px' }}>
                                        <span className={styles.date}>Via {p.metodoPagamento || 'Não info.'}</span>
                                        <span className={styles.value}>R$ {parseFloat(p.valor).toFixed(2)}</span>
                                    </div>
                                    {p.texto && (
                                        <div className={styles.textDesc}>
                                            "{p.texto}"
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    <button onClick={onClose}>Fechar</button>
                </div>

            </div>
        </div>
    );
};

export default ClientDetailsModal;
