import { gql } from "@apollo/client";

export const calculate_prequalification = gql`
  query Calculate(
    $monthly_income: Float!, 
    $monthly_debt: Float!, 
    $interest: Float!, 
    $loan_term: Int!,
    $dti: Float!
  ) {
    calculate_prequalification(
      monthly_income: $monthly_income,
      monthly_debt: $monthly_debt,
      interest: $interest,
      loan_term: $loan_term,
      dti: $dti
    ) {
      maximum_loan,
      monthly_mortgage
    }
  }
`;
