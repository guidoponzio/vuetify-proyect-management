//handles all request from components

import axios from "axios";

const baseUrl = "api/";

function modificarUrl(ruta){
    return `${baseUrl}${ruta}/`
}

class AxiosService {
  // Get all
  static async get(ruta) {
    let url = modificarUrl(ruta)
    let res = null;
    try {
      await axios.get(url).then((response) => {
        res = response.data;
      });
      return res;

    } catch (err) {
      return err;
    }
  }

  // Create 
  static insert(ruta, elemento) {
    let url = modificarUrl(ruta);
    return axios.post(url, elemento);
  }

  // Edit
  static update(ruta, elemento) {
      let url = modificarUrl(ruta);
      return axios.put(url, elemento)
  }

  // Delete 
  static delete(ruta, id) {
    let url = modificarUrl(ruta);
    return axios.delete(`${url}${id}`);
  }
}

export default AxiosService;