import { AxiosResponse } from "axios";
import AxiosClient from "../AxiosClient";
import { ICourses } from "../../models/Interfaces/courses";

const URL = 'http://localhost:1234';
const httpClient = AxiosClient;

const courseAll = async () => {
  
  try {
    const response : AxiosResponse<ICourses[]> = await httpClient.get(`${URL}/courses`);
    if (response.status >= 200 && response.status <= 299) {
      const courses: ICourses[] = response.data;
      return courses;
    } else {
      throw new Error(`Erreur de réponse de l'API, code : ${response?.status}`);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des cours :', error);
    throw error; 
  }
};

const courseAdd = async (data: Object) => {
  try {
    const response = await httpClient.post(`${URL}/new-course`, data);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log("error message ", response);
    }
  } catch (error) {
    console.error(error);
  }
};

const courseSearching = async (data: Object) => {
  try {
    const response = await httpClient.post(`${URL}/courses/search`, data);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log("error message ", response);
    }
  } catch (error) {
    console.error(error);
  }
};

const courseShow = async (Id: number | string) => {
  try {
    const response = await httpClient.get(`${URL}/api/courses/${Id}`);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log("error message ", response);
    }
  } catch (error) {
    console.error(error);
  }
};

// récuperer les documents par cours
const courseEdit = async ( Id: number | string, data: Object) => {
  try {
    const response = await httpClient.put(`${URL}/courses/${Id}`,data);

    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log("error message ", response);
    }
  } catch (error) {
    console.error(error);
  }
};

// récuperer les documents par cours
const courseGetFiles = async (Id: number | string) => {
  try {
    const response = await httpClient.get(`${URL}/course/${Id}/fileuploads`);

    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      console.log("error message ", response);
    }
  } catch (error) {
    console.error(error);
  }
};

const courseDelete = async (Id: number | string) => {
  try {
    const response = await httpClient.delete(`${URL}/courses/${Id}`);
    if (response.status >= 200 && response.status <= 299) {
      return response;
    } else {
      console.log("error message ", response);
    }
  } catch (error) {
    console.error(error);
  }
};


export const courseService = {
  courseAll,
  courseDelete,
  courseEdit,
  courseSearching,
  courseShow,
  courseGetFiles,
  courseAdd
};