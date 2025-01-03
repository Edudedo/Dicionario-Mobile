import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Button, ButtonText } from './ui/button';
import { Text } from './ui/text';
import { ScrollView } from 'react-native';
import React from 'react';

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent style={{
        maxHeight: "70%",
        width: "90%",
        borderRadius: 10,
        padding: 10,
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
                      <Text
                        style={{ color: "blue" }}
                        onPress={() => {

                          console.log("Reproduzir áudio:", phonetic.audio);
                        }}
                      >
                        🔊
                      </Text>
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