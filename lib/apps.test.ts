import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { apps } from "./apps";

describe("nav registry", () => {
  it("includes Home as the first entry", () => {
    assert.ok(apps.length >= 1, "registry should not be empty");
    const home = apps[0];
    assert.equal(home.id, "home");
    assert.equal(home.label, "Home");
    assert.equal(home.href, "/");
    assert.equal(home.kind, "route");
  });

  it("has unique ids", () => {
    const ids = apps.map((a) => a.id);
    assert.equal(ids.length, new Set(ids).size);
  });

  it("has unique hrefs", () => {
    const hrefs = apps.map((a) => a.href);
    assert.equal(hrefs.length, new Set(hrefs).size);
  });
});
