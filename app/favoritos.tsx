import Cabecalho from "@/components/Cabecalho";
import { VStack } from "@/components/ui/vstack";
import { getFavoritos, removerFavoritos } from "@/services/favoritosService";
import { useEffect, useState } from "react";
import { Text } from "@/components/ui/text";
import { FlatList, TouchableOpacity, View } from "react-native";

export default function Favoritos() {

    const [favoritos, setFavoritos] = useState<string[]>([])

    const carregarPalavrasFavoritas = async () => {
        const palavras = await getFavoritos();
        setFavoritos(palavras)
    }

    const removerPalavra = async (palavra: string) => {
        await removerFavoritos(palavra);
        carregarPalavrasFavoritas();
    }

    useEffect(() => {
        carregarPalavrasFavoritas()
    }, [])
    return (
        <VStack style={{flex: 1,
            padding: 20,
            backgroundColor: "#fff",}}>
            <Cabecalho texto="Palavras favoritas"></Cabecalho>
      {favoritos.length === 0 ? (
        <Text className="text-4xl text-center mt-6" >Nenhuma palavra foi adicionada aos favoritos.</Text>
      ) : (
        <FlatList
          style={{marginLeft: 5}}          
          data={favoritos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View >
              <Text >{item}</Text>
              <TouchableOpacity
                onPress={() => removerPalavra(item)}
              >
                <Text >Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
        </VStack>
    )
}