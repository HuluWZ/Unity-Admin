import axios from "axios";
const url = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token") || "";


//impliment crud operations
export const getCategories = async () => {
    console.log(" Get All Category - ",url,token)
    const response = await axios.get(`${url}news/`, {
        headers: {
            "Content-Type": "application/json",
            "authtoken": `${token}`,
        },
    });
    console.log(" Category  = " , response.data)

    return response.data;
};

export const createCategory = async (data: any) => {
    console.log(" Activity data = ", data)
    let newData = data.images
    const response = await axios.post(`${url}news/`, data, {
        headers: {
            // "Content-Type":"application/json"
            "Content-Type": "multipart/form-data",
            "authtoken": `${token}`
        },
    });
    console.log(" Activity Upload response = ", response)
    return response.data;
};

//get category by id
export const getCategoryById = async (id: any) => {
    const response = await axios.get(`${url}news/search/${id}`, {
        headers: {
            "Content-Type": "application/json",
            authtoken: `${token}`,
        },
    });

    return response.data;
};

//update category
export const updateCategory = async (id: any, data: any) => {
    const response = await axios.put(`${url}news/`, {...data,id}, {
        headers: {
            "Content-Type": "multipart/form-data",
            authtoken: `${token}`,
        },
    });

    return response.data;
};


export const deleteCategory = async (id: any) => {
    const response = await axios.delete(`${url}news/${id}`, {
        headers: {
            "Content-Type": "application/json",
            authtoken: `${token}`,
        },
    });

    return response.data;
}








