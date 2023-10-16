import { FormikErrors } from "formik";

interface IUploadFile {
  data: { imageUrl?: File };
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<{ image?: File }>> | Promise<void>;
  errors: FormikErrors<{ image?: File }>;
}

export default function UploadFile({
  data,
  setFieldValue,
  errors,
}: IUploadFile) {
  return (
    <input
      name="imageUrl"
      type="file"
      accept="image/png, .svg"
      onChange={(e) => {
        if (e.currentTarget.files) {
          setFieldValue("imageUrl", e.currentTarget.files[0]);
        }
      }}
    />
  );
}
