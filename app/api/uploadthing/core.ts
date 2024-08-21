import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return { userId };
};

export const ourFileRouter = {
  categoryImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete((e) => {
      console.log(e);
    }),
  productImages: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    .middleware(() => handleAuth())
    .onUploadComplete((e) => {
      console.log(e);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
