import { useCallback, useEffect, useRef, useState } from "react";
import * as Usecase from "../../../../core/usecase/direct-message";
import { mainProps } from "../../template/direct-message";
import { MessageList } from "./MessageList";
import { SendMessage } from "./SendMessage";

export const DirectMessage = (props: mainProps) => {
    const {
        authState,
        dmUser,
        dmUserError,
        directMessages,
        messagesError,
        isLoading,
        id,
    } = props;
    const paramsId = Number(id);
    const [messageText, setMessageText] = useState<string>("");
    const scroll = useRef<HTMLDivElement>(null);

    // 初期画面またはDM更新時に最下部にスクロール
    const scrollToBottomOfList = useCallback(() => {
        scroll!.current!.scrollIntoView({
            block: "end",
        });
    }, [scroll]);

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Usecase.postDMInfo(messageText, paramsId, authState);
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
                isLoading={isLoading}
                paramsId={paramsId}
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
