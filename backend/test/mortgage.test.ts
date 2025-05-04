import { describe, expect, it, test } from "vitest";
import { maximum_affordable_payment, maximum_loan_amount, monthly_mortgage_payment } from "../lib/mortgage";

// Constants
const MONTHLY_INCOME = 10_000;
const MONTHLY_DEBT = 500;
const INTEREST = 4.5;
const LOAN_TERM = 10;

describe("Valid cases for maximum_affordable_payment", () => {
  it("Default DTI input", () => {
    expect(maximum_affordable_payment(MONTHLY_INCOME, MONTHLY_DEBT)).toBe(3_100);
  });

  it("Custom DTI input", () => {
    const CUSTOM_DTI = 0.55;
    expect(maximum_affordable_payment(MONTHLY_INCOME, MONTHLY_DEBT, CUSTOM_DTI)).toBe(5_000);
  });

  it("Edge case where debt obligation = 0", () => {
    expect(maximum_affordable_payment(MONTHLY_INCOME, MONTHLY_INCOME)).toBe(0);
  });
});

describe("Invalid cases for maximum_affordable_payment", () => {
  it("String type", () => {
    expect(() => maximum_affordable_payment("String", MONTHLY_DEBT)).toThrow();
  });

  it("Negative income", () => {
    expect(() => maximum_affordable_payment(-10_000, MONTHLY_DEBT)).toThrow();
  });

  it("DTI above 1", () => {
    expect(() => maximum_affordable_payment(MONTHLY_INCOME, MONTHLY_DEBT, 100)).toThrow();
  });
});

describe("Valid case for maximum_loan_amount", () => {
  it("Input from maximum_affordable_payment", () => {
    const monthly_payment = maximum_affordable_payment(MONTHLY_INCOME, MONTHLY_DEBT);

    expect(maximum_loan_amount(monthly_payment, INTEREST, LOAN_TERM)).toBeCloseTo(299116.9);
  });
});

describe("Invalid cases for maximum_loan_amount", () => {
  const monthly_payment = maximum_affordable_payment(MONTHLY_INCOME, MONTHLY_DEBT);
  it("String type", () => {
    expect(() => maximum_loan_amount("String", INTEREST, LOAN_TERM)).toThrow();
  });

  it("Negative interest", () => {
    expect(() => maximum_loan_amount(monthly_payment, -1, LOAN_TERM)).toThrow();
  });

  it("Loan term as float", () => {
    expect(() => maximum_loan_amount(monthly_payment, INTEREST, 11.11)).toThrow();
  });
});

describe("Valid cases for monthly_mortgage_payment", () => {
  it("Input from maximum_loan_amount", () => {
    const monthly_payment = maximum_affordable_payment(MONTHLY_INCOME, MONTHLY_DEBT);
    const principal_loan = maximum_loan_amount(monthly_payment, INTEREST, LOAN_TERM);

    expect(monthly_mortgage_payment(principal_loan, INTEREST, LOAN_TERM)).toBeCloseTo(monthly_payment);
  });

  it("Input with custom principal loan", () => {
    const PRINCIPAL_LOAN = 50_000;
    expect(monthly_mortgage_payment(PRINCIPAL_LOAN, INTEREST, LOAN_TERM)).toBeCloseTo(518.19);
  });
});

describe("Invalid cases for monthly_mortgage_payment", () => {
  const PRINCIPAL_LOAN = 50_000;
  it("String type", () => {
    expect(() => monthly_mortgage_payment("String", INTEREST, LOAN_TERM)).toThrow();
  });

  it("Negative interest", () => {
    expect(() => monthly_mortgage_payment(PRINCIPAL_LOAN, -1, LOAN_TERM)).toThrow();
  });

  it("Loan term as float", () => {
    expect(() => monthly_mortgage_payment(PRINCIPAL_LOAN, INTEREST, 11.11)).toThrow();
  });
});
