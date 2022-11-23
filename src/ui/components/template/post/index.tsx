import React from "react";
import { Post } from "../../organism/post";

export const Template: React.FC<any> = (props) => {
    return (
        <div>
            <Post {...props} />
        </div>
    );
};
