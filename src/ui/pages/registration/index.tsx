import React from "react";
import { Template } from "../../components/template/registration";

import { useCreateProps } from "./presentation";

export const RegistrationPage: React.FC = () => {
    const props = useCreateProps();
    return <Template {...props}></Template>;
};
