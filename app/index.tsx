import { Box } from "@/components/ui/box";
import Cabecalho from "@/components/Cabecalho";
import { Text } from "@/components/ui/text";
import {  Alert, FlatList, TouchableOpacity} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import { getPalavras } from "@/services/palavrasService";
import ModalPalavra from "../components/ModalPalavra"
import { adicionarFavorito } from "@/services/favoritosService";




export default function Lista() {

  const [palavras, setPalavras] = useState<string[]>([]);
  const [palavrasVistas, setPalavrasVistas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true); 
  const [loadingPagina, setLoadingPagina] = useState(false);
  const [pagina, setPagina] = useState(1)
  const palavrasPorPagina = 100

  useEffect(() => {
    const carregarPrimeiraPagina = async () => {
      try {
        const resposta = await axios.get("https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json")

        const todasAsPalavras = Object.keys(resposta.data);
        setPalavrasVistas(todasAsPalavras.slice(0, palavrasPorPagina))
        setLoading(false);
      } catch (erro) {
        console.error("Erro ao buscar as palavras:", erro);
        setLoading(false)
      } 
    }

    carregarPrimeiraPagina()
  }, []);

  const carregarMaisPalavras = async () => {
    if (loadingPagina) return;
    setLoadingPagina(true)

    try {
      const resposta = await axios.get(
        "https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json"
      );

      const todasAsPalavras = Object.keys(resposta.data);
      const inicio = pagina * palavrasPorPagina;
      const final = inicio + palavrasPorPagina;

      setPalavrasVistas((palavrasAnteriores) => [
        ...palavrasAnteriores,
        ...todasAsPalavras.slice(inicio, final),
      ]);
      setPagina((paginaAnterior) => paginaAnterior + 1);
    } catch (erro) {
      console.error("Erro ao carregar mais palavras:", erro)
    }

    setLoadingPagina(false)
  }

  const [palavraData, setPalavraData] = useState<any>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [palavraSelecionada, setPalavraSelecionada] = useState<string | null>(null);

  const Definicao = async (palavra: string) => {
    try {
      const resposta = await getPalavras(palavra)
      
      
      setPalavraData(resposta)
      setModalAberto(true)
    } catch (erro) {
      console.error("Erro ao renderizar a definicao da palavra:", erro)
    }
  }
  const apertarPalavra = (palavra: string) => {
    setPalavraSelecionada(palavra);
    Definicao(palavra);
  }

  const salvarNosFavoritos = async (palavra: string) => {
      await adicionarFavorito(palavra);
      Alert.alert(
                      "Palavra favoritada com sucesso!", 
                      "Conferir na página de favoritos", 
                      [
                        { text: "OK", onPress: () => console.log("OK Pressed") },
                      ]
                    );
  }


  return (
    <Box style={{flex: 1,
      padding: 20,
      backgroundColor: "#fff",}}>
      <Cabecalho texto="Lista de Palavras" />


      {loading ? (
        <Box
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text>Carregando palavras...</Text>
          <Spinner />
        </Box>
      ) : (
        <FlatList
          data={palavrasVistas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => apertarPalavra(item)}
              style={{
                flex: 1,
                backgroundColor: "#f0f0f0",
                margin: 5,
                padding: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#ccc",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>{item}</Text>
            </TouchableOpacity>
          )}
          numColumns={3} 
          contentContainerStyle={{ padding: 10 }}
          onEndReached={carregarMaisPalavras} 
          onEndReachedThreshold={0.5} 
          ListFooterComponent={
            loadingPagina ? (
              <Box
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              >
                <Spinner />
                <Text>Carregando mais palavras...</Text>
              </Box>
            ) : null
          }
          initialNumToRender={20} 
          maxToRenderPerBatch={10} 
          windowSize={5} 
        />
      )}
      <ModalPalavra
      isOpen={modalAberto}
      onClose={() => setModalAberto(false)}
      palavraData={palavraData}
      salvarFavoritos={salvarNosFavoritos}
      >
      </ModalPalavra>
    </Box>
  );
}
