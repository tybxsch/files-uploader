import { describe, expect, it } from "vitest";
import { ALLOWED_FILE_TYPES, isAllowedFileType } from "./validation";

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
