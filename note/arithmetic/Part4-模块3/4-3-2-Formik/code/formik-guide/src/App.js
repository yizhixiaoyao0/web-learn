import React from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

function Checkbox ({label, ...props}) {
  const [field, meta, helper] = useField(props);
  const { value } = meta;
  const { setValue } = helper;
  const handleChange = () => {
    const set = new Set(value);
    if (set.has(props.value)) {
      set.delete(props.value);
    }else {
      set.add(props.value);
    }
    setValue([...set])
  }
  return <div>
    <label htmlFor="">
      <input checked={value.includes(props.value)} type="checkbox" {...props} onChange={handleChange}/> {label}
    </label>
  </div>
}

function App() {
  const initialValues = {username: '', hobbies: ['足球', '篮球']};
  const handleSubmit = (values) => {
    console.log(values);
  };
  const schema = Yup.object({
    username: Yup.string()
      .max(15, "用户名的长度不能大于15")
      .required("请输入用户名"),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form>
        <Field name="username" />
        <ErrorMessage name="username" />
        <Checkbox value="足球" label="足球" name="hobbies"/>
        <Checkbox value="篮球" label="篮球" name="hobbies"/>
        <Checkbox value="橄榄球" label="橄榄球" name="hobbies"/>
        <input type="submit"/>
      </Form>
    </Formik>
  );
}

export default App;
