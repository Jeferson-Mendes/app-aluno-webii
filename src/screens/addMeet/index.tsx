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
import { format, formatISO, setDate } from 'date-fns';
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

const AddMeet:React.FC = () => {
    const [dateState, setDateState] = React.useState('');
    const [matters, setMatters] = React.useState<IMatters[]>([]);
    const [matter, setMatter] = React.useState<number>(0);
    const [hours, setHours] = React.useState<number>(0);
    const [level, setLevel] = React.useState<number>(0)

    const navigate = useNavigation()

    React.useEffect(() => {
        async function getMatters() {
            const matters = await api.get('/assuntos')
            setMatters(matters.data.assuntos);
        }

        getMatters();
    },[])

    const handleChangeDate = (date: string) => {
        const dateValue = normalizeDate(date)
        if (dateValue.value === '') {
            setDateState('')
        }
        if(date) {
            setDateState(dateValue.value);
        }
      }

    

    const handleChangeMatter = async (matter: number) => {
        if (matter !== null) {
            try {
                const res = await api.get(`assuntos/${matter}`);
                setHours(res.data.assunto.tempo_necessario);
                setLevel(res.data.assunto.grau_dificuldade);
                setMatter(res.data.assunto.id)
            } catch (error: any) {
                alert(error.response.data.message);
                return;
            }
        }
    }

    const handleCreateMeet = async () => {
        const formatedDate = `${dateState.split('/')[2]}-${dateState.split('/')[1]}-${dateState.split('/')[0]}`;

        try {
            const meetData = {
                data: formatedDate,
                assunto_id: matter,
            } 
            const res = await api.post('encontros', meetData);
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
              <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Crie seu Encontro</Text>
              <View style={styles.formContainer}>
              <RNPickerSelect
                    placeholder={ { label:"Selecione um assunto", value: null } }
                    onValueChange={(value) => handleChangeMatter(value)}
                    items={
                        matters.map(matter => ({
                        label: matter.nome, 
                        value: matter.id }
                    ))                        
                    }
                />
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Dificuldade</Text>
                <TextInput style={styles.inputText} value={ formatDifficulty(level) } disableFullscreenUI/>

                <Text style={{ fontSize: 17, fontWeight: 'bold' }} >Tempo Necessário</Text>
                <TextInput style={styles.inputText} value={`${hours} Horas`} disableFullscreenUI/>

                <Text style={{ fontSize: 17, fontWeight: 'bold' }} >Data do Encontro</Text>
                {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
                <TextInput style={styles.inputText02} keyboardType={'numeric'} onChangeText={(date) => handleChangeDate(date)} value={dateState} placeholder='10/10/2022' maxLength={10} disableFullscreenUI/>
              </View>
              <View style={styles.buttonContainer}>
                  <Button color={'#959595'} title='Cancelar' onPress={() => navigate.goBack()}/>
                  <Button color={'#23A817'} title='Salvar' onPress={handleCreateMeet}/>
              </View>
          </View>
        </View>
    )
}

export default AddMeet;

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
        backgroundColor: 'gray',
        height: 40,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 2,
        padding: 7
    },

    inputText02: {
        // backgroundColor: 'green',
        height: 40,
        marginTop: 10,
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