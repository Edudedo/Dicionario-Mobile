import * as SecureStore from 'expo-secure-store'

const tokenHistorico = "palavrasVistas"

export const getHistorico = async (): Promise<string[]> => {
    try {
        const historico = await SecureStore.getItemAsync(tokenHistorico);
        return historico ? JSON.parse(historico) : [];
    } catch (erro) {
        console.error("Erro ao buscar histórico:", erro);
        return [];
    }
};

export const adicionarHistorico = async (palavra: string) => {
    try {
        const historico = await getHistorico();
        if (!historico.includes(palavra)) {
            historico.unshift(palavra);
            await SecureStore.setItemAsync(tokenHistorico, JSON.stringify(historico))
        }
    } catch (erro) {
        console.error("Erro ao adicionar palavra no histórico:", erro)
    }
}

export const limparHistorico = async () => {
    try {
        await SecureStore.deleteItemAsync(tokenHistorico);
    } catch (erro) {
        console.error("Erro ao limpar o historico:", erro)
    }
}