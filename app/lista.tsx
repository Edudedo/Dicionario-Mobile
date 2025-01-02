import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { Link } from "expo-router";
import {  View } from "react-native";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";


export default function Lista() {

  const toast = useToast
 
  return (
    <ScrollView>
    <HStack>
      <Link href="/lista" asChild>
      <Button>Lista</Button>
      </Link>
      <Link href="/historico" asChild>
      <Button>Histórico</Button>
      </Link>
      <Link href="/favoritos" asChild>
      <Button>Favoritos</Button>
      </Link>
    </HStack>
    </ScrollView>
  );
}
