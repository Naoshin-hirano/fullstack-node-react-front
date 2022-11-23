import React from "react";
import { Template } from "../../components/template/direct-message";

import { useCreateProps } from "./presentation";

export const DirectMessagePage: React.FC = () => {
    const props = useCreateProps();
    return <Template {...props}></Template>;
};
