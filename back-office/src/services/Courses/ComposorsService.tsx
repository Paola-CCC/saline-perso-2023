import { AxiosResponse } from "axios";
import AxiosClient from "../AxiosClient";
import { IComposers } from "../../models/Interfaces/composer";

const URL = 'http://localhost:1234';
const httpClient = AxiosClient;


const compositorsAll = async () => {
    try {
      const response : AxiosResponse<IComposers[]> = await httpClient.get(`${URL}/composer/all`);
      if (response.status >= 200 && response.status <= 299) {
        const compositors: IComposers[] = response.data;
        return compositors;
      } else {
        throw new Error(`Erreur de réponse de l'API, code : ${response?.status}`);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des cours :', error);
      throw error; 
    }
  };

//   const courseShowById = async (Id: number | string) => {
//     try {
//       const response = await httpClient.get(`${URL}/api/courses/${Id}`);
//       if (response.status >= 200 && response.status <= 299) {
//         return response.data;
//       } else {
//         console.log("error message ", response);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   const courseAdd = async (data: Object) => {
//     try {
//       const response = await httpClient.post(`${URL}/api/new-course`, data);
//       if (response.status >= 200 && response.status <= 299) {
//         return response.data;
//       } else {
//         console.log("error message ", response);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };


// // récuperer les documents par cours
// const courseEdit = async ( Id: number | string, data: Object) => {
//     try {
//       const response = await httpClient.put(`${URL}/courses/${Id}`,data);
  
//       if (response.status >= 200 && response.status <= 299) {
//         return response.data;
//       } else {
//         console.log("error message ", response);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   const courseDelete = async (Id: number | string) => {
//     try {
//       const response = await httpClient.delete(`${URL}/courses/${Id}`);
//       if (response.status >= 200 && response.status <= 299) {
//         return response;
//       } else {
//         console.log("error message ", response);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };


  export const compositorsService = {
    compositorsAll,
    
  };