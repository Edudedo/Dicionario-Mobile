import { VStack } from "./vstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { Link } from "expo-router";
import {  ScrollView, View } from "react-native";


export default function Cabecalho() {
    return (
        <VStack>
        <HStack space= "4xl">
      <Link href="/" asChild>
      <Button size="xl" style={{ borderRadius: 15, width: "25%", marginLeft: 5, backgroundColor: "#215376" }}>
        <ButtonText>
          Lista
        </ButtonText>
      </Button>
      </Link>
      <Link href="/historico" asChild>
      <Button size="xl" style={{borderRadius: 15, width: "30%", backgroundColor: "#215376"}}>
        <ButtonText>
          Histórico
        </ButtonText>
      </Button>
      </Link>
      <Link href="/favoritos" asChild>
      <Button size="xl" style={{borderRadius: 15, width: "30%", backgroundColor: "#215376"}}>
        <ButtonText>
          Favoritos
        </ButtonText>
      </Button>
      </Link>
    </HStack>
    
    <Text className="text-[#215376] text-4xl text-center mt-6" >Lista de Palavras</Text>
    </VStack>
    )
}