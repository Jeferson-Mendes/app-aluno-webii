import { useNavigation } from "@react-navigation/native";
import { format, parseISO } from "date-fns";
import React, { useContext, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { ISubject } from "../../interfaces";
import { api } from "../../services/api";

interface IProps {
    modalIsOpen: boolean;
    setModalVisible(value: boolean): void;
    matter: ISubject;
}

const MatterDetailModal: React.FC<IProps> = ({ modalIsOpen, setModalVisible, matter }) => {
  const navigate = useNavigation();

  const formatDifficulty = (difficulty?: number):string => {
      switch (difficulty) {
          case 1:
              return 'Muito Fácil'
          case 2:
              return 'Fácil'
          case 3:
              return 'Normal'
          case 4:
              return 'Difícil'
          case 5:
              return 'Muito Difícil'
              
          default:
              return 'Muito Difícil'
      }
  }

  async function handleDelete(matterId:number) {
    try {
      const res = await api.delete(`assuntos/excluir/${matterId}`)
      alert(res.data.message);
      setModalVisible(false);
    } catch (error) {
      alert('Falha ao remover assunto.')
    }
  }

  async function handleEdit(matterId:number) {
    
      try {
          const res = await api.get(`assuntos/${matterId}`);
          setModalVisible(false)
          navigate.navigate('Editar Assunto' as never, { currentMatter: res.data.assunto } as never)
      } catch (error) {
          alert('Falha ao buscar assunto.')
      }

  }

  return (
    // <View style={styles.centeredView}>
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalIsOpen}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalIsOpen);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Assunto: { matter.nome }</Text>
            <Text style={styles.modalText}>Dificuldade: { formatDifficulty(matter.grau_dificuldade) }</Text>
            <Text style={styles.modalText}>Tempo Necessário: { matter.tempo_necessario } Horas</Text>
            <View style={styles.buttonsContainer}>

                <TouchableOpacity style={[styles.button, styles.buttonEdit]} >
                <Text style={styles.textStyle} onPress={() => handleEdit(matter? matter.id : 0)}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.buttonRemove]} >
                <Text style={styles.textStyle} onPress={() => handleDelete(matter.id)}>Excluir</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalIsOpen)}
                >
                    <Text style={styles.textStyle}>Sair</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
    // </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "#31475E",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonsContainer: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: 'red',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
    width: 170,
    height: 40,
  },
  buttonClose: {
    backgroundColor: "#959595",
  },
  buttonSubscribe: {
    backgroundColor: "#23A817",
  },

  buttonEdit: {
    backgroundColor: "#8CC0DE",
  },

  buttonRemove: {
    backgroundColor: "#F32424",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: 'white'
  }
});

export default MatterDetailModal;