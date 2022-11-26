import React from "react";
import { AUTH_STATE, DM_OBJ, USER } from "../../../../types";
import { DirectMessage } from "../../organism/direct-message";

export interface mainProps {
    authState: AUTH_STATE;
    dmUser: USER | undefined;
    dmUserError: Error | undefined;
    directMessages: DM_OBJ[] | undefined;
    messagesError: Error | undefined;
}

export const Template: React.FC<mainProps> = (props: mainProps) => {
    return (
        <div>
            <DirectMessage {...props} />
        </div>
    );
};
