import axios from "axios";

const url = import.meta.env.VITE_HOST

class Post{
    async createPost(formData){
        try {
            const res = await axios.post(`${url}/post/createPost`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            return res.data
        } catch (error) {
                throw error.response.data;
        }
    }

    async updatePost(formData, id){
        try {
            const res = await axios.post(`${url}/post/updatePost/${id}`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return res.data;
        } catch (error) {
            throw error.response.data;
        }
    };

    async deletePost(id){
        try {
            const res = await axios.get(`${url}/post/deletePost/${id}`, {
                withCredentials: true,
            })
            return res.data;
        } catch (error) {
            throw error.response.data;
        }
    };

    async getAllPost(){
        try {
            const res = await axios.post(`${url}/post/allPost`, {
                withCredentials: true,
            })
            return res.data;
        } catch (error) {
            throw error.response.data;
        }
    };

    async lovePost(id){
        try {
            const res = await axios.post(`${url}/post/love/${id}`, {
                withCredentials: true,
            })
            return res.data;
        } catch (error) {
            throw error.response.data;
        }
    };

    async commentPost(id, formData){
        try {
            const res = await axios.post(`${url}/post/comment/${id}`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return res.data;
        } catch (error) {
            throw error.response.data;
        }
    };
}

export default new Post();