import React, { Dispatch, SetStateAction } from "react";
import { AuthState } from "../../../../App";
import { COMMENT, POST } from "../../../../types";
import { Post } from "../../organism/post";

export interface mainProps {
    id: string;
    authState: AuthState;
    comments: COMMENT[];
    post: POST | undefined;
    setComments: Dispatch<SetStateAction<COMMENT[]>>;
}

export const Template: React.FC<mainProps> = (props: mainProps) => {
    return (
        <div>
            <Post {...props} />
        </div>
    );
};
