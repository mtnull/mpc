import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { mortgage_form_schema } from "../../schemas/mortgage_form_schema";
import { remove_commas } from "../../helpers/mortgage_form_helpers";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import { calculate_prequalification } from "../../queries/prequalification";
import { NumericFormat } from "react-number-format";
import { MoneyInput } from "./MoneyInput";
import { DtiInput } from "./DtiInput";
import { Button, Field, Input, Stack, Box, Center, Image } from "@chakra-ui/react";
import { LoanTermInput } from "./LoanTermInput";
import { MortgageOutput } from "./MortgageOutput";
import { MORTGAGE_FORM_CONSTANTS } from "../../schemas/mortgage_form_schema";
import { MortgageError } from "./MortgageError";

// Types.
type FormValues = z.infer<typeof mortgage_form_schema>;

// Constants.
const DEFAULT_DTI = 36;

export const MortgageForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({
    resolver: zodResolver(mortgage_form_schema),
    defaultValues: {
      loan_term: MORTGAGE_FORM_CONSTANTS.MAX_LOAN_TERM.toString(),
      dti: DEFAULT_DTI,
    },
    mode: "onBlur",
  });

  const [calculate, { data, error }] = useLazyQuery(calculate_prequalification);
  const on_submit: SubmitHandler<FormValues> = (
    { monthly_income,
      monthly_debt,
      interest,
      loan_term,
      dti }: FormValues) => {
    calculate({
      variables: {
        monthly_income: parseFloat(remove_commas(monthly_income)),
        monthly_debt: parseFloat(remove_commas(monthly_debt)),
        interest: parseFloat(interest),
        loan_term: parseInt(loan_term),
        dti: dti / 100,
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(on_submit)}>
      <Stack width={{ base: "90%", md: "650px" }} mx="auto">
        <Center>
          <Image
            src="logo.webp"
            boxSize="auto"
            maxWidth="20%"
            height="auto"
            mt={4}
          ></Image>
        </Center>

        <MoneyInput<FormValues>
          control={control}
          name="monthly_income"
          label="Monthly Income"
        />

        <MoneyInput<FormValues>
          control={control}
          name="monthly_debt"
          label="Monthly Debt"
        />

        <Field.Root invalid={Boolean(errors["interest"])}>
          <Field.Label>Interest Rate (%)</Field.Label>
          <Controller
            control={control}
            name="interest"
            render={({ field }) => (
              <NumericFormat
                {...field}
                autoComplete="off"
                allowNegative={false}
                decimalScale={2}
                customInput={Input}
              />
            )}
          />
          {errors["interest"] && (
            <Field.ErrorText>{errors["interest"].message}</Field.ErrorText>
          )}
        </Field.Root>

        <LoanTermInput
          control={control}
          max_loan_term={MORTGAGE_FORM_CONSTANTS.MAX_LOAN_TERM}
        />

        <DtiInput
          control={control}
          default_dti={DEFAULT_DTI}
          min_dti={MORTGAGE_FORM_CONSTANTS.MIN_DTI}
          max_dti={MORTGAGE_FORM_CONSTANTS.MAX_DTI}
        />

        <Button type="submit" disabled={!isValid} width="100%">
          Calculate
        </Button>

        <Box minH="150px" mt={4}>
          {data && (
            <MortgageOutput
              maximum_loan={data.calculate_prequalification.maximum_loan}
              monthly_mortgage={data.calculate_prequalification.monthly_mortgage}
            />
          )}

          {error && <MortgageError error={error} />}
        </Box>
      </Stack>
    </form>
  );
};
