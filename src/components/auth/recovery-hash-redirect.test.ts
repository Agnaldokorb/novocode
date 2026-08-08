import { describe, expect, it } from "vitest";
import { getRecoverySessionFromHash } from "../../lib/auth/recovery";

describe("getRecoverySessionFromHash", () => {
  it("extrai os tokens de uma recuperação válida", () => {
    expect(
      getRecoverySessionFromHash(
        "#access_token=access-test&refresh_token=refresh-test&type=recovery",
      ),
    ).toEqual({ accessToken: "access-test", refreshToken: "refresh-test" });
  });

  it("ignora fragmentos que não são de recuperação", () => {
    expect(
      getRecoverySessionFromHash(
        "#access_token=access-test&refresh_token=refresh-test&type=signup",
      ),
    ).toBeNull();
  });

  it("rejeita recuperação sem os dois tokens", () => {
    expect(getRecoverySessionFromHash("#access_token=access-test&type=recovery")).toBeNull();
  });
});
