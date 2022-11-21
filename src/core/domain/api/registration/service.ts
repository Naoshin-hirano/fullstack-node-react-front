import axios from "axios";

export const postRegistration = async (data: any) => {
    const response = await axios.post("http://localhost:3001/auth", data);
    return response;
};
