import axios from "axios";

const allUserName = async () => {
    try {
        const res = await axios.get(`${url}/users/allUserName`, {
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

const updateAvatar = async (formData) => {
    try {
        const res = await axios.post(`${url}/users/updateAvatar`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (res.status) {
            return res;
        }
        return res;

    } catch (error) {
        throw error.message;
    }
};

const updateDetails = async (formData) => {
    try {
        const res = await axios.post(`${url}/users/updateDetails`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
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
    allUserName,
    updateAvatar,
    updateDetails
}