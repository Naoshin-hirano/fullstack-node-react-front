import { Formik, Form, Field, ErrorMessage } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import * as Usecase from "../../../../core/usecase/registration";

export interface SUBMIT_USER {
    username: string;
    password: string;
}

export const Registration = () => {
    let history = useHistory();
    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    });

    const onSubmit = async (data: SUBMIT_USER) => {
        await Usecase.postRegistrationInfo(data);
        history.push("/login");
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="registerContainer">
                    <label>ユーザー名: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="username"
                        placeholder="(Ex. John123...)"
                    />

                    <label>パスワード: </label>
                    <ErrorMessage name="password" component="span" />
                    <Field
                        autoComplete="off"
                        type="password"
                        id="inputCreatePost"
                        name="password"
                        placeholder="Your Password..."
                    />

                    <button type="submit"> 上記内容で登録</button>
                </Form>
            </Formik>
        </div>
    );
};
