import { AxiosResponse } from "axios";
import AxiosClient from "../AxiosClient";
import { IInstruments } from "../../models/Interfaces/instrument";

const URL = 'http://localhost:1234';
const httpClient = AxiosClient;


const instrumentAll = async () => {
    try {
      const response : AxiosResponse<IInstruments[]> = await httpClient.get(`${URL}/instruments`);
      if (response.status >= 200 && response.status <= 299) {
        const instruments: IInstruments[] = response.data;
        return instruments;
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


  export const instrumentService = {
    instrumentAll,
    
  };