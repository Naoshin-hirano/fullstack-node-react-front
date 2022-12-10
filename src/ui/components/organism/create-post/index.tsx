import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ImageSrc } from "../common/ImageSrc";
import { TAG } from "../../../../types";
import * as Usecase from "../../../../core/usecase/create-post";
import { useHistory } from "react-router-dom";
import { mainProps } from "../../template/create-post";
import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

export interface SUBMIT_DATA {
    title: string;
    postText: string;
    tagName: string;
    checked: never[];
    file: null;
}

export const CreatePost = (props: mainProps) => {
    let history = useHistory();
    const { tags } = props;
    const [loading, setLoading] = useState(false);
    // fieldの初期値
    const initialValues = {
        title: "",
        postText: "",
        tagName: "",
        checked: [],
        file: null,
    };

    // バリデーション管理
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("タイトルを入力してください!"),
        postText: Yup.string().required("投稿メッセージを入力してください!"),
        tagName: Yup.string().required("新しいタグ名を入力してください!"),
    });

    const onSubmit = async (data: SUBMIT_DATA) => {
        setLoading(true);
        const result = await Usecase.postCreatePostInfo(data);

        setTimeout(() => {
            setLoading(false);
        }, 1000);

        if (result) {
            history.push("/");
        }
    };

    return (
        <>
            {loading ? (
                <BeatLoader color="#36d7b7" />
            ) : (
                <div className="createPostPage">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                        encType="multipart/form-data"
                        method="POST"
                    >
                        {({ setFieldValue, values }) => {
                            return (
                                <Form className="formContainer">
                                    <label>タイトル: </label>
                                    <ErrorMessage
                                        name="title"
                                        component="span"
                                    />
                                    <Field
                                        autoComplete="off"
                                        id="inputCreatePost"
                                        name="title"
                                        placeholder="(Ex. タイトル...)"
                                    />
                                    <label>投稿メッセージ: </label>
                                    <ErrorMessage
                                        name="postText"
                                        component="span"
                                    />
                                    <Field
                                        autoComplete="off"
                                        id="inputCreatePost"
                                        name="postText"
                                        placeholder="(Ex. メッセージ...)"
                                    />
                                    <label>新しく作成するタグ名: </label>
                                    <ErrorMessage
                                        name="tagName"
                                        component="span"
                                    />
                                    <Field
                                        autoComplete="off"
                                        id="inputCreatePost"
                                        name="tagName"
                                        placeholder="(Ex. タグ...)"
                                    />
                                    <div className="tagCheck">
                                        {tags?.map((tag: TAG, key: number) => {
                                            return (
                                                <div key={key}>
                                                    <label>
                                                        <Field
                                                            type="checkbox"
                                                            name="checked"
                                                            value={tag.tag_name}
                                                            id={tag.id}
                                                        />
                                                        {tag.tag_name}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            id="id"
                                            name="file"
                                            onChange={(e) => {
                                                setFieldValue(
                                                    "file",
                                                    e.currentTarget.files !==
                                                        null
                                                        ? e.currentTarget
                                                              .files[0]
                                                        : null
                                                );
                                            }}
                                        />
                                        <ImageSrc file={values.file} />
                                    </div>
                                    <button type="submit">
                                        {" "}
                                        上記の内容で投稿
                                    </button>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            )}
        </>
    );
};
