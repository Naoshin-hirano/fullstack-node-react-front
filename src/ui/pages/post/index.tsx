import React from "react";
import { Template } from "../../components/template/post";
import { useCreateProps } from "./presentation";

export const PostPage: React.FC = () => {
    const props = useCreateProps();
    return <Template {...props}></Template>;
};
