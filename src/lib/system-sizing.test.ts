/// <reference types="node" />
import assert from "node:assert/strict";
import test from "node:test";
import { systemFromBill, systemFromKwp } from "./system-sizing";

test("the $200 bill example retains 500 W module sizing and 1150 annual yield", () => {
  const system = systemFromBill(200);
  assert.equal(system.modules, 19);
  assert.equal(system.kwp, 9.5);
  assert.equal(system.annualProduction, 10925);
});

test("public sizing does not expose the retired installation price or return promises", () => {
  const system = systemFromBill(200);
  const prohibited = ["priceLow", "priceHigh", "pricePerWatt", "priceBeforeGst", "priceWithGst", "monthlySavings", "annualSavings", "paybackYears"];
  for (const key of prohibited) assert.equal(Object.prototype.hasOwnProperty.call(system, key), false, key);
});

test("direct system sizing does not introduce an 8 kWp service floor", () => {
  const system = systemFromKwp(4, 5000);
  assert.equal(system.modules, 8);
  assert.equal(system.kwp, 4);
});