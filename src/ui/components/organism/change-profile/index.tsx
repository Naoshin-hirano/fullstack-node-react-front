import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ImageSrc } from "../common/ImageSrc";
import * as Usecase from "../../../../core/usecase/change-profile";
import { mainProps } from "../../template/change-profile";

export const ChangeProfile = ({ authState, setAuthState }: mainProps) => {
    const [oldpassword, setOldpassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [image, setImage] = useState<null | File>(null);
    let history = useHistory();

    const changePassword = () => {
        Usecase.putChangePasswordInfo(oldpassword, newpassword);
    };

    const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setImage(e.target.files[0]);
    };

    const changeAvatar = () => {
        if (!window.confirm("あなたのアイコンをこの画像に変更しますか？")) {
            return;
        }
        Usecase.putChangeAvatarInfo(image, authState, setAuthState);
        history.push(`/profile/${authState.id}`);
    };

    return (
        <div>
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleOnAddImage(e)
                    }
                />
                <button onClick={changeAvatar}>変更を保存</button>
            </div>
            <ImageSrc file={image} />
        </div>
    );
};
