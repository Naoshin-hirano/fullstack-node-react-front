import { useEffect, useState } from "react";
// アップロードする画像を表示するコンポーネント
export const ImageSrc = ({ file }) => {
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageSrc(reader.result);
            }
        }
    }, [file]);

    if (!file) {
        return null
    }

    return (
        <img
            src={imageSrc}
            alt={file.name}
            height={200}
            width={200}
        />
    );
};