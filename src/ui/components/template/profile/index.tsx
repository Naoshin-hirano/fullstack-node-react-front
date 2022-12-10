import React, { Dispatch, SetStateAction } from "react";
import { AUTH_STATE, POST } from "../../../../types";
import { Profile } from "../../organism/profile";

export interface mainProps {
    authState: AUTH_STATE;
    username: string;
    userImage: string;
    listOfPosts: POST[];
    following: number[];
    follower: number[];
    setFollower: Dispatch<SetStateAction<number[]>>;
    id: string;
    loading: boolean;
}
export const Template: React.FC<mainProps> = (props: mainProps) => {
    return (
        <div>
            <Profile {...props} />
        </div>
    );
};
