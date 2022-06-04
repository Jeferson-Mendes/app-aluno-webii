import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type BottomStackParamList = {
  Main: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  Tickets: undefined;
  RevendaOficial: undefined;
  RecoverPassword: undefined;
  NewPassword: undefined;
  ConfigAccount: undefined;
  SearchScreen: undefined;
  NotificationScreen: undefined;
};

export type AuthStackParamList = {
  Main: undefined;
  SignIn: undefined;
  SignUp: undefined;
  RecoverPassword: undefined;
  NewPassword: undefined;
  ConfigAccount: undefined;
  // remover depois da integração
  Home: undefined;
};

export type RootStackScreenProps<T extends keyof BottomStackParamList> =
  NativeStackScreenProps<BottomStackParamList, T>;

declare global {
  // namespace ReactNavigation {
  //   type RootParamList = BottomStackParamList;
  // }
}