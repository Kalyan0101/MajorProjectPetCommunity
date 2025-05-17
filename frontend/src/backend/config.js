import axios from "axios";

const url = import.meta.env.VITE_HOST;

class Config{
    async allUserName(){
        try {
            const res = await axios.get(`${url}/users/allUserName`, {
                withCredentials: true
            });
            return res;
            
        } catch (error) {
            throw error.message;
        }
    };
    
    async updateAvatar(formData){
        try {
            const res = await axios.post(`${url}/users/updateAvatar`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return res;
            
        } catch (error) {
            throw error.message;
        }
    };
    
    async updateDetails(formData){
        
        try {
            const res = await axios.post(`${url}/users/updateDetails`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return res.data;
            
        } catch (error) {
            throw error.response.data;
        }
    };
}

export default new Config();