import axios from "axios";
import { SUBMIT_USER } from "../../../../ui/components/organism/registration";

export const postRegistration = async (data: SUBMIT_USER) => {
    const response = await axios.post("http://localhost:3001/auth", data);
    return response;
};
