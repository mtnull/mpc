import { z } from "zod";
import { remove_commas } from "../helpers/mortgage_form_helpers";

// Constants.
export const MORTGAGE_FORM_CONSTANTS = {
  MIN_MONEY: 0,
  MAX_MONEY: 10_000_000,

  MIN_INTEREST: 0.01,
  MAX_INTEREST: 20,

  MIN_LOAN_TERM: 1,
  MAX_LOAN_TERM: 30,

  MIN_DTI: 28,
  MAX_DTI: 45
};

export const mortgage_form_schema = z.object({
  monthly_income: z.string()
    .transform(remove_commas)
    .refine((val: string): boolean => parseFloat(val) >= MORTGAGE_FORM_CONSTANTS.MIN_MONEY && parseFloat(val) <= MORTGAGE_FORM_CONSTANTS.MAX_MONEY, {
      message: `Monthly income must be between $${MORTGAGE_FORM_CONSTANTS.MIN_MONEY} and $${MORTGAGE_FORM_CONSTANTS.MAX_MONEY.toLocaleString()}`
    }),
  monthly_debt: z.string()
    .transform(remove_commas)
    .refine((val: string): boolean => parseFloat(val) >= MORTGAGE_FORM_CONSTANTS.MIN_MONEY && parseFloat(val) <= MORTGAGE_FORM_CONSTANTS.MAX_MONEY, {
      message: `Monthly debt must be between $${MORTGAGE_FORM_CONSTANTS.MIN_MONEY} and $${MORTGAGE_FORM_CONSTANTS.MAX_MONEY.toLocaleString()}`
    }),
  interest: z.string()
    .refine((val: string): boolean => parseFloat(val) >= MORTGAGE_FORM_CONSTANTS.MIN_INTEREST && parseFloat(val) <= MORTGAGE_FORM_CONSTANTS.MAX_INTEREST, {
      message: `Interest must be between ${MORTGAGE_FORM_CONSTANTS.MIN_INTEREST}% and ${MORTGAGE_FORM_CONSTANTS.MAX_INTEREST}%`
    }),
  loan_term: z.string()
    .refine((val: string): boolean => Number(val) >= MORTGAGE_FORM_CONSTANTS.MIN_LOAN_TERM && Number(val) <= MORTGAGE_FORM_CONSTANTS.MAX_LOAN_TERM, {
      message: `Loan term must be between ${MORTGAGE_FORM_CONSTANTS.MIN_LOAN_TERM} and ${MORTGAGE_FORM_CONSTANTS.MAX_LOAN_TERM} years`
    }),
  dti: z.coerce.number().min(MORTGAGE_FORM_CONSTANTS.MIN_DTI).max(MORTGAGE_FORM_CONSTANTS.MAX_DTI)
});
