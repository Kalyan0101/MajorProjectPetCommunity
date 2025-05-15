import axios from "axios";
const url = import.meta.env.VITE_HOST;

class Pet {
  async registerPet(formData) {
    try {
      const res = await axios.post(`${url}/pet/registerPet`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async allPet() {
    try {
      const res = await axios.get(`${url}/pet/registerPet`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async deletePet(id) {
    try {
      const res = await axios.delete(`${url}/pet/deletePet/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async updatePetDetails(formData) {
    try {
      const res = await axios.post(`${url}/pet/updateDetails`, formData, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async updatePetAvatar(formData) {
    try {
      const res = await axios.post(`${url}/pet/updateAvatar`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default new Pet();
