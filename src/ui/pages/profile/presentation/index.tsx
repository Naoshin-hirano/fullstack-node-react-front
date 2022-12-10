import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../helpers/AuthContext";
import { POST } from "../../../../types";
import * as Usecase from "../../../../core/usecase/profile";

export const useCreateProps = () => {
    const { authState } = useContext(AuthContext);
    const [username, setUsername] = useState<string>("");
    const [userImage, setUserImage] = useState<string>("");
    const [listOfPosts, setListOfPosts] = useState<POST[]>([]);
    const [following, setFollowing] = useState<number[]>([]);
    const [follower, setFollower] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    let { id } = useParams<{ id: string }>();

    useEffect(() => {
        setLoading(true);
        Usecase.getUserInfo(
            id,
            setFollowing,
            setFollower,
            setUsername,
            setUserImage
        );
        Usecase.getUserPostsInfo(id, setListOfPosts);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [id]);

    return {
        authState,
        username,
        userImage,
        listOfPosts,
        following,
        follower,
        setFollower,
        id,
        loading,
    };
};
