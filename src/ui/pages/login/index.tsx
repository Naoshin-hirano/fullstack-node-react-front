import React from "react";
import { Template } from "../../components/template/login";

import { useCreateProps } from "./presentation";

export const LoginPage: React.FC = () => {
    const props = useCreateProps();
    return <Template {...props}></Template>;
};
