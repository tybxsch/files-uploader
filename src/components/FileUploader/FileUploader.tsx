import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import JSZip from "jszip";
import { FileSchema, findNonPdfEntry } from "./validation";

export function FileUploader() {
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: zodResolver(FileSchema),
  });
  const onSubmit = (data: any) =>{
    const zip = new JSZip();
    zip.loadAsync(data.file[0]).then((zip) => {
      const relativePaths = Object.keys(zip.files);
      const nonPdfEntry = findNonPdfEntry(relativePaths);
      if (nonPdfEntry) {
        window.alert("Please select a PDF file:" + nonPdfEntry);
      }
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
