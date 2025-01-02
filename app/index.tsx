import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import Cabecalho from "@/components/Cabecalho";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { Link } from "expo-router";
import {  ScrollView, View } from "react-native";




export default function Lista() {

  const toast = useToast
 
  return (
    
    <ScrollView>
    <Cabecalho texto = "Lista de Palavras"></Cabecalho>
    
    </ScrollView>
  );
}
