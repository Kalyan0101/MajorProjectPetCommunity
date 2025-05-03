import axios from "axios";

const url = import.meta.env.VITE_HOST;

class AuthService{

  async register(formData) {
    try {
      const res = await axios.post(`${url}/users/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data
    } catch (error) {
      throw error.response.data;
    }
  };
  
  async login(formData) {
    try {      
      const res = await axios.post(`${url}/users/login`, formData, {
          withCredentials: true
      });
      return res.data
      
    } catch (error) {
      throw error.response.data;
    }
  };
  
  async logout() {
    try {
      const res = await axios.get(`${url}/users/logout`, {
        withCredentials: true
      });
      
      return res.data
      
    } catch (error) {
      throw error.response.data;
    }
  };
  
  async getCurrentUser() {
    try {
      const res = await axios.get(`${url}/users/currentUser`, {
        withCredentials: true
      });
      
      return res.data
      
    } catch (error) {
      throw error.response.data;
    }
  };
  
  async refreshAccessToken(){
    try {
      const res = await axios.get(`${url}/users/refreshAccessToken`, {
        withCredentials: true
      });
      
      return res.data
      
    } catch (error) {
      throw error.response.data;
    }
  };
  
  async changePassword(formData){
    try {
      const res = await axios.post(`${url}/users/changePassword`, formData, {
        withCredentials: true
      });
      
      return res.data
      
    } catch (error) {
      throw error.response.data;
    }
  };
}

const authService = new AuthService();
export default authService;