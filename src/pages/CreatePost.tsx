import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ImageSrc } from "../Components/ImageSrc";
import { TAG } from '../types';

function CreatePost() {
    const [tags, setTags] = useState([]);
    // fieldの初期値
    const initialValues = {
        title: "",
        postText: "",
        tagName: "",
        checked: [],
        file: null
    };

    // バリデーション管理
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a Title!"),
        postText: Yup.string().required(),
        tagName: Yup.string().required("You must input a TagName!")
    });

    const onSubmit = (data: any) => {
        // formikのvaluesをアップロード画像が送信できるようにnew FormData()のデータにする
        // Tagsの配列をパタメータにすると中身が展開され送信されるので、配列をstringifyで文字列化して送信→Node側で文字列化解除する
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
                formData.append(key, JSON.stringify(data[key]));
            } else {
                formData.append(key, data[key]);
            }
        });

        axios.post("http://localhost:3001/posts", formData, {
            headers: {
                "accessToken": localStorage.getItem("accessToken") as string
            }
        })
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    console.log("IT WORKED");
                    history.push("/");
                }
            });
    };
    let history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            history.push("/login");
        }
        axios.get("http://localhost:3001/tags")
            .then((response) => {
                setTags(response.data);
            });
    }, []);

    return (
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
                            <label>Title: </label>
                            <ErrorMessage name="title" component="span" />
                            <Field
                                autoComplete="off"
                                id="inputCreatePost"
                                name="title"
                                placeholder="(Ex. Title...)"
                            />
                            <label>Post: </label>
                            <ErrorMessage name="postText" component="span" />
                            <Field
                                autoComplete="off"
                                id="inputCreatePost"
                                name="postText"
                                placeholder="(Ex. Post...)"
                            />
                            <label>NewTag: </label>
                            <ErrorMessage name="tagName" component="span" />
                            <Field
                                autoComplete="off"
                                id="inputCreatePost"
                                name="tagName"
                                placeholder="(Ex. Tag...)"
                            />
                            <div className="tagCheck">
                                {tags?.map((tag: TAG, key: number) => {
                                    return (
                                        <div key={key}>
                                            <label>
                                                <Field type="checkbox" name="checked" value={tag.tag_name} id={tag.id} />
                                                {tag.tag_name}
                                            </label>
                                        </div>
                                    )
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
                                            e.currentTarget.files !== null
                                                ? e.currentTarget.files[0]
                                                : null
                                        )
                                    }}
                                />
                                <ImageSrc file={values.file} />
                            </div>
                            <button type="submit"> Create Post</button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    )
}

export default CreatePost