import { TagPosts } from "../../organism/tag-posts";

export const Template = (props: any) => {
    return (
        <div>
            <TagPosts {...props} />
        </div>
    );
};
