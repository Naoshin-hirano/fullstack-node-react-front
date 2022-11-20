import React from "react";
import { Template } from "../../components/template/change-profile";

import { useCreateProps } from "./presentation";

export const ChangeProfilePage: React.FC = () => {
    const props = useCreateProps();
    return <Template {...props}></Template>;
};
