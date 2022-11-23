import React from "react";
import { Login } from "../../organism/login";

export const Template: React.FC<any> = (props) => {
    return (
        <div>
            <Login {...props} />
        </div>
    );
};
