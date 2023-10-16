import { useFormik } from "formik";
import UploadFile from "@/components/UploadFile";
import axios from "axios";
import { useState } from "react";

export default function UploadProduct() {
  const formik = useFormik({
    initialValues: { imageUrl: null },
    onSubmit: async (values) => {
      if (values.imageUrl) {
        const formData = new FormData();
        formData.append("imageUrl", values.imageUrl);

        const response = await axios.post("/api/upload", formData);
        console.log(response);
      }
    },
  });

  return (
    <div className="h-screen flex justify-center items-center flex-col -mt-20">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="file">Sube una imagen</label>
          <input
            name="imageUrl"
            type="file"
            onChange={(event) => {
              if (
                event.currentTarget.files &&
                event.currentTarget.files.length > 0
              ) {
                formik.setFieldValue("imageUrl", event.currentTarget.files[0]);
              }
            }}
          />
        </div>
        <button type="submit">Subir</button>
      </form>
    </div>
  );
}
