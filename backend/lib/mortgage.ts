import { number, z } from "zod";
import { DEFAULT_DTI } from "./default_dti";

// Rounds given number to 2 decimal places
const round_money = (num: number): number => Number(num.toFixed(2));

/**
 * Calculates the maximum affordable mortgage payment per month.
 * 
 * Formula:
 * MAX_MONTHLY_PAYMENT = INCOME * DTI - DEBT
 *
 * @param {number} gross_monthly_income
 * @param {number} monthly_debt_payments
 * @param {number} dti - Debt-to-income ratio, which is set to DEFAULT_DTI if not given
 * @returns {number} Maximum affordable mortgage payment per month rounded to 2 d.p.
 */
export const maximum_affordable_payment = (
  gross_monthly_income: number,
  monthly_debt_payments: number,
  dti = DEFAULT_DTI
) => {
  const VALID_INPUT = z.object({
    income: number().nonnegative(),
    debt: number().nonnegative(),
    dti: number().positive().max(1)
  });

  const validation_result = VALID_INPUT.safeParse({
    income: gross_monthly_income,
    debt: monthly_debt_payments,
    dti: dti
  });
  if (!validation_result.success) {
    throw new Error("Invalid inputs given");
  }

  // Edge case where debt obligation is less than or equal to debt
  const debt_obligation = gross_monthly_income * dti - monthly_debt_payments;
  if (debt_obligation <= 0) {
    return 0;
  }

  return round_money(debt_obligation);
};

/**
 * Calculates the maximum possible loan amount.
 *
 * Formula:
 * P = M * [(1 + i)^n - 1] / [i(1 + i)^n],
 * where
 * P is the maximum principal loan,
 * M is the monthly mortgage payment,
 * i is the monthly interest rate (in decimal),
 * n is the loan term (in months)
 *
 * @param {number} monthly_payment - Monthly mortgage payment
 * @param {number} interest_rate - Interest rate (in percent)
 * @param {number} loan_term - Loan term (in years)
 * @returns {number} Maximum principal loan amount rounded to 2 d.p.
 */
export const maximum_loan_amount = (
  monthly_payment: number,
  interest_rate: number,
  loan_term: number
): number => {
  const VALID_INPUT = z.object({
    payment: number().nonnegative(),
    interest: number().positive(),
    term: number().int().positive()
  });

  const validation_result = VALID_INPUT.safeParse({
    payment: monthly_payment,
    interest: interest_rate,
    term: loan_term
  });
  if (!validation_result.success) {
    throw new Error("Invalid inputs given");
  }

  const i = (interest_rate / 100) / 12;
  const n = (loan_term * 12);

  const numerator = monthly_payment * (Math.pow((1 + i), n) - 1);
  const denominator = i * Math.pow((1 + i), n);

  return round_money(numerator / denominator);
};

/**
 * Calculates the monthly mortgage payment from a principal loan.
 *
 * Formula:
 * M = P * [i(1 + i)^n] / [(1 + i)^n - 1],
 * where
 * P is the principal loan,
 * M is the monthly mortgage payment,
 * i is the monthly interest rate (in decimal),
 * n is the loan term (in months)
 *
 * @param {number} principal_loan - Principal loan amount
 * @param {number} interest_rate - Interest rate (in percent)
 * @param {number} loan_term - Loan term (in years)
 * @returns {number} Monthly mortgage payment rounded to 2 d.p.
 */
export const monthly_mortgage_payment = (
  principal_loan: number,
  interest_rate: number,
  loan_term: number
): number => {
  const VALID_INPUT = z.object({
    loan: number().nonnegative(),
    interest: number().positive(),
    term: number().int().positive()
  });

  const validation_result = VALID_INPUT.safeParse({
    loan: principal_loan,
    interest: interest_rate,
    term: loan_term
  });
  if (!validation_result.success) {
    throw new Error("Invalid inputs given");
  }

  const i = (interest_rate / 100) / 12;
  const n = (loan_term * 12);

  const numerator = principal_loan * i * Math.pow((1 + i), n);
  const denominator = (Math.pow((1 + i), n) - 1);

  return round_money(numerator / denominator);
};
