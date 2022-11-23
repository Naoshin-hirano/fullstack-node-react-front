import { useCallback, useEffect, useRef, useState } from "react";
import * as Usecase from "../../../../core/usecase/direct-message";
import { MessageList } from "./MessageList";
import { SendMessage } from "./SendMessage";

export const DirectMessage = (props: any) => {
    const {
        authState,
        dmUser,
        dmUserError,
        directMessages,
        messagesError,
    } = props;
    const [messageText, setMessageText] = useState("");
    const scroll = useRef<any>(null);

    // 初期画面またはDM更新時に最下部にスクロール
    const scrollToBottomOfList = useCallback(() => {
        scroll!.current!.scrollIntoView({
            block: "end",
        });
    }, [scroll]);

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Usecase.postDMInfo(messageText);
        setMessageText("");
    };

    useEffect(() => {
        scrollToBottomOfList();
    }, [directMessages, scrollToBottomOfList]);

    return (
        <div>
            <MessageList
                directMessages={directMessages}
                authState={authState}
                dmUser={dmUser}
                dmUserError={dmUserError}
                messagesError={messagesError}
            />
            <SendMessage
                sendMessage={sendMessage}
                messageText={messageText}
                setMessageText={setMessageText}
            />
            <div ref={scroll}></div>
        </div>
    );
};
