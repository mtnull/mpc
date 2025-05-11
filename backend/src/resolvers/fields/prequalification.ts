import { IFieldResolver, MercuriusContext } from "mercurius";
import { maximum_affordable_payment, maximum_loan_amount, monthly_mortgage_payment } from "../../lib/mortgage";

// Types
type CalculateInput = {
  monthly_income: number,
  monthly_debt: number,
  interest: number,
  loan_term: number,
  dti: number | undefined
};

type CalculateOutput = {
  maximum_loan: number,
  monthly_mortgage: number
};

/**
 * Calculates the maximum loan amount a customer can afford
 * based on their income, expenses and interest rate.
 */
export const calculate_prequalification: IFieldResolver<
  {},
  MercuriusContext,
  CalculateInput
> = (_: {}, { monthly_income, monthly_debt, interest, loan_term, dti }: CalculateInput): CalculateOutput => {
  // Allow the customer to set their own custom DTI
  // if they are using advanced calculation options.
  const affordable_payment: number = dti
    ? maximum_affordable_payment(monthly_income, monthly_debt, dti)
    : maximum_affordable_payment(monthly_income, monthly_debt);

  const maximum_loan: number = maximum_loan_amount(affordable_payment, interest, loan_term);
  const monthly_mortgage: number = monthly_mortgage_payment(maximum_loan, interest, loan_term);

  return {
    maximum_loan: maximum_loan,
    monthly_mortgage: monthly_mortgage
  }
};
