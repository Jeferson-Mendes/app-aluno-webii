import React, { useContext } from 'react';

import { View, Text, TextInput, Button, Image } from "react-native"
import { useNavigation } from '@react-navigation/native';

import { styles } from "./styles";
import Home from '../home';
import { api } from '../../services/api';
import { AuthContext } from '../../contexts/auth';

const Login:React.FC = () => {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const { signIn, signed } = useContext(AuthContext);

    const navigation = useNavigation();
    
    const handleLogin = async () => {
        await signIn({ email: email.toLocaleLowerCase(), password: password.toLocaleLowerCase() })
        
    }


    function handleNavigateToPoints(){
        navigation.navigate('Home' as never);
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/group-study.webp')}/>
            <Text style={styles.title}>Login</Text>
                <TextInput
                placeholder={'Email'}
                style={styles.input}
                textContentType="emailAddress"
                onChangeText={(email) => setEmail(email)}
                />
                <TextInput
                placeholder={'Senha'}
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(password) => setPassword(password)}
                />
                
                <Button
                title={'Entrar'}
                onPress={handleLogin}
                />
        </View>
    )
}

export default Login;
