import axios from "axios";

export const getPalavras = async (palavra: string) => {
    try {
        const resposta = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${palavra}`)

        return resposta.data
    } catch (erro) {
        console.error("Erro ao pegar definição da palavra:", erro)
    }
} 

