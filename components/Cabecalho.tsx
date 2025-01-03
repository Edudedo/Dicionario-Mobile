import { VStack } from "./ui/vstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { Link, useRouter } from "expo-router";
import {  ScrollView, View } from "react-native";


interface TextoPersonalizado {
  texto: string
}

const Cabecalho: React.FC<TextoPersonalizado> = ({ texto }) => {

  const router = useRouter();

  const irFavoritos = () => {
    router.push("/favoritos")
  }
  const irLista = () => {
    router.push("/")
  }
  const irHistorico = () => {
    router.push("/historico")
  }
    return (
        <VStack>
        <HStack space= "xl" style={{justifyContent: "center"}}>

      <Button onPress={irLista} size="xl" style={{ borderRadius: 15, width: "33%", backgroundColor: "#215376" }}>
        <ButtonText>
          Lista
        </ButtonText>
      </Button>

      <Button onPress={irHistorico} size="xl" style={{borderRadius: 15, width: "33%", backgroundColor: "#215376"}}>
        <ButtonText>
          Histórico
        </ButtonText>
      </Button>
      
      
      <Button onPress={irFavoritos} size="xl" style={{borderRadius: 15, width: "33%", backgroundColor: "#215376"}}>
        <ButtonText>
          Favoritos
        </ButtonText>
      </Button>
      
    </HStack>
    
    <Text className="text-[#215376] text-4xl text-center mt-6" >{texto}</Text>
    </VStack>
    )
}

export default Cabecalho;