import axios from "axios";
import { apiConfig } from "../../../../config";
import { SUBMIT_USER } from "../../../../ui/components/organism/registration";

export const postRegistration = async (data: SUBMIT_USER) => {
    const url = apiConfig.auth.url;
    const response = await axios.post(url, data);
    return response;
};
