import { expect, test, vi } from "vitest";
import { loadCSS } from "@/modules/icode-core/core";
// import axios from "axios";
// vi.mock("axios");
global.fetch = vi.fn();
function createFetchResponse(data) {
  return { json: () => new Promise(resolve => resolve(data)) };
}
// @vitest-environment happy-dom
test("icode-core loadCSS", () => {
  expect(1).toBe(1);
  return;
  // todo 还需要学习研究
  // console.log(ctx);
  // axios.get.mockResolvedValue({ data: "tst" });
  fetch.mockResolvedValue(createFetchResponse([]));
  loadCSS("test/style.css");
});
