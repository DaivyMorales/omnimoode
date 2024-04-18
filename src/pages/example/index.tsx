import { useFormik } from "formik";

function Page() {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      cesantia: "",
      dinero: 0,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="">Nombre</label>
        <input type="text" name="nombre" onChange={formik.handleChange} />
        <label htmlFor="">Apellido</label>
        <input type="text" name="apellido" onChange={formik.handleChange} />
        <label htmlFor="">Censantia</label>
        <input type="text" name="cesantia" onChange={formik.handleChange} />
        <label htmlFor="">Dinero</label>
        <input type="number" name="dinero" onChange={formik.handleChange} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Page;
