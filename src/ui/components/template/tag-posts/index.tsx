import { POST } from "../../../../types";
import { TagPosts } from "../../organism/tag-posts";

export interface mainProps {
    listOfPosts: POST[];
    id: string;
    loading: boolean;
}

export const Template: React.FC<mainProps> = (props: mainProps) => {
    return (
        <div>
            <TagPosts {...props} />
        </div>
    );
};
