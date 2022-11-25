import React, { Dispatch, SetStateAction } from "react";
import { AUTH_STATE } from "../../../../types";
import { Login } from "../../organism/login";

export interface mainProps {
    setAuthState: Dispatch<SetStateAction<AUTH_STATE>>;
}

export const Template: React.FC<mainProps> = (props: mainProps) => {
    return (
        <div>
            <Login {...props} />
        </div>
    );
};
