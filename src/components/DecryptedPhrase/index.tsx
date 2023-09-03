import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type Props = {
  phrase: string;
  onCheckPhrase: (phrase: string) => void;
};

export function DecryptedPhrase({ phrase, onCheckPhrase }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.phrase}>{phrase}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onCheckPhrase(phrase)}
      >
        <Text style={styles.buttonText}>ok</Text>
      </TouchableOpacity>
    </View>
  );
}
