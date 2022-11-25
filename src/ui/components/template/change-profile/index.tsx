import React, { Dispatch, SetStateAction } from "react";
import { AuthState } from "../../../../App";
import { ChangeProfile } from "../../organism/change-profile";

export interface mainProps {
    authState: AuthState;
    setAuthState: Dispatch<SetStateAction<AuthState>>;
}

export const Template: React.FC<mainProps> = (props: mainProps) => {
    return (
        <div>
            <ChangeProfile {...props} />
        </div>
    );
};
