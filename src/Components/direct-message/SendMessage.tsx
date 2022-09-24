import axios from "axios";
import React, { useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import { Input } from "@material-ui/core";

export const SendMessage = () => {
    const [messageText, setMessageText] = useState("");

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios
            .post(
                "http://localhost:3001/directmessages",
                { text: messageText },
                {
                    headers: {
                        accessToken: localStorage.getItem(
                            "accessToken"
                        ) as string,
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
            });
        setMessageText("");
    };

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
