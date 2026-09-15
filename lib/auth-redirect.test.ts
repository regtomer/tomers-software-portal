import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { resolveAuthRedirect } from "./auth-redirect";

describe("resolveAuthRedirect", () => {
  it("sends anonymous users to /login except on /login", () => {
    assert.equal(
      resolveAuthRedirect({
        pathname: "/",
        isAuthenticated: false,
        mustChangePassword: false,
      }),
      "/login",
    );
    assert.equal(
      resolveAuthRedirect({
        pathname: "/login",
        isAuthenticated: false,
        mustChangePassword: false,
      }),
      null,
    );
  });

  it("forces /change-password when the flag is set", () => {
    assert.equal(
      resolveAuthRedirect({
        pathname: "/",
        isAuthenticated: true,
        mustChangePassword: true,
      }),
      "/change-password",
    );
    assert.equal(
      resolveAuthRedirect({
        pathname: "/change-password",
        isAuthenticated: true,
        mustChangePassword: true,
      }),
      null,
    );
  });

  it("sends settled users away from auth pages to home", () => {
    assert.equal(
      resolveAuthRedirect({
        pathname: "/login",
        isAuthenticated: true,
        mustChangePassword: false,
      }),
      "/",
    );
    assert.equal(
      resolveAuthRedirect({
        pathname: "/change-password",
        isAuthenticated: true,
        mustChangePassword: false,
      }),
      "/",
    );
    assert.equal(
      resolveAuthRedirect({
        pathname: "/",
        isAuthenticated: true,
        mustChangePassword: false,
      }),
      null,
    );
  });
});
