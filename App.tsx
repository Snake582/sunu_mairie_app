import { useEffect, useState } from "react";
import { Text } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (isConnected === false) {
    return (
      <Text style={{ textAlign: "center", marginTop: 100 }}>
        Pas de connexion Internet
      </Text>
    );
  }

  return <AppNavigator />;
}