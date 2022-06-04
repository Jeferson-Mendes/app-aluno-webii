import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api-alunos-webii.herokuapp.com'
})