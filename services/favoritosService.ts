import * as SecureStore from 'expo-secure-store'

const tokenFavoritas = "palavrasFavoritas"

export const getFavoritos = async (): Promise<string[]> => {
    try {
        const favoritos = await SecureStore.getItemAsync(tokenFavoritas);
        return favoritos ? JSON.parse(favoritos) : [];
    } catch (erro) {
        console.error("Erro ao buscas suas palavras favoritas:", erro)
        return [];
    }
};

export const adicionarFavorito = async (palavra: string) => {
    try {
        const favoritos = await getFavoritos();
        if (!favoritos.includes(palavra)) {
            favoritos.push(palavra);
            await SecureStore.setItemAsync(tokenFavoritas, JSON.stringify(favoritos));
        }
    } catch (erro) {
        console.error("Erro ao adicionar aos favoritos:", erro)
    }
};

export const removerFavoritos = async (palavra: string) => {
    try {
        const favoritos = await getFavoritos();
        const novosFavoritos = favoritos.filter((item) => item !== palavra);
        await SecureStore.setItemAsync(tokenFavoritas, JSON.stringify(novosFavoritos))
    } catch (erro) {
        console.error("Erro ao remover palavra dos favoritos:", erro)
    }
}