import SendIcon from "@material-ui/icons/Send";
import { Input } from "@material-ui/core";

export const SendMessage = ({
    sendMessage,
    messageText,
    setMessageText,
}: any) => {
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
