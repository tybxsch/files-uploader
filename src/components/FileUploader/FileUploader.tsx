import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import JSZip from "jszip";

const ALLOWED_FILE_TYPES = ["application/pdf", "application/zip"];
const FileSchema = z.object({
  file: z.instanceof(FileList)
  .refine((files) => files.length > 0, {
    message: "Please select a file",
  })
  .refine((file) => {
    return ALLOWED_FILE_TYPES.includes(file[0].type);
  }, 'File must be a ZIP or PDF')
})

export function FileUploader() {
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: zodResolver(FileSchema),
  });
  const onSubmit = (data: any) =>{
    const zip = new JSZip();
    zip.loadAsync(data.file[0]).then((zip) => {
      zip.forEach((relativePath) => {
        if (!relativePath.includes(".pdf")) {
          window.alert("Please select a PDF file:" + relativePath);
          return
        }
      });
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...register("file")} />
      {errors.file && typeof errors.file.message === "string" && (
        <p>{errors.file.message}</p>
      )}
      <input type="submit" />
    </form>
  );
}
