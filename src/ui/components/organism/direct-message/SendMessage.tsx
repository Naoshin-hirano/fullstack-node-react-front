import SendIcon from "@material-ui/icons/Send";
import { Input } from "@material-ui/core";
import { Dispatch, FormEventHandler, SetStateAction } from "react";

interface SEND_MESSAGE_PROPS {
    sendMessage: FormEventHandler<HTMLFormElement>;
    messageText: string;
    setMessageText: Dispatch<SetStateAction<string>>;
}

export const SendMessage = ({
    sendMessage,
    messageText,
    setMessageText,
}: SEND_MESSAGE_PROPS) => {
    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <Input
                        placeholder="メッセージを入力"
                        type="text"
                        onChange={(e) => setMessageText(e.target.value)}
                        value={messageText}
                    />
                    <SendIcon />
                </div>
            </form>
        </div>
    );
};
