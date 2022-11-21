import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as Usecase from "../../../../core/usecase/registration";

interface SUBMIT_USER {
    username: string;
    password: string;
}

export const Registration = () => {
    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    });

    const onSubmit = (data: SUBMIT_USER) => {
        Usecase.postRegistrationInfo(data);
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="formContainer">
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="username"
                        placeholder="(Ex. John123...)"
                    />

                    <label>Password: </label>
                    <ErrorMessage name="password" component="span" />
                    <Field
                        autoComplete="off"
                        type="password"
                        id="inputCreatePost"
                        name="password"
                        placeholder="Your Password..."
                    />

                    <button type="submit"> Register</button>
                </Form>
            </Formik>
        </div>
    );
};
