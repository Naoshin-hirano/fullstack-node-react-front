import React from "react";
import { Registration } from "../../organism/registration";

// props追加次第に型も予定
export const Template: React.FC<any> = (props) => {
    return (
        <div>
            <Registration {...props} />
        </div>
    );
};
