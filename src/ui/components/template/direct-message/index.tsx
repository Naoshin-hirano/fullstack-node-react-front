import React from "react";
import { AUTH_STATE, DIRECT_MESSAGE, DM_USER } from "../../../../types";
import { DirectMessage } from "../../organism/direct-message";

export interface mainProps {
    authState: AUTH_STATE;
    dmUser: DM_USER | undefined;
    dmUserError: any;
    directMessages: DIRECT_MESSAGE[] | undefined;
    messagesError: any;
    isLoading: boolean;
    id: string;
}

export const Template: React.FC<mainProps> = (props: mainProps) => {
    return (
        <div>
            <DirectMessage {...props} />
        </div>
    );
};
