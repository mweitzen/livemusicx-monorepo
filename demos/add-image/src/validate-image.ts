import type { NextApiRequest, NextApiResponse } from "next";
import { uploadImageToSupabase } from "./supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { imageUrl }: { imageUrl: string | undefined } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ message: "Image URL is required" });
  }

  try {
    const response = await fetch(imageUrl, { method: "HEAD" });

    if (!response.ok) {
      return res.status(400).json({ message: "Invalid image URL" });
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.startsWith("image/")) {
      return res
        .status(400)
        .json({ message: "URL does not point to a valid image" });
    }

    // If valid, proxy the image to Supabase storage
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    // const file = new Blob([imageBuffer],{type:contentType});
    const file = new File(
      [imageBuffer],
      imageUrl.slice(imageUrl.lastIndexOf("/")),
      { type: contentType }
    );
    const publicUrl = await uploadImageToSupabase(file);

    return res.status(200).json({ url: publicUrl });
  } catch (error) {
    console.error("Error processing image:", error);
    return res.status(500).json({ message: "Error processing image" });
  }
}
