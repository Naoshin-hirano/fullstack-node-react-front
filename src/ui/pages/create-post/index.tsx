import React from "react";
import { Template } from "../../components/template/create-post";

import { useCreateProps } from "./presentation";

export const CreatePostPage: React.FC = () => {
    const props = useCreateProps();
    return <Template {...props}></Template>;
};
