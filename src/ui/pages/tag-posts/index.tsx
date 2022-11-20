import React from "react";
import { Template } from "../../components/template/tag-posts";
import { useCreateProps } from "./presentation";

export const TagPostsPage = () => {
    const { topTitle } = useCreateProps();
    console.log("プロップス", topTitle);
    return <Template topTitle={topTitle}></Template>;
};
