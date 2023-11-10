import AxiosClient from "../AxiosClient";

const URL = 'http://localhost:1234';
const httpClient = AxiosClient;

const courseAll = async () => {
  try {
    const response = await httpClient.get(`${URL}/courses`);
    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    } else {
      console.log("error message ", response);
    }
  } catch (error) {
    console.error(error);
  }
};

const courseAdd = async (data: Object) => {
  try {
    const response = await httpClient.post(`${URL}/api/new-course`, data);
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