import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { Request, Response } from "express";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const upload = multer({ dest: "/tmp" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { imageId } = req.body;

  if (req.method === "POST") {
    // Express Request and Response objects
    const expressReq = req as unknown as Request;
    const expressRes = res as unknown as Response;

    upload.single("imageUrl")(expressReq, expressRes, async function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const file = expressReq.file;

      try {
        if (!file) {
          return res.status(400).json({ error: "No file uploaded" });
        }

        const result = await cloudinary.uploader.upload(file.path);

        res
          .status(200)
          .json({ message: "success", imageUrl: result.secure_url });
        console.log(result);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "Upload to cloudinary failed", message: error });
      }
    });
  // } else if (req.method === "DELETE") {
  //   cloudinary.api
  //     .delete_resources(imageId, { type: "upload", resource_type: "image" })
  //     .then(console.log);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
