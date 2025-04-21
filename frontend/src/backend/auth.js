import axios from "axios";

const url = import.meta.env.VITE_HOST;

const register = async (fromData) => {
  try {
    const res = await axios.post(`${url}/users/register`, fromData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status) {
      return res;
    }
    return res;

  } catch (error) {
    throw error.message;
  }
};

const login = async (fromData) => {
    try {
      const res = await axios.post(`${url}/users/login`, fromData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (res.status) {
        return res;
      }
      return res;
  
    } catch (error) {
      throw error.message;
    }
};

const logout = async () => {
    try {
        const res = await axios.get(`${url}/users/logout`, {
            withCredentials: true
        });

        if (res.status) {
            return res;
        }
        return res;

    } catch (error) {
        throw error.message;
    }
};

const getCurrentUser = async () => {
    try {
        const res = await axios.get(`${url}/users/currentUser`, {
            withCredentials: true
        });

        if (res.status) {
            return res;
        }
        return res;

    } catch (error) {
        throw error.message;
    }
};

const refreshAccessToken = async () => {
    try {
        const res = await axios.get(`${url}/users/refreshAccessToken`, {
            withCredentials: true
        });

        if (res.status) {
            return res;
        }
        return res;

    } catch (error) {
        throw error.message;
    }
};

const changePassword = async (formData) => {
    try {
        const res = await axios.post(`${url}/users/changePassword`, formData, {
            withCredentials: true
        });

        if (res.status) {
            return res;
        }
        return res;

    } catch (error) {
        throw error.message;
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