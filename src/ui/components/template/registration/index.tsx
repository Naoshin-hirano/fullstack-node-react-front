import React from "react";
import { Registration } from "../../organism/registration";

export const Template: React.FC<any> = (props) => {
    return (
        <div>
            <Registration {...props} />
        </div>
    );
};
