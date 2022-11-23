import React from "react";
import { Profile } from "../../organism/profile";

export const Template: React.FC<any> = (props) => {
    return (
        <div>
            <Profile {...props} />
        </div>
    );
};
