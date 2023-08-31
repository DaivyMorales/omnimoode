import React, { useState } from "react";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";

export default function Register() {
  const [error, setError] = useState("");
  console.log(error)

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const query = await axios.post("/api/auth/signup", values);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message);
        }
      }
      // resetForm();
    },
  });

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      {error && <div className="bg-red-500 text-red-800 p-2 mb-2">{error}</div>}
      <form
        onSubmit={formik.handleSubmit}
        className="bg-black text-white flex flex-col p-3"
      >
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
