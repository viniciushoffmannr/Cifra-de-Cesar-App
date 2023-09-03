import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { DecryptedPhrase } from "../../components/DecryptedPhrase";
import { useState } from "react";

export default function Home() {
  const [decryptedPhrases, setDecryptedPhrases] = useState<string[]>([]);
  const [encryptedPhrase, setEncryptedPhrase] = useState("");
  const [key, setKey] = useState(1);

  const handleParticipantAdd = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    console.log("############");

    const phraseInCapital = encryptedPhrase.toUpperCase();

    let messageDecrypted = "";

    for (let i = 0; i < phraseInCapital.length; i++) {
      const char = phraseInCapital[i];

      if (alphabet.includes(char)) {
        const index = alphabet.indexOf(char);

        const newIndex = (index - key + alphabet.length) % alphabet.length;

        console.log(
          index - key + alphabet.length,
          (index - key + alphabet.length) % alphabet.length
        );

        messageDecrypted += alphabet[newIndex];
      } else {
        messageDecrypted += char;
      }
    }

    setKey(key + 1);

    setDecryptedPhrases((prevState) => [
      ...prevState,
      messageDecrypted.toLowerCase(),
    ]);
  };

  const handleCheckPhrase = (position: number) => {
    Alert.alert(
      "Validação",
      `A frase ${
        decryptedPhrases[position]
      } foi a que mais fez sentido, utilizando a chave ${position + 1}.`,
      [
        {
          text: "Ok",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cifra De César</Text>

      <Text style={styles.subTitle}>Insira a frase a ser descriptografada</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Frase a ser descriptografada"
          placeholderTextColor="#6B6B6B"
          value={encryptedPhrase}
          onChangeText={setEncryptedPhrase}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>Descriptografar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={decryptedPhrases}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <DecryptedPhrase
            phrase={item}
            onCheckPhrase={() => handleCheckPhrase(index)}
            key={item}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ainda não foi realizado nenhuma descriptografia.
          </Text>
        )}
      />
    </View>
  );
}
