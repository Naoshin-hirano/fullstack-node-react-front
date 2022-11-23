import React from "react";
import { DirectMessage } from "../../organism/direct-message";

export const Template: React.FC<any> = (props) => {
    return (
        <div>
            <DirectMessage {...props} />
        </div>
    );
};
