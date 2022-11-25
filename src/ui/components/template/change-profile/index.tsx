import React, { Dispatch, SetStateAction } from "react";
import { AUTH_STATE } from "../../../../types";
import { ChangeProfile } from "../../organism/change-profile";

export interface mainProps {
    authState: AUTH_STATE;
    setAuthState: Dispatch<SetStateAction<AUTH_STATE>>;
}

export const Template: React.FC<mainProps> = (props: mainProps) => {
    return (
        <div>
            <ChangeProfile {...props} />
        </div>
    );
};
