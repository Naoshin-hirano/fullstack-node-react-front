import React from "react";
import { TAG } from "../../../../types";
import { CreatePost } from "../../organism/create-post";

export interface mainProps {
    tags: TAG[];
}

export const Template: React.FC<mainProps> = (props: mainProps) => {
    return (
        <div>
            <CreatePost {...props} />
        </div>
    );
};
