//handles all request from components

import axios from 'axios';

const url = 'api/proyectos/';

class PostService {
    // Get proyectos
    static async getProyectos() {
        await axios.get(url).then(response => {
            return response.data;
          })
    }

    // Create proyectos
    static insertProyecto(proyecto) {
        return axios.post(url, {proyecto})
    }

    // Delete posts
    static deleteProyecto(id) {
        return axios.delete(`${url}${id}`)
    }
}

export default PostService;