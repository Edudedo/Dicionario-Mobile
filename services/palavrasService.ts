import axios from "axios";
import { Alert } from "react-native";
import * as SecureStore from 'expo-secure-store'

const tokenPalavras = "palavrasCache"

export const getPalavras = async (palavra: string) => {
    try {

        const cache = await getCache();
        
        if (cache[palavra]) {
            console.log(`Cache encontrado para a palavra: ${palavra}`);
            return cache[palavra]
        }

        const resposta = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${palavra}`)

        cache[palavra] = resposta.data;
        await SecureStore.setItemAsync(tokenPalavras, JSON.stringify(cache));
        return resposta.data

    } catch (erro: any) {
        if (erro.status === 404) {
            Alert.alert(
                "Erro na API",
                "Palavra não existente no banco de dados da Free Dictionary API",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                ]
            );
        }
        console.error("Erro ao pegar definição da palavra:", erro.status)
    }
}

const getCache = async (): Promise<Record<string, any>> => {
    try {
      const cache = await SecureStore.getItemAsync(tokenPalavras);
      return cache ? JSON.parse(cache) : {};
    } catch (erro) {
      console.error("Erro ao buscar o cache:", erro);
      return {};
    }
  };
