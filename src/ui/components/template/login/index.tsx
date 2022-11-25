import React, { Dispatch, SetStateAction } from "react";
import { AuthState } from "../../../../App";
import { Login } from "../../organism/login";

export interface mainProps {
    setAuthState: Dispatch<SetStateAction<AuthState>>;
}

export const Template: React.FC<mainProps> = (props: mainProps) => {
    return (
        <div>
            <Login {...props} />
        </div>
    );
};
