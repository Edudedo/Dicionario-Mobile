import Cabecalho from "@/components/Cabecalho";
import { VStack } from "@/components/ui/vstack";
import { getHistorico, limparHistorico } from "@/services/historicoService";
import { useEffect, useState } from "react";
import { Text } from "@/components/ui/text";
import { FlatList, TouchableOpacity, View } from "react-native";

export default function Historico() {

    const [historico, setHistorico] = useState<string[]>([]);

    const carregarHistorico = async () => {
        const palavras = await getHistorico();
        setHistorico(palavras);
    }

    const limpar = async () => {
        await limparHistorico();
        setHistorico([]);
    }

    useEffect(() => {
        carregarHistorico()
    }, [])
    return (
        <VStack style={{
            flex: 1,
            padding: 20,
            backgroundColor: "#fff",
        }}>
            <Cabecalho texto="Histórico"></Cabecalho>
            {historico.length === 0 ? (
                <Text className="text-4xl text-center mt-6" >Nenhuma palavra vizualizada.</Text>
            ) : (
                <FlatList
                    data={historico}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{
                            padding: 10,
                            marginVertical: 5,
                            backgroundColor: "#f9f9f9",
                            borderRadius: 5,
                        }}>
                            <Text style={{ fontSize: 16 }}>{item}</Text>
                        </View>
                    )}
                />
            )}
            <TouchableOpacity style={{
                backgroundColor: "#215376",
                padding: 10,
                marginTop: 20,
                borderRadius: 5,
                alignItems: "center"
            }} onPress={limpar}>
                <Text style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 16,
                }}>Limpar Histórico</Text>
            </TouchableOpacity>
        </VStack>
    )
}