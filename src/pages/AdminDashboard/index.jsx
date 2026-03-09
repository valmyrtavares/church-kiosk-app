import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.scss';
import { storageService } from '../../services/storageService';
import ClientDetailsModal from './ClientDetailsModal';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('fieis'); // 'fieis' | 'operacoes'
    const [clients, setClients] = useState([]);
    const [payments, setPayments] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const storedClients = await storageService.getDocs('clientes');
                const storedPayments = await storageService.getDocs('pagamentos');

                // Ordenar pagamentos do mais recente pro mais antigo
                storedPayments.sort((a, b) => new Date(b.data) - new Date(a.data));

                setClients(storedClients);
                setPayments(storedPayments);
            } catch (err) {
                console.error('Erro ao carregar dados do admin', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getClientTotal = (clientId) => {
        return payments
            .filter(p => p.clienteId === clientId)
            .reduce((acc, curr) => acc + (curr.valor || 0), 0);
    };

    const openClientDetails = (client) => {
        setSelectedClient(client);
    };

    const openClientDetailsById = (clientId) => {
        if (!clientId) return;
        const client = clients.find(c => c.id === clientId);
        if (client) openClientDetails(client);
    };

    const getClientName = (clientId, isAnonymous) => {
        if (isAnonymous) return 'Anônimo';
        const client = clients.find(c => c.id === clientId);
        return client ? client.nome : 'Desconhecido';
    };

    const getClientPhone = (clientId, isAnonymous) => {
        if (isAnonymous) return '-';
        const client = clients.find(c => c.id === clientId);
        return client ? client.celular : '-';
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

    // Soma total de todas as operações listadas (futuramente filtradas por data)
    const totalOperacoes = payments.reduce((acc, p) => acc + (p.valor || 0), 0);

    return (
        <div className={styles.adminContainer}>

            {/* Menu Lateral */}
            <aside className={styles.sidebar}>
                <div className={styles.logo}>
                    <h1>Igreja App</h1>
                    <span>Administração</span>
                </div>
                <nav>
                    <button
                        className={activeTab === 'fieis' ? styles.active : ''}
                        onClick={() => setActiveTab('fieis')}
                    >
                        📋 Fiéis
                    </button>
                    <button
                        className={activeTab === 'operacoes' ? styles.active : ''}
                        onClick={() => setActiveTab('operacoes')}
                    >
                        💰 Operações
                    </button>
                </nav>

                <div className={styles.backTotem}>
                    <button onClick={() => navigate('/')}>
                        Voltar ao Totem
                    </button>
                </div>
            </aside>

            {/* Área Principal */}
            <main className={styles.mainContent}>
                {loading ? (
                    <p>Carregando dados...</p>
                ) : (
                    <>
                        {activeTab === 'fieis' && (
                            <>
                                <h2>Lista de Fiéis</h2>
                                <div className={styles.tableContainer}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Celular</th>
                                                <th>E-mail</th>
                                                <th>Total Contribuído</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {clients.length === 0 ? (
                                                <tr><td colSpan="5" style={{ textAlign: 'center' }}>Nenhum fiel cadastrado.</td></tr>
                                            ) : (
                                                clients.map(client => (
                                                    <tr key={client.id}>
                                                        <td><strong>{client.nome}</strong></td>
                                                        <td>{client.celular || '-'}</td>
                                                        <td>{client.email || '-'}</td>
                                                        <td style={{ fontWeight: 'bold', color: '#2f855a' }}>
                                                            R$ {getClientTotal(client.id).toFixed(2)}
                                                        </td>
                                                        <td>
                                                            <button
                                                                className={styles.actionBtn}
                                                                onClick={() => openClientDetails(client)}
                                                            >
                                                                Detalhes
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}

                        {activeTab === 'operacoes' && (
                            <>
                                <h2>Todas as Operações</h2>
                                <div className={styles.tableContainer}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Nome do Fiel</th>
                                                <th>Tipo da Operação</th>
                                                <th>Valor Reais</th>
                                                <th>Celular / Contato</th>
                                                <th>Data</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payments.length === 0 ? (
                                                <tr><td colSpan="5" style={{ textAlign: 'center' }}>Nenhuma operação registrada.</td></tr>
                                            ) : (
                                                payments.map(pagamento => (
                                                    <tr key={pagamento.id}>
                                                        <td>
                                                            {pagamento.isAnonymous ? (
                                                                <span>Anônimo</span>
                                                            ) : (
                                                                <button
                                                                    className={`${styles.actionBtn} ${styles.link}`}
                                                                    onClick={() => openClientDetailsById(pagamento.clienteId)}
                                                                >
                                                                    {getClientName(pagamento.clienteId, pagamento.isAnonymous)}
                                                                </button>
                                                            )}
                                                        </td>
                                                        <td>{getTypeName(pagamento.tipo)}</td>
                                                        <td style={{ fontWeight: 'bold', color: '#2f855a' }}>
                                                            R$ {parseFloat(pagamento.valor || 0).toFixed(2)}
                                                        </td>
                                                        <td>{getClientPhone(pagamento.clienteId, pagamento.isAnonymous)}</td>
                                                        <td>{new Date(pagamento.data).toLocaleDateString('pt-BR')}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>

                                    <div className={styles.footerTotal}>
                                        Soma Total de Entradas: <span>R$ {totalOperacoes.toFixed(2)}</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </main>

            {/* Modal / Popup de Detalhes do Fiel */}
            {selectedClient && (
                <ClientDetailsModal
                    client={selectedClient}
                    payments={payments}
                    onClose={() => setSelectedClient(null)}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
