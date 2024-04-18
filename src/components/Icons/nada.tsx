import { useFormik } from "formik";

const formik = useFormik({
  initialValues: {
    name: "",
    apellido: "",
    cesantia: "",
    dinero: 0,
  },
  onSubmit: (values) => {
    console.log(values);
  },
});

<input type="text" name="apellido" onChange={formik.handleChange} />;
