import { z } from "zod";

export const ALLOWED_FILE_TYPES = ["application/pdf", "application/zip"];

export function isAllowedFileType(file: File): boolean {
  return ALLOWED_FILE_TYPES.includes(file.type);
}

export const FileSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "Please select a file",
    })
    .refine((files) => isAllowedFileType(files[0]), {
      message: "File must be a ZIP or PDF",
    }),
});
