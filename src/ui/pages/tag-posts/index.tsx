import { Template } from "../../components/template/tag-posts";
import { useCreateProps } from "./presentation";

export const TagPostsPage = () => {
    const props = useCreateProps();
    return <Template {...props}></Template>;
};
