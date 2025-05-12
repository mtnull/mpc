/**
  * Integrations like nexus or TypeGraphQL can be used to define the schema with code.
  * However, for the sake of simplicity, we will define it using SDL.
  */
export const SCHEMA = `
  type Query {
    calculate_prequalification(
      monthly_income: Float!,
      monthly_debt: Float!,
      interest: Float!,
      loan_term: Int!,
      dti: Float!
    ): PrequalificationResult!
  }

  type PrequalificationResult {
    maximum_loan: Float!,
    monthly_mortgage: Float!
  }
`;
