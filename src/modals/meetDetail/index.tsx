import { useNavigation } from "@react-navigation/native";
import { format, parseISO } from "date-fns";
import React, { useContext, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { IMeet } from "../../interfaces";
import { api } from "../../services/api";

interface IProps {
    modalIsOpen: boolean;
    setModalVisible(value: boolean): void;
    meet: IMeet;
}

const MeetDetailModal: React.FC<IProps> = ({ modalIsOpen, setModalVisible, meet }) => {

  const { user } = useContext(AuthContext);

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

  async function handleSubscribe(userId:number) {
    try {
      const data = {
        aluno_id: userId,
        encontro_id: meet.id
      }
      const res = await api.post('encontros/add/aluno', data)
      alert(res.data.message)
      setModalVisible(false)
    } catch (error: any) {
      alert(error.response.data.message);
    }
  }

  async function handleDelete(meetId:number) {
    if (meet?.alunos?.length) {
      alert('Encontro possui alunos.')
      return;
    }

    try {
      const res = await api.delete(`encontros/excluir/${meetId}`)
      alert(res.data.message);
      setModalVisible(false);
    } catch (error) {
      alert('Falha ao remover encontro.')
    }
  }

  async function handleEdit(meetId:number) {
    navigate.navigate('Editar Encontro' as never, { meetId } as never)
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
            <Text style={styles.modalText}>Assunto: { meet?.assunto?.nome }</Text>
            <Text style={styles.modalText}>Data do Encontro: { meet.data }</Text>
            <Text style={styles.modalText}>Dificuldade: { formatDifficulty(meet?.assunto?.grau_dificuldade) }</Text>
            <Text style={styles.modalText}>Duração do Encontro: { meet?.assunto?.tempo_necessario } Horas</Text>
            <Text style={styles.modalText}>Alunos no encontro: { meet?.alunos?.length}</Text>
            <View style={styles.buttonsContainer}>

                <TouchableOpacity style={[styles.button, styles.buttonSubscribe]} >
                <Text style={styles.textStyle} onPress={() => handleSubscribe(user? user.id : 0)}>Inscrever-se</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.buttonEdit]} >
                <Text style={styles.textStyle} onPress={() => handleEdit(meet? meet.id : 0)}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.buttonRemove]} >
                <Text style={styles.textStyle} onPress={() => handleDelete(meet.id)}>Excluir</Text>
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

export default MeetDetailModal;