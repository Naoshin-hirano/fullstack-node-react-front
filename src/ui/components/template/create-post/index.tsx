import React from "react";
import { CreatePost } from "../../organism/create-post";

export const Template: React.FC<any> = (props) => {
    return (
        <div>
            <CreatePost {...props} />
        </div>
    );
};
