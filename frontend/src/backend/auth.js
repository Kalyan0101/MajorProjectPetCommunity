import axios from "axios";

const url = import.meta.env.VITE_HOST;

const register = async (formData) => {
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

const login = async (formData) => {
    try {
      console.log(formData);
      
      const res = await axios.post(`${url}/users/login`, formData);
      return res.data

    } catch (error) {
      throw error.response.data;
    }
};

const logout = async () => {
    try {
        const res = await axios.get(`${url}/users/logout`, {
            withCredentials: true
        });

        return res.data

    } catch (error) {
      throw error.response.data;
    }
};

const getCurrentUser = async () => {
    try {
        const res = await axios.get(`${url}/users/currentUser`, {
            withCredentials: true
        });

        return res.data

    } catch (error) {
      throw error.response.data;
    }
};

const refreshAccessToken = async () => {
    try {
        const res = await axios.get(`${url}/users/refreshAccessToken`, {
            withCredentials: true
        });

        return res.data

    } catch (error) {
      throw error.response.data;
    }
};

const changePassword = async (formData) => {
    try {
        const res = await axios.post(`${url}/users/changePassword`, formData, {
            withCredentials: true
        });

        return res.data

    } catch (error) {
      throw error.response.data;
    }
};


export {
    register,
    login,
    logout,
    getCurrentUser,
    refreshAccessToken,
    changePassword
}