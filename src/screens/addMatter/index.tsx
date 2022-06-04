import React, { useContext } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    Button} from "react-native"

import RNPickerSelect from "react-native-picker-select";
import { useNavigation, useRoute } from '@react-navigation/native';
import { format, formatISO } from 'date-fns';
import { api } from '../../services/api';
import MeetDetailModal from '../../modals/meetDetail';
import { getHourDay } from '../../utils/getHourDay';
import { AuthContext } from '../../contexts/auth';
import { normalizeDate } from '../../utils/formatDate';
import { formatDifficulty } from '../../utils/formatLevel';

interface Params {
    user: string;
    password: string;
  }

interface IMeet {
    assunto_id: string;
    data: Date;
    id: number;
    nome: string;
}

interface IMatters {
    id: number,
    nome: string,
    grau_dificuldade: number,
    tempo_necessario: number,
}

const AddMatter:React.FC = () => {
    const [matters, setMatters] = React.useState<IMatters[]>([]);
    const [matter, setMatter] = React.useState<string>('');
    const [hours, setHours] = React.useState<number>(0);
    const [level, setLevel] = React.useState<number>(0)

    const navigate = useNavigation()

    const handleCreateMatter = async () => {

        try {
            const matterData = {
                nome: matter,
                grau_dificuldade: level,
                tempo_necessario: hours,
            } 
            const res = await api.post('assuntos', matterData);
            alert(res.data.message);
            navigate.navigate('Home' as never);
        } catch (error: any) {
            alert(error.response.data.message);
            return;
        }
    }

    return (
        <View style={styles.container}>
          <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Crie um Assunto</Text>
              <View style={styles.formContainer}>

                <Text style={{ fontSize: 17, fontWeight: 'bold' }} >Assunto</Text>
                {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
                <TextInput style={styles.inputText} onChangeText={(value) => setMatter(value)} placeholder='Assunto'/>

                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Dificuldade</Text>
                {/* <TextInput style={styles.inputText02} value={ formatDifficulty(level) } disableFullscreenUI/> */}
                <RNPickerSelect
                    placeholder={ { label:"Selecione uma diiculdade", value: null } }
                    onValueChange={(value) => setLevel(value)}
                    items={[
                        { label: 'Muito Fácil', value: 1 },
                        { label: 'Fácil', value: 2 },
                        { label: 'Normal', value: 3 },
                        { label: 'Difícil', value: 4 },
                        { label: 'Muito Difícil', value: 5 }
                    ]}
                />

                <Text style={{ fontSize: 17, fontWeight: 'bold' }} >Tempo Necessário</Text>
                <TextInput style={styles.inputText02} placeholder="Horas" keyboardType='numeric' onChangeText={(value) => setHours(Number(value))}/>

              </View>
              <View style={styles.buttonContainer}>
                  <Button color={'#959595'} title='Cancelar' onPress={() => navigate.goBack()}/>
                  <Button color={'#23A817'} title='Salvar' onPress={handleCreateMatter}/>
              </View>
          </View>
        </View>
    )
}

export default AddMatter;

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        marginTop: 70
    },

    title: {
        fontWeight: 'bold',
    },

    formContainer: {
        width: '80%',
        textAlign: 'center',
        // backgroundColor: 'gray',
    },

    welcomeText: {
        fontSize: 20,
        // width: 300,
        // borderBottomWidth: 2,
        // borderBottomColor: 'gray',
    },

    inputText: {
        // backgroundColor: 'green',
        height: 40,
        marginTop: 7,
        marginBottom: 10,
        borderWidth: 2,
        padding: 7
    },

    inputText02: {
        // backgroundColor: 'green',
        width: 170,
        height: 40,
        marginTop: 7,
        marginBottom: 10,
        borderWidth: 2,
        padding: 7
    },

    buttonContainer: {
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        // padding: 7
        marginTop: 50
    }
})