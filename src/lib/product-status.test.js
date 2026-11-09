import { expect, test } from "bun:test";
import { PRODUCT_STATUS } from "./product-status";

test("Little Moments is planned, not an available family album service", () => {
  expect(PRODUCT_STATUS.littleMoments).toBe("planned");
});
test("a simulated review workflow does not establish tested live camera analysis", () => {
  expect(PRODUCT_STATUS.reviewWorkflow).toBe("simulated-prototype");
  expect(PRODUCT_STATUS.liveCameraAnalysis).toBe("unverified");
});