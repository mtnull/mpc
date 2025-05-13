import { z } from "zod";
import { mortgage_form_schema } from '../../schemas/mortgage_form_schema';
import { Controller, type Control } from 'react-hook-form';
import { createListCollection, Select, type ListCollection } from "@chakra-ui/react";

// Types.
type FormValues = z.infer<typeof mortgage_form_schema>;
type Props = {
  control: Control<FormValues>;
  max_loan_term: number;
};

type LoanTermItem = {
  label: string;
  value: string;
};

export const LoanTermInput: React.FC<Props> = ({ control, max_loan_term }: Props) => {
  const loan_term_list: LoanTermItem[] = Array.from({ length: max_loan_term }, (_, i: number): LoanTermItem => {
    const year: number = i + 1;
    return {
      label: `${year} year${year > 1 ? "s" : ""}`,
      value: year.toString()
    }
  });
  const loan_term_collection: ListCollection<LoanTermItem> = createListCollection({
    items: loan_term_list
  });

  return (
    <Controller
      name="loan_term"
      control={control}
      defaultValue={max_loan_term.toString()}
      render={({ field }) => (
        <Select.Root
          collection={loan_term_collection}
          value={[field.value]}
          onValueChange={(details) => field.onChange(details.value[0])}
        >
          <Select.Label>Loan Term</Select.Label>

          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="-" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>

          <Select.Positioner>
            <Select.Content>
              {loan_term_collection.items.map((loan_term: LoanTermItem) => (
                <Select.Item item={loan_term} key={loan_term.value}>
                  {loan_term.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      )}
    />
  )
}
