import { useContext, useState } from "react";
import { AuthContext } from "../../../../helpers/AuthContext";

export const useCreateProps = () => {
    return {
        mainProps,
    };
};

const [oldpassword, setOldpassword] = useState("");
const [newpassword, setNewpassword] = useState("");
const [image, setImage] = useState<null | File>(null);
const { authState, setAuthState } = useContext(AuthContext);

const mainProps: any = {
    oldpassword,
    setOldpassword,
    newpassword,
    setNewpassword,
    image,
    setImage,
    authState,
    setAuthState,
};

