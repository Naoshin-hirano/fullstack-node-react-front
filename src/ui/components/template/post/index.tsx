import React, { Dispatch, SetStateAction } from "react";
import { AUTH_STATE, COMMENT, POST } from "../../../../types";
import { Post } from "../../organism/post";

export interface mainProps {
    id: string;
    authState: AUTH_STATE;
    comments: COMMENT[];
    post: POST | undefined;
    setPost: Dispatch<SetStateAction<POST | undefined>>;
    setComments: Dispatch<SetStateAction<COMMENT[]>>;
    loading: boolean;
}

export const Template: React.FC<mainProps> = (props: mainProps) => {
    return (
        <div>
            <Post {...props} />
        </div>
    );
};
