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

  // Create proyectos
  static insertProyecto(proyecto) {
    return axios.post(url, proyecto);
  }

  // Delete posts
  static deleteProyecto(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;