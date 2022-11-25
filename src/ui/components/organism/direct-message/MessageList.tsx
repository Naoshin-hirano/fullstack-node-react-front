import { AuthState } from "../../../../App";
import { DM_OBJ } from "../../template/direct-message";

interface MESSAGE_LIST_PROPS {
    directMessages: DM_OBJ[];
    authState: AuthState;
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
