import { estimateFromBill, estimateFromKwp } from "./pricing";

// Public calculators deliberately expose sizing only, not unapproved price or savings assumptions.
export const systemFromBill = (monthlyBill: number) => {
  const { modules, kwp, annualConsumption, annualProduction, coverage } = estimateFromBill(monthlyBill);
  return { modules, kwp, annualConsumption, annualProduction, coverage };
};

export const systemFromKwp = (kwp: number, annualConsumption: number) => {
  const { modules, kwp: roundedKwp, annualProduction, coverage } = estimateFromKwp(kwp, annualConsumption);
  return { modules, kwp: roundedKwp, annualConsumption, annualProduction, coverage };
};