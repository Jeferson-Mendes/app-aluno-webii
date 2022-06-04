// import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { IUser } from "../interfaces";
import { api } from '../services/api';

interface ISignInRequest {
    email: string;
    password: string;
}

interface ISignInResponse {
    user: IUser;
    token: string;
}

interface IAuthContextData {
    signed: boolean;
    user: IUser | null;
    loading: boolean;
    signIn({email, password}:ISignInRequest): Promise<ISignInResponse>;
    handleGoogleLogin(user: IUser, token: string): Promise<void>;
    signOut(): void;
    updateUserContext(newUser: IUser): any;
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider:React.FC = ({ children }) => {

    const [user, setUser] = React.useState<IUser | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {

        async function loadStorageData() {
            const storagedUser = await AsyncStorage.getItem('@Auth:user');
            const storagedToken = await AsyncStorage.getItem('@Auth:token');

            if(storagedUser && storagedToken) {
                const userData: any = {
                    user: JSON.parse(storagedUser),
                }
                setUser(userData.user);
                api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
            }
            setLoading(false)
        }

        loadStorageData();
        // checkJwtTokenIvalid();
    }, [])

    async function signIn({ email, password }: ISignInRequest): Promise<any> {
        try {
            const response = await api.post('alunos/login', { email, senha: password });

            setUser(response.data.aluno);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            await AsyncStorage.setItem('@Auth:user', JSON.stringify(response.data.aluno));
            await AsyncStorage.setItem('@Auth:token', response.data.token);

            return

        } catch (error: any) {
            alert(error.response.data.message);
            return;
        }
    }

    async function handleGoogleLogin(user: IUser, token: string): Promise<void> {
        setUser(user);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('Auth:user', JSON.stringify(user));
        localStorage.setItem('Auth:token', token);
    }

    async function signOut() {
        await AsyncStorage.clear();
        setUser(null);
    }

    function updateUserContext(newUser: IUser): any {
        setUser(newUser);
        localStorage.removeItem('Auth:user')
        localStorage.setItem('Auth:user', JSON.stringify(newUser));

        return;
    }

    if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#666" />
          </View>
        );
      }

    return (
        <AuthContext.Provider value={ { signed: !!user, user, signIn, signOut, loading, handleGoogleLogin, updateUserContext } }>
            { children }
        </AuthContext.Provider>
    )
}