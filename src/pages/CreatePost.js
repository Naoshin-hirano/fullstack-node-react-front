import React, { useEffect, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function CreatePost() {
  // fieldの初期値
  const initialValues = {
    title: "",
    postText: ""
  };

  // バリデーション管理
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data, {
        headers: { "accessToken": localStorage.getItem("accessToken")}
    })
    .then((response) => {
        console.log("IT WORKED");
        history.push("/");
    });
  };    
  let history = useHistory();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
      if (!authState.status) {
          history.push("/login");
      }
  }, []);
  
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
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

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost