import axios from "axios";

const apiUrl = "api/";

class AxiosHandler {
  // Get 
  static async get(coleccion) {
    let res = null;    
    let url = apiUrl + `${coleccion}/`;
    try {
      await axios.get(url).then((response) => {
        res = response.data;
      });
      return res;

    } catch (err) {
      return err;
    }
  }

  // Crear proyecto
  static insert(coleccion, objeto) {
    let url = apiUrl + `${coleccion}/`;
    return axios.post(url, objeto);
  }

  // Editar proyecto
  static update(coleccion, id, objeto) {
    let url = apiUrl + `${coleccion}/`;
    return axios.update(`${url}${id}`, objeto);
  }

  // Eliminar proyecto
  static deleteProyecto(coleccion, id) {
    let url = apiUrl + `${coleccion}/`;
    return axios.delete(`${url}${id}`);
  }

}


export default AxiosHandler;