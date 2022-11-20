import axios from 'axios'

export const postLoginInfo = async (username: string, password: string) => {
    const response = await axios.post("http://localhost:3001/auth/login", {
                username: username,
                password: password,
            });
    return response;
};
