//handles all request from components

import axios from "axios";

const url = "api/proyectos/";

class PostService {
  // Get proyectos
  static async getProyectos() {
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

  // Crear proyecto
  static insertProyecto(proyecto) {
    return axios.post(url, proyecto);
  }

  // Editar proyecto
  static updateProyecto(id, proyecto) {
    return axios.update(`${url}${id}`, proyecto);
  }

  // Eliminar proyecto
  static deleteProyecto(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;