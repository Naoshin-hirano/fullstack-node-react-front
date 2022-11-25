import { AUTH_STATE, DM_OBJ } from "../../../../types";

interface MESSAGE_LIST_PROPS {
    directMessages: DM_OBJ[];
    authState: AUTH_STATE;
    dmUser: any;
    dmUserError: any;
    messagesError: any;
}

export const MessageList = ({
    directMessages,
    authState,
    dmUser,
    dmUserError,
    messagesError,
}: MESSAGE_LIST_PROPS) => {
    return (
        <div className="msgs">
            {directMessages
                ? directMessages.map(
                      ({ id, text, UserId }: DM_OBJ, key: number) => (
                          <div key={key}>
                              {Number(UserId) === authState.id ||
                              UserId === dmUser.id ? (
                                  <div
                                      key={id}
                                      className={`msg ${
                                          Number(UserId) === authState.id
                                              ? "sent"
                                              : "received"
                                      }`}
                                  >
                                      <p>{text}</p>
                                      <img
                                          src={
                                              Number(UserId) === authState.id
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
    );
};
