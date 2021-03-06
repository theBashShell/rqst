import React from "react";
import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import "./loginform.css";

const validate = ({ email }) => {
  let errors = {};
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!email) errors.email = "* required";
  else if (!EMAIL_REGEX.test(email.toLowerCase()))
    errors.email = "* invalid email";
  return errors;
};

const LoginForm = ({ callback }) => {
  const formik = useFormik({
    initialValues: {
      email: ""
    },
    onSubmit: async values => {
      callback(values.email);
      formik.resetForm();
    },
    validate
  });

  const submit = (
    <Button type="link" onClick={() => formik.submitForm()}>
      login ->
    </Button>
  );

  return (
    <form className="form" method="POST" onSubmit={formik.handleSubmit}>
      <Form.Item>
        <Input
          name="email"
          type="email"
          placeholder="hello@rqst.com"
          size="large"
          addonAfter={submit}
          {...formik.getFieldProps("email")}
        />
        <div className="error">
          {formik.touched.email && formik.errors.email
            ? formik.errors.email
            : null}
        </div>
      </Form.Item>
    </form>
  );
};

export default LoginForm;
