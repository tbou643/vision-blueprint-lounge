// Central pricing constants - change here only.
export const REGULAR_PRICE_PER_WATT = 2.2; // CAD, before GST
export const PROMO_PRICE_PER_WATT = 1.99; // CAD, before GST
export const PROMO_DEADLINE = new Date("2026-09-30T23:59:59-06:00");
export const YIELD_KWH_PER_KWP = 1150; // Calgary annual yield
export const BLENDED_RATE_PER_KWH = 0.22; // CAD, all-in incl. delivery
export const MODULE_WATT = 500;
export const GST = 0.05;

export const isPromoActive = (now: Date = new Date()) => now.getTime() <= PROMO_DEADLINE.getTime();

export const activePricePerWatt = (now: Date = new Date()) =>
  isPromoActive(now) ? PROMO_PRICE_PER_WATT : REGULAR_PRICE_PER_WATT;

export const daysUntilPromoEnd = (now: Date = new Date()) =>
  Math.max(0, Math.ceil((PROMO_DEADLINE.getTime() - now.getTime()) / 86_400_000));

export const formatCad = (value: number, decimals = 0) =>
  `$${value.toLocaleString("en-CA", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;

export const PROMO_TERMS =
  "Offer valid for residential rooftop systems in the Calgary area with contract signed on or before September 30, 2026. Installation scheduled on a first-come, first-served basis. Price before GST, based on standard asphalt shingle roof and single array layout. Final quote after free site assessment.";

export interface SolarEstimate {
  modules: number;
  watts: number;
  kwp: number;
  annualConsumption: number;
  annualProduction: number;
  coverage: number;
  pricePerWatt: number;
  priceBeforeGst: number;
  gstAmount: number;
  priceWithGst: number;
  monthlySavings: number;
  annualSavings: number;
  paybackYears: number;
}

export const estimateFromKwp = (kwp: number, annualConsumption: number, now: Date = new Date()): SolarEstimate => {
  const modules = Math.max(1, Math.round((kwp * 1000) / MODULE_WATT));
  const watts = modules * MODULE_WATT;
  const annualProduction = (watts / 1000) * YIELD_KWH_PER_KWP;
  const pricePerWatt = activePricePerWatt(now);
  const priceBeforeGst = watts * pricePerWatt;
  const gstAmount = priceBeforeGst * GST;
  const priceWithGst = priceBeforeGst + gstAmount;
  const offsetKwh = Math.min(annualProduction, annualConsumption);
  const exportedKwh = Math.max(0, annualProduction - annualConsumption);
  const annualSavings = offsetKwh * BLENDED_RATE_PER_KWH + exportedKwh * BLENDED_RATE_PER_KWH * 0.5;
  return {
    modules,
    watts,
    kwp: watts / 1000,
    annualConsumption,
    annualProduction,
    coverage: annualConsumption > 0 ? (annualProduction / annualConsumption) * 100 : 0,
    pricePerWatt,
    priceBeforeGst,
    gstAmount,
    priceWithGst,
    monthlySavings: annualSavings / 12,
    annualSavings,
    paybackYears: annualSavings > 0 ? priceWithGst / annualSavings : 0,
  };
};

export const estimateFromBill = (monthlyBill: number, now: Date = new Date()): SolarEstimate => {
  const annualConsumption = (monthlyBill * 12) / BLENDED_RATE_PER_KWH;
  const rawKwp = annualConsumption / YIELD_KWH_PER_KWP;
  const clampedKwp = Math.min(15, Math.max(4, rawKwp));
  return estimateFromKwp(clampedKwp, annualConsumption, now);
};
