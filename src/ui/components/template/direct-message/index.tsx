import React from "react";
import { AUTH_STATE, DM_OBJ } from "../../../../types";
import { DirectMessage } from "../../organism/direct-message";

export interface mainProps {
    authState: AUTH_STATE;
    dmUser: any;
    dmUserError: any;
    directMessages: DM_OBJ[];
    messagesError: any;
}

export const Template: React.FC<mainProps> = (props: mainProps) => {
    return (
        <div>
            <DirectMessage {...props} />
        </div>
    );
};
