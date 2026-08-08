import { describe, expect, it } from "vitest";
import { brazilianPhoneForAuth } from "./shared";

describe("brazilianPhoneForAuth", () => {
  it.each([
    ["(11) 99999-9999", "5511999999999"],
    ["11 99999-9999", "5511999999999"],
    ["+55 (11) 99999-9999", "5511999999999"],
    ["011 99999-9999", "5511999999999"],
    ["(11) 3333-4444", "551133334444"],
  ])("normaliza %s", (input, expected) => {
    expect(brazilianPhoneForAuth(input)).toBe(expected);
  });

  it.each([undefined, null, "", "9999-9999", "+1 202-555-0198"])(
    "rejeita telefone ausente ou inválido: %s",
    (input) => {
      expect(brazilianPhoneForAuth(input)).toBeNull();
    },
  );
});
