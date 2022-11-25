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
                        style={{
                            width: "78%",
                            fontSize: "15px",
                            fontWeight: "550",
                            marginLeft: "5px",
                            marginBottom: "-3px",
                        }}
                        placeholder="メッセージを入力"
                        type="text"
                        onChange={(e) => setMessageText(e.target.value)}
                        value={messageText}
                    />
                    <SendIcon
                        style={{ color: "#7AC2FF", marginLeft: "20px" }}
                    />
                </div>
            </form>
        </div>
    );
};
