import { useParams } from "react-router-dom";
import { Chats } from "./Chats";

export const DirectMessage = () => {
    let { id } = useParams<{ id: string }>();
    return (
        <div>
            <Chats id={id} />
        </div>
    );
};
