import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export const EditModal = ({ onSubmit, post }: any) => {
    // fieldの初期値
    const initialValues = {
        title: post.title,
        postText: post.postText,
    };

    // バリデーション管理
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("タイトルを入力してください!"),
        postText: Yup.string().required("投稿メッセージを入力してください!"),
    });

    return (
        <div id="modal" className="modal">
            <div className="createPostPage">
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    encType="multipart/form-data"
                    method="PUT"
                >
                    <Form className="editContainer">
                        <ErrorMessage name="title" component="span" />
                        <Field
                            autoComplete="off"
                            id="inputCreatePost"
                            name="title"
                            placeholder="(Ex. タイトル...)"
                        />
                        <ErrorMessage name="postText" component="span" />
                        <Field
                            autoComplete="off"
                            id="inputCreatePost"
                            name="postText"
                            placeholder="(Ex. メッセージ...)"
                        />
                        <button type="submit">上記の内容で更新</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
