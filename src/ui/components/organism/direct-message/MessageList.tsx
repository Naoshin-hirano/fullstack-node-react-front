export const MessageList = ({
    directMessages,
    authState,
    dmUser,
    dmUserError,
    messagesError,
}: any) => {
    return (
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
    );
};
