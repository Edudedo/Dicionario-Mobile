import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Button, ButtonText } from './ui/button';
import { Text } from './ui/text';
import { ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Audio } from "expo-av";


interface ModalPalavraProps {
  isOpen: boolean;
  onClose: () => void;
  palavraData: any[];
  salvarFavoritos: (palavra: string) => void;
}

export default function ModalPalavra({
  isOpen,
  onClose,
  palavraData,
  salvarFavoritos,
}: ModalPalavraProps) {
  if (!palavraData || palavraData.length === 0) {
    return null;
  }

  const [audio, setAudio] = useState<Audio.Sound | null>(null);
  const [tocando, setTocando] = useState(false)

  const tocarAudio = async (audioUrl: string) => {
    try {
      if (audio) {
        await audio.stopAsync();
        await audio.unloadAsync();
        setAudio(null);
        setTocando(false)
      }

      const { sound: newSound } = await Audio.Sound.createAsync({ uri: audioUrl });
      setAudio(newSound);
      setTocando(true)

      await newSound.playAsync();

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setTocando(false);
          setAudio(null)
        }
      });
    } catch (erro) {
      console.error("Erro ao tocar áudio:", erro)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent style={{
        maxHeight: "70%",
        width: "90%",
        borderRadius: 10,
        padding: 10,
        alignSelf: "center"
      }}>
        <ModalHeader>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {palavraData[0].word}
          </Text>
          <ModalCloseButton onPress={onClose} />
        </ModalHeader>
        <ModalBody>
          <ScrollView>
            {palavraData.map((entry: any, index: number) => (
              <React.Fragment key={index}>

                {entry.phonetics && entry.phonetics.length > 0 && (
                  <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                    Phonetic:
                  </Text>
                )}
                {entry.phonetics.map((phonetic: any, i: number) => (
                  <Text key={i}>
                    {phonetic.text}{" "}
                    {phonetic.audio ? (
                      <Button
                        style={{
                          backgroundColor: "#215376",
                          width: "30%",
                          height: 30,
                          marginLeft: 10,
                        }}
                        onPress={() => tocarAudio(phonetic.audio)}
                      >
                        <ButtonText>{tocando ? "Tocando" : "Tocar"}</ButtonText>
                      </Button>
                    ) : null}
                  </Text>
                ))}


                <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                  Meanings:
                </Text>
                {entry.meanings.map((meaning: any, meaningIndex: number) => (
                  <Text key={meaningIndex} style={{ marginTop: 5 }}>
                    <Text style={{ fontStyle: "italic" }}>
                      {meaning.partOfSpeech}:
                    </Text>{" "}
                    {meaning.definitions.map(
                      (definition: any, defIndex: number) => (
                        <Text key={defIndex}>
                          {definition.definition}
                          {definition.example ? (
                            <Text style={{ fontStyle: "italic" }}>
                              {" "}
                              (e.g., {definition.example})
                            </Text>
                          ) : null}
                        </Text>
                      )
                    )}
                  </Text>
                ))}
              </React.Fragment>
            ))}
          </ScrollView>
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => salvarFavoritos(palavraData[0].word)}>
            <ButtonText>Salvar como Favorito</ButtonText>
          </Button>
          <Button onPress={onClose} style={{ marginLeft: 10 }}>
            <ButtonText>Voltar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}