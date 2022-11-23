import { useContext } from "react";
import { AuthContext } from "../../../../helpers/AuthContext";

export const useCreateProps = () => {
    const { authState, setAuthState } = useContext(AuthContext);
    return {
        authState,
        setAuthState,
    };
};
