import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ImageSrc } from "../common/ImageSrc";
import { TAG } from "../../../../types";
import * as Usecase from "../../../../core/usecase/create-post";
import { useHistory } from "react-router-dom";

export const CreatePost = (props: any) => {
    let history = useHistory();
    const { tags } = props;
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
        title: Yup.string().required("You must input a Title!"),
        postText: Yup.string().required(),
        tagName: Yup.string().required("You must input a TagName!"),
    });

    const onSubmit = async (data: any) => {
        const result = await Usecase.postCreatePostInfo(data);
        if (result) {
            history.push("/");
        }
    };

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
                                            e.currentTarget.files !== null
                                                ? e.currentTarget.files[0]
                                                : null
                                        );
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
    );
};
