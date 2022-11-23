import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ImageSrc } from "../common/ImageSrc";
import * as Usecase from "../../../../core/usecase/change-profile";

export const ChangeProfile = (props: any) => {
    const [oldpassword, setOldpassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [image, setImage] = useState<null | File>(null);
    const { authState, setAuthState } = props;
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
                <h1>Change Your Password</h1>
                <input
                    onChange={(e) => {
                        setOldpassword(e.target.value);
                    }}
                    value={oldpassword}
                    type="text"
                    placeholder="Old Password..."
                />
                <input
                    onChange={(e) => {
                        setNewpassword(e.target.value);
                    }}
                    value={newpassword}
                    type="text"
                    placeholder="New Password..."
                />
                <button onClick={changePassword}>Save Changes</button>
            </div>
            <div>
                <h1>Change Avatar</h1>
                <input
                    type="file"
                    accept="image/*,.png,.jpg,.jpeg,.gif"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleOnAddImage(e)
                    }
                />
                <button onClick={changeAvatar}>Save Changes</button>
            </div>
            <ImageSrc file={image} />
        </div>
    );
};
