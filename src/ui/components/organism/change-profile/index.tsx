import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ImageSrc } from "../common/ImageSrc";
import * as Usecase from "../../../../core/usecase/change-profile";
import { mainProps } from "../../template/change-profile";
import BeatLoader from "react-spinners/BeatLoader";

export const ChangeProfile = ({ authState, setAuthState }: mainProps) => {
    const [oldpassword, setOldpassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [image, setImage] = useState<null | File>(null);
    const [loading, setLoading] = useState(false);
    let history = useHistory();

    const changePassword = async () => {
        const result = await Usecase.putChangePasswordInfo(
            oldpassword,
            newpassword
        );
        if (result === "error") {
            return;
        }
        history.push(`/profile/${authState.id}`);
    };

    const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setImage(e.target.files[0]);
    };

    const changeAvatar = async () => {
        if (!window.confirm("あなたのアイコンをこの画像に変更しますか？")) {
            return;
        }
        setLoading(true);
        const result = await Usecase.putChangeAvatarInfo(
            image,
            authState,
            setAuthState
        );

        // 処理中のローティング
        setTimeout(() => {
            setLoading(false);
        }, 1000);

        if (result === "error") {
            return;
        }
        if (result.status === "success") {
            setAuthState({
                ...authState,
                imageName: result.imageName,
            });
            alert("アバターの変更が完了しました");
        }
        history.push(`/profile/${authState.id}`);
    };

    return (
        <div>
            {loading ? (
                <BeatLoader color="#36d7b7" />
            ) : (
                <>
                    <div>
                        <h1>パスワードの変更</h1>
                        <input
                            onChange={(e) => {
                                setOldpassword(e.target.value);
                            }}
                            value={oldpassword}
                            type="text"
                            placeholder="現在のパスワード..."
                        />
                        <input
                            onChange={(e) => {
                                setNewpassword(e.target.value);
                            }}
                            value={newpassword}
                            type="text"
                            placeholder="新しいパスワード..."
                        />
                        <button onClick={changePassword}>変更を保存</button>
                    </div>
                    <div>
                        <h1>アバターの変更</h1>
                        <input
                            type="file"
                            accept="image/*,.png,.jpg,.jpeg,.gif"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => handleOnAddImage(e)}
                        />
                        <button onClick={changeAvatar}>変更を保存</button>
                    </div>
                    <ImageSrc file={image} />
                </>
            )}
        </div>
    );
};
