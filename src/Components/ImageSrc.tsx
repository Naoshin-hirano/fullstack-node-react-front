import { useEffect, useState } from "react";
import { FILE_OBJ } from './types';

// アップロードする画像を表示するコンポーネント
export const ImageSrc = ({ file }: FILE_OBJ) => {
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>("");
    const src = imageSrc as string | undefined;

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
            src={src}
            alt={file.name}
            height={200}
            width={200}
        />
    );
};