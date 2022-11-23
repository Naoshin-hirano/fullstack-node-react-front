import React from "react";
import { Home } from "../../organism/home";

export const Template: React.FC<any> = (props) => {
    return (
        <div>
            <Home {...props} />
        </div>
    );
};
