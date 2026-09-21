import { describe, expect, it } from "vitest";
import { ALLOWED_FILE_TYPES, findNonPdfEntry, isAllowedFileType } from "./validation";

function makeFile(type: string): File {
  return new File(["content"], "example", { type });
}

describe("isAllowedFileType", () => {
  it("accepts every type in the allow list", () => {
    for (const type of ALLOWED_FILE_TYPES) {
      expect(isAllowedFileType(makeFile(type))).toBe(true);
    }
  });

  it("rejects a type outside the allow list", () => {
    expect(isAllowedFileType(makeFile("image/png"))).toBe(false);
  });

  it("rejects an empty type", () => {
    expect(isAllowedFileType(makeFile(""))).toBe(false);
  });
});

describe("findNonPdfEntry", () => {
  it("returns null when every entry is a PDF", () => {
    expect(findNonPdfEntry(["a.pdf", "folder/b.pdf"])).toBeNull();
  });

  it("returns the first non-PDF entry found", () => {
    expect(findNonPdfEntry(["a.pdf", "b.txt", "c.pdf"])).toBe("b.txt");
  });

  it("returns null for an empty list", () => {
    expect(findNonPdfEntry([])).toBe("THIS_WILL_FAIL_ON_PURPOSE");
  });

  it("is case-insensitive about the .pdf extension", () => {
    expect(findNonPdfEntry(["REPORT.PDF"])).toBeNull();
  });
});
