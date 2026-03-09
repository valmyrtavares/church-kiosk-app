/* 
 * Service temporário para simular o Firestore localmente (MVP)
 * Substituirá a importação do firebase.js quando o app for conectado ao backend real.
 */

// import { db } from '../config/firebase'; // Firestore real (comentado p/ MVP)

const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

const getCollection = (collectionName) => {
    const data = localStorage.getItem(collectionName);
    return data ? JSON.parse(data) : [];
};

const saveCollection = (collectionName, data) => {
    localStorage.setItem(collectionName, JSON.stringify(data));
};

export const storageService = {
    // Simulando adição de documento
    async addDoc(collectionName, payload) {
        await simulateDelay();

        // Simular o Firebase addDoc que gera um ID único
        const newDoc = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            ...payload
        };

        const collection = getCollection(collectionName);
        collection.push(newDoc);
        saveCollection(collectionName, collection);

        return newDoc;
    },

    // Simulando busca de todos documentos
    async getDocs(collectionName) {
        await simulateDelay();
        return getCollection(collectionName);
    },

    // Simulando busca do documento por ID
    async getDoc(collectionName, id) {
        await simulateDelay();
        const collection = getCollection(collectionName);
        return collection.find(doc => doc.id === id) || null;
    }
};
