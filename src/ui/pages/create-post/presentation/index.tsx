import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Usecase from "../../../../core/usecase/create-post";
import { TAG } from "../../../../types";

export const useCreateProps = () => {
    const [tags, setTags] = useState<TAG[]>([]);
    let history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            history.push("/login");
        }
        Usecase.getTagsInfo(setTags);
    }, []);

    return {
        tags,
    };
};
