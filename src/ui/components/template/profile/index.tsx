import React, { Dispatch, SetStateAction } from "react";
import { AuthState } from "../../../../App";
import { POST } from "../../../../types";
import { Profile } from "../../organism/profile";

export interface mainProps {
    authState: AuthState;
    username: string;
    userImage: string;
    listOfPosts: POST[];
    following: number[];
    follower: number[];
    setFollower: Dispatch<SetStateAction<number[]>>;
    id: string;
}
export const Template: React.FC<mainProps> = (props: mainProps) => {
    return (
        <div>
            <Profile {...props} />
        </div>
    );
};
