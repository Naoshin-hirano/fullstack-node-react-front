import axios from "axios";
import { apiConfig } from "../../../../config";
import { headers } from "../common/global-header/service";

export const tagPostGet = (id: string) => {
    const url = `${apiConfig.hashTagPosts.url}/${id}`;
    const response = axios.get(url, headers());
    return response;
};
