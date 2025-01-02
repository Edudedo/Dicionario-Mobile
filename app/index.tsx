import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import {  View } from "react-native";


export default function Index() {

  const toast = useToast
 
  return (
    <View
    
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    > 
    <Text>Hello World!</Text>
    </View>
  );
}
