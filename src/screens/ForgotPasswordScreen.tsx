import { useState } from "react";
import { TextInput, View } from "react-native";

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState("");
    return(
        <View>
            <TextInput
            placeholder="Votre email"
            value="email"
            onChangeText={setEmail}
            >
            </TextInput>
        </View>
    );
}