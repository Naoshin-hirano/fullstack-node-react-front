import React from "react";
import { ChangeProfile } from "../../organism/change-profile";


export const Template: React.FC<any> = (props) => {
    return (
        <div>
            <ChangeProfile {...props} />
        </div>
    );
};
