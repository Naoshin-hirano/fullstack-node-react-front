import { postRegistration } from "../../domain/api/registration/service";

export const postRegistrationInfo = async (data: any) => {
    const result = await postRegistration(data);
    console.log(result);
};
