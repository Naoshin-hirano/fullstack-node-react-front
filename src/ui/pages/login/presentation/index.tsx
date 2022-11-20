import { useContext, useState } from "react";
import { AuthContext } from "../../../../helpers/AuthContext";

export const useCreateProps = () => {
    return {
        mainProps,
    };
};

const { setAuthState } = useContext(AuthContext);

const mainProps: any = {
    setAuthState,
};
