import { useCallback, useContext, useEffect, useRef } from "react";
import useSWR from "swr";
import { AuthContext } from "../../helpers/AuthContext";
import { SendMessage } from "./SendMessage";

export const Chats = ({ id }: { id: string }) => {
    const scroll = useRef<any>(null);
    // ログインユーザーの情報
    const { authState } = useContext(AuthContext);
    // チャットルームのユーザー情報フェッチ
    const { data: dmUser, error: dmUserError } = useSWR(
        `http://localhost:3001/auth/dmUser/${id}`,
        {
            refreshInterval: 500,
        }
    );
    // DM一覧のフェッチ
    const { data: directMessages, error: messagesError } = useSWR(
        "http://localhost:3001/directmessages",
        {
            refreshInterval: 500,
        }
    );

    // 初期画面またはDM更新時に最下部にスクロール
    const scrollToBottomOfList = useCallback(() => {
        scroll!.current!.scrollIntoView({
            block: "end",
        });
    }, [scroll]);

    useEffect(() => {
        scrollToBottomOfList();
    }, [directMessages, scrollToBottomOfList]);

    return (
        <div>
            <div className="msgs">
                {directMessages
                    ? directMessages.map(
                          (
                              {
                                  id,
                                  text,
                                  UserId,
                              }: { id: string; text: string; UserId: string },
                              key: number
                          ) => (
                              <div key={key}>
                                  {UserId === authState.id ||
                                  UserId === dmUser.id ? (
                                      <div
                                          key={id}
                                          className={`msg ${
                                              UserId === authState.id
                                                  ? "sent"
                                                  : "received"
                                          }`}
                                      >
                                          <p>{text}</p>
                                          <img
                                              src={
                                                  UserId === authState.id
                                                      ? `http://localhost:3000/${authState.imageName}`
                                                      : `http://localhost:3000/${dmUser.imageName}`
                                              }
                                              alt=""
                                          />
                                      </div>
                                  ) : (
                                      dmUserError
                                  )}
                              </div>
                          )
                      )
                    : messagesError}
            </div>
            <SendMessage />
            <div ref={scroll}></div>
        </div>
    );
};
