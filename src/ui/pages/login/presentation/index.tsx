import { useContext } from "react";
import { AuthContext } from "../../../../helpers/AuthContext";

export const useCreateProps = () => {
    const { setAuthState } = useContext(AuthContext);
    return {
        setAuthState,
    };
};
