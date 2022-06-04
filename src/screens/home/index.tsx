import React, { useContext } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator} from "react-native"

import { useNavigation, useRoute } from '@react-navigation/native';
import { format, formatISO, parseISO } from 'date-fns';
import { api } from '../../services/api';
import MeetDetailModal from '../../modals/meetDetail';
import { getHourDay } from '../../utils/getHourDay';
import { AuthContext } from '../../contexts/auth';
import MatterDetailModal from '../../modals/matterDetail';
import { ISubject } from '../../interfaces';

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

const Home:React.FC = () => {
    const [meets, setMeets] = React.useState<IMeet[]>([]);
    const [matters, setMatters] = React.useState<IMatters[]>([]);
    const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false);
    const [matterModalIsOpen, setMatterModalIsOpen] = React.useState<boolean>(false);
    const [currentMeetId, setCurrentMeetId] = React.useState<number>(0);
    const [currentMatterId, setCurrentMatterId] = React.useState<number>(0);
    const [meetDetail, setMeetDetail] = React.useState<IMeet>({} as IMeet);
    const [matterDetail, setMatterDetail] = React.useState<ISubject>({} as ISubject);

    const { user, signOut } = useContext(AuthContext);

    
    const navigate = useNavigation()

    React.useEffect(() => {
        async function getMeets() {
            const meets = await api.get('/encontros');
            setMeets(meets.data.encontros);
        }

        async function getMatters() {
            const matters = await api.get('/assuntos')
            setMatters(matters.data.assuntos);
        }

        getMeets();
        getMatters();
    }, [])

    const handleMeetPress = async (meetId: number) => {
        setCurrentMeetId(meetId);
        setModalIsOpen(true)

        try {
            const response = await api.get(`/encontros/${meetId}`);
            setMeetDetail(response.data.encontro);
        } catch (error) {
            
        }
    }

    const handleMatterPress = async (matterId: number) => {
        // setCurrentMatterId(matterId);
        setMatterModalIsOpen(true)

        try {
            const response = await api.get(`/assuntos/${matterId}`);
            setMatterDetail(response.data.assunto);
        } catch (error) {
            
        }
    }

    function handleNavigateToAddMeet() {
        navigate.navigate('Criar Encontro' as never)
    }

    function handleNavigateToAddMatter() {
        navigate.navigate('Criar Assunto' as never)
    }

    return (
        <>
        <View style={styles.container}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}> { getHourDay() }, {user?.nome}.</Text>
                <Text style={styles.exitText} onPress={signOut}>Sair</Text>
            </View>
            { !!currentMeetId ? <MeetDetailModal modalIsOpen={modalIsOpen} setModalVisible={setModalIsOpen} meet={meetDetail}/> : <Text></Text>}
            <MatterDetailModal modalIsOpen={matterModalIsOpen} setModalVisible={setMatterModalIsOpen} matter={matterDetail}/>
            <View
            style={styles.headerScroll}
            >

            <ScrollView
            horizontal={true}
            >
                <TouchableOpacity style={styles.headerOptions} onPress={handleNavigateToAddMeet}>   
                    <Text style={styles.headerOptionsText}  >Criar Encontro</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.headerOptions} onPress={handleNavigateToAddMatter} >
                    <Text style={styles.headerOptionsText} >Criar Assunto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.headerOptions} onPress={() => alert('Em breve')}>
                    <Text style={styles.headerOptionsText}>Encontros Criados</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.headerOptions} onPress={() => alert('Em breve')}>
                    <Text style={styles.headerOptionsText}>Assuntos Criados</Text>
                </TouchableOpacity>

            </ScrollView>
            </View>
            <Text style={styles.meetTitle}>Alguns encontros para você</Text>
            <View>
                <ScrollView style={styles.meetingScroll}>
                    { !meets.length ? <ActivityIndicator style={{ marginTop: 20 }} size="large" color='#0000ff'/> : (
                        meets.map(meet => (
                            <TouchableOpacity
                            key={meet.id}
                            style={styles.meetingContainer}
                            onPress={() => handleMeetPress(meet.id)}
                            >
                                <Text style={styles.meetDate}> { meet.nome } - { format(parseISO((meet.data).toString()), 'dd/MM/YYY') }</Text>
                            </TouchableOpacity>
                        ))
                    ) }
                
                </ScrollView>
            </View>

            <Text style={styles.meetTitle}>Alguns assuntos para você</Text>
            <View>
                <ScrollView style={styles.meetingScroll}>
                    { !matters.length ? <ActivityIndicator size="large" color='#0000ff'/> : (
                        matters.map(matter => (
                            <TouchableOpacity
                            key={matter.id}
                            style={styles.meetingContainer}
                            onPress={() => handleMatterPress(matter.id)}
                            >
                                <Text style={styles.meetDate}>{ matter.nome }</Text>
                            </TouchableOpacity>
                        ))
                    ) }
                
                </ScrollView>
            </View>
        </View>
        </>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        // width: '100%',
    },

    welcomeContainer: {
        fle: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10
    },

    welcomeText: {
        fontSize: 20,
        // width: 300,
        // borderBottomWidth: 2,
        // borderBottomColor: 'gray',
    },

    exitText: {
        fontSize: 20,
        color: 'red'
    },

    text: {
        // backgroundColor: 'green',
        textAlign: "center"
    },

    headerScroll: {
        height: 140,
    },

    headerOptions: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: 120,
        height: 100,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#293462',
    },

    headerOptionsText: {
        color: '#F7F7F7',
        fontWeight: "bold",
        // backgroundColor: '#30475E',
    },

    meetingScroll: {
        backgroundColor: '#FAFAFA',
        height: 250,
    },
    
    meetTitle: {
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 20,
    },

    meetingContainer: {
        backgroundColor: '#30475E',
        margin: 10,
        padding: 20,
        borderRadius: 10
    },

    meetDate: {
        color: '#ffff',
    }
})