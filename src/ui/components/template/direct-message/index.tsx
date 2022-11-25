import React from "react";
import { AuthState } from "../../../../App";
import { DirectMessage } from "../../organism/direct-message";

export interface DM_OBJ {
    id: string;
    text: string;
    UserId: string;
}

export interface mainProps {
    authState: AuthState;
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
