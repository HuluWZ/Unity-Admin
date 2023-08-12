import axios from "axios";

const api = import.meta.env.VITE_API_URL;
const url = `${api}treatment`;

const token = localStorage.getItem("token");

export const getSales = async () => {
    console.log(" Get All sales ",`${url}/farmer/all`)
    const response = await axios.get(`${url}/farmer/all`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
   console.log(" Response Get Sales ", response?.data);
    return response.data;
};

export const createSale = async (data: any) => {
    const response = await axios.post(`${url}/create`, data, {
        headers: {
            "Content-Type": "application/json",
            authtoken: `${token}`,
        },
    });
    return response.data;
}

export const updateSale = async (id: string, data: any) => {
    const response = await axios.put(`${url}/farmer/${id}`, data, {
        headers: {
            "Content-Type": "application/json",
            authtoken: `${token}`,
        },
    });
    return response.data;
}

export const deleteSale = async (id: string) => {
    console.log(" Delete Farmer ",id)
    const response = await axios.delete(`${url}/farmer/${id}`, {
        headers: {
            "Content-Type": "application/json",
            authtoken: `${token}`,
        },
    });
    console.log(" Response ",response?.data)
    return response.data;
}


export const getAllReport = async () => {
    const response = await axios.get(`${url}/`, {
        headers: {
            "Content-Type": "application/json",
            authtoken: `${token}`,
        },
    });
   
    return response.data;
}


export const getReportByWeek = async () => {
    try {
        const response = await axios.get(`${url}/week`, {
            headers: {
                "Content-Type": "application/json",
                authtoken: `${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error)

    }
}


export const getSalesDetails = async (id: string) => {
    try {
        const response = await axios.get(`${url}/farmer/${id}`, {
            headers: {
                "Content-Type": "application/json",
                authtoken: `${token}`,
            },
        });

        return response?.data;
    } catch (error) {
        console.error(error)
    }
};
