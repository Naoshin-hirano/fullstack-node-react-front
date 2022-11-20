import React from "react";
import { TagPosts } from "../../organism/tag-posts";

export const Template = (props: any) => {
    const { topTitle } = props;
    console.log("プロップス", topTitle);
    return (
        <div>
            <TagPosts topTitle={topTitle} />
        </div>
    );
};
