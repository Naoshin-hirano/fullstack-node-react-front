import React, { Dispatch, SetStateAction } from "react";
import { POST } from "../../../../types";
import { Home } from "../../organism/home";

export interface mainProps {
    listOfPosts: POST[];
    setListOfPosts: Dispatch<SetStateAction<POST[]>>;
    likedPosts: number[];
    setLikedPosts: Dispatch<SetStateAction<number[]>>;
    suggestions: string[];
}

export const Template: React.FC<mainProps> = (props: mainProps) => {
    return (
        <div>
            <Home {...props} />
        </div>
    );
};
