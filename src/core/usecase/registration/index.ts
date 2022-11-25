import { SUBMIT_USER } from "../../../ui/components/organism/registration";
import { postRegistration } from "../../domain/api/registration/service";

export const postRegistrationInfo = async (data: SUBMIT_USER) => {
    const result = await postRegistration(data);
    console.log(result);
};
