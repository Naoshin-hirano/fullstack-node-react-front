import React from "react";
import { Template } from "../../components/template/home";
import { useCreateProps } from "./presentation";

export const HomePage: React.FC = () => {
    const props = useCreateProps();
    return <Template {...props}></Template>;
};
