import { AxiosResponse } from "axios";
import AxiosClient from "../AxiosClient";
import { IProfessors } from "../../models/Interfaces/professors";

const URL = 'http://localhost:1234';
const httpClient = AxiosClient;

const showAll = async () => {
    try {
        const response = await httpClient.get(`${URL}/api/users-all`);
        if (response.status >= 200 && response.status <= 299) {
            return response.data;
        } else {
            console.log("error message ", response);
        }
    } catch (error) {
        console.error(error);
    }
};

const showById = async (Id: number | string) => {
    try {
        const response = await httpClient.get(`${URL}/api/user/${Id}`);
        if (response.status >= 200 && response.status <= 299) {
            return response.data;
        } else {
            console.log("error message ", response);
        }
    } catch (error) {
        console.error(error);
    }
};

const showProfessorsList = async () => {
    try {
        const response: AxiosResponse<IProfessors[]> = await httpClient.get(`${URL}/professors`);
        if (response.status >= 200 && response.status <= 299) {
            const responses : IProfessors[] = response.data ;
            return responses;
        } else {
            console.log("error message ", response);
        }
    } catch (error) {
        console.error(error);
    }
};

const login = async (data: Object) => {
    try {
        const response = await httpClient.post(`${URL}/api/login_check`, data);
        if (response.status >= 200 && response.status <= 299) {
            return response.data;
        } else {
            console.log("error message ", response);
        }
    } catch (error) {
        console.error(error);
    }
};


const register = async (data: Object) => {
    try {
        const response = await httpClient.post(`${URL}/api/register`, data);
        if (response.status >= 200 && response.status <= 299) {
            return response.data;
        } else {
            console.log("error message ", response);
        }
    } catch (error) {
        console.error(error);
    }
};

const updateUser = async (Id: number | string, data: Object) => {
    try {
        const response = await httpClient.put(`${URL}/api/user/${Id}/edit`, data);
        if (response.status >= 200 && response.status <= 299) {
            return response.data;
        } else {
            console.log("error message ", response);
        }
    } catch (error) {
        console.error(error);
    }
};

const deleteUser = async (Id: number | string, data: Object) => {
    try {
        const response = await httpClient.put(`${URL}/api/user/${Id}/edit`, data);
        if (response.status >= 200 && response.status <= 299) {
            return response.data;
        } else {
            console.log("error message ", response);
        }
    } catch (error) {
        console.error(error);
    }
};

export const usersService = {
    login,
    register,
    showById,
    showProfessorsList,
    showAll,
    updateUser,
    deleteUser
};
