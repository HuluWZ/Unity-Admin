import axios from "axios";

// Base URL for the request
const api = import.meta.env.VITE_API_URL;
const url = `${api}forum`;

//Heders for the request
const token = localStorage.getItem("token");


// console.log(" URL =  ", url,token)
export const getForums = async () => {
  try {
    console.log(" Get All Forums ",url);
        const response = await axios.get(`${url}`, {
            headers: {
                "Content-Type": "application/json",
                authtoken: `${token}`,
            },
        });
        console.log(" All Forums  Response  - ",response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getForum = async (id: string) => {
    try {
        console.log(" Get Forum -  ",id,token)
        const response = await axios.get(`${url}/get/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "authtoken": token
            },
        });
        console.log(" Get Forum Response ",response);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const createForum = async (data: any) => {
    try {
        const response = await axios.post(`${url}/`, data, {
            headers: {
                "Content-Type": "application/json",
                authtoken: `${token}`,
            },
        });
        console.log(" Create Product -  ",response?.data,data)
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const updateForum = async (id: string, data: any) => {
    try {
        const response = await axios.put(`${url}?forumId=${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                authtoken: `${token}`,
            },
        });
        console.log(" Data  - ", { id, data }, " Response - ", response);

        return response.data;

    } catch (error) {
        console.log(error)
        console.error(error);
    }
}


export const deleteForum = async (id: string) => {
    try {
        console.log(`${url}/delete/${id}`, id)
        const response = await axios.delete(`${url}?newsId=${id}`, {
            headers: {
                "Content-Type": "application/json",
                authtoken: `${token}`,
            },
        });
        console.log("Delete Product Response ", response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const getStock = async () => {
    const response = await axios.get(`${url}/stock`, {
        headers: {
            "Content-Type": "application/json",
            authtoken: `${token}`,
        },
    });

    return response.data;
}

