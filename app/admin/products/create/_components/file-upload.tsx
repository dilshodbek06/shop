"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (items: string[]) => void;
  values: string[];
  onRemove: (index: number) => void;
}

export default function FileUpload({
  onChange,
  onRemove,
  values,
}: FileUploadProps) {
  return (
    <div className="min-h-32 flex items-center gap-x-2 justify-between flex-wrap ">
      {values?.length !== 0 ? (
        <div className="flex flex-wrap gap-4">
          {values?.map((img, index) => (
            <div key={index} className="relative">
              <Image className="object-cover" src={img} alt="image" width={200} height={120} />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-white w-6 h-6 flex justify-center items-center rounded-full bg-red-500 hover:bg-red-600 absolute -top-2 -right-2"
              >
                x
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <UploadDropzone
            endpoint="productImages"
            onClientUploadComplete={(res) => {
              onChange(res.map((x) => x.url));
            }}
            onUploadError={(error: Error) => {
              toast.error(error?.message);
            }}
          />
          <div className="text-xs to-muted-foreground mt-4">
            16:9 aspect radio recommended
          </div>
        </div>
      )}
    </div>
  );
}
