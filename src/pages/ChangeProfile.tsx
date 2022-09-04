import React, { useState, useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ImageSrc } from "../Components/ImageSrc";

function ChangeProfile() {
    const [oldpassword, setOldpassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [image, setImage] = useState<any>();
    const { authState, setAuthState } = useContext(AuthContext);
    let history = useHistory();

    const changePassword = () => {
        axios
            .put(
                "http://localhost:3001/auth/changepassword",
                {
                    oldPassword: oldpassword,
                    newPassword: newpassword,
                },
                {
                    headers: {
                        accessToken: localStorage.getItem(
                            "accessToken"
                        ) as string,
                    },
                }
            )
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                }
                console.log("アイコンの更新が完了しました");
            });
    };

    const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setImage(e.target.files[0]);
    };

    const changeAvatar = () => {
        if (!window.confirm("あなたのアイコンをこの画像に変更しますか？")) {
            return;
        }
        const formData = new FormData();
        formData.append("file", image);
        axios
            .put("http://localhost:3001/auth/changeavatar", formData, {
                headers: {
                    accessToken: localStorage.getItem("accessToken") as string,
                },
            })
            .then((response) => {
                if (response.data.error) {
                    return alert(response.data.error);
                }
                setAuthState({
                    ...authState,
                    imageName: response.data.imageName,
                });
                history.push(`/profile/${authState.id}`);
            });
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
}

export default ChangeProfile;
