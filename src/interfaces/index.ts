export interface IUser {
    id: number;
    nome: string;
    curso: string;
    email: string;
    semestre: number;
}

export interface IMeet {
    id: number;
    data: Date;
    assunto_id: string;
    assunto?: ISubject;
    alunos?: IUser[];
}

export interface ISubject {
    id: number;
    nome: string;
    grau_dificuldade: number;
    tempo_necessario: number;
}