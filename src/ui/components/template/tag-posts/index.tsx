import { POST } from "../../../../types";
import { TagPosts } from "../../organism/tag-posts";

export interface mainProps {
    listOfPosts: POST[];
    id: string;
}

export const Template: React.FC<mainProps> = (props: mainProps) => {
    return (
        <div>
            <TagPosts {...props} />
        </div>
    );
};
