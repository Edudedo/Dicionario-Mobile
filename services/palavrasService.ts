import axios from "axios";
import { Alert } from "react-native";

export const getPalavras = async (palavra: string) => {
    try {
        const resposta = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${palavra}`)
        
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

