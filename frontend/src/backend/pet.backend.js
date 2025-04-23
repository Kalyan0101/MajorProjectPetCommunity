import axios from "axios";
const url = import.meta.env.VITE_HOST;

const registerPet = async (formData) => {
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
};

const allPet = async () => {
  try {
    const res = await axios.get(`${url}/pet/registerPet`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deletePet = async (formData) => {
  try {
    const res = await axios.post(`${url}/pet/deletePet`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "appication/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updatePetDetails = async (formData) => {
  try {
    const res = await axios.post(`${url}/pet/updateDetails`, formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updatePetAvatar = async (formData) => {
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
};

export {
    registerPet,
    allPet,
    deletePet,
    updatePetAvatar,
    updatePetDetails
}