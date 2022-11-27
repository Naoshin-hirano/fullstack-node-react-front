import { AUTH_STATE, DIRECT_MESSAGE, DM_USER } from "../../../../types";

interface MESSAGE_LIST_PROPS {
    directMessages: DIRECT_MESSAGE[] | undefined;
    messagesError: any;
    authState: AUTH_STATE;
    dmUser: DM_USER | undefined;
    dmUserError: any;
    isLoading: boolean;
    paramsId: number;
}

// 初期表示時に取得したすべてのDM一覧を以下の２通りでフィルタリングして表示
// 1: 送信元(UserId)がチャットルームUserIdかつ、送信先(toUserId)がログインUserIdである
// 2: 送信元(UserId)がログインUserIdかつ、送信先(toUserId)がチャットルームUserIdである
export const MessageList = ({
    directMessages,
    authState,
    dmUser,
    dmUserError,
    messagesError,
    isLoading,
    paramsId,
}: MESSAGE_LIST_PROPS) => {
    return !isLoading ? (
        <div className="msgs">
            {directMessages
                ? directMessages
                      .filter(
                          (m: DIRECT_MESSAGE) =>
                              (m.UserId == paramsId &&
                                  m.toUserId == authState.id) ||
                              (m.toUserId == paramsId &&
                                  m.UserId == authState.id)
                      )
                      .map(({ id, text, UserId }, key: number) => (
                          <div key={key}>
                              <div
                                  key={id}
                                  className={`msg ${
                                      UserId === authState.id
                                          ? "sent"
                                          : "received"
                                  }`}
                              >
                                  <p>{text}</p>
                                  {dmUser ? (
                                      <img
                                          src={
                                              UserId === authState.id
                                                  ? `http://localhost:3000/${authState.imageName}`
                                                  : `http://localhost:3000/${dmUser?.imageName}`
                                          }
                                          alt=""
                                      />
                                  ) : (
                                      dmUserError
                                  )}
                              </div>
                          </div>
                      ))
                : messagesError}
        </div>
    ) : (
        <div>Loading...</div>
    );
};
