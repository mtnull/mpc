import { useController, type Control, type FieldValues, type Path, type FieldError } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Field, Input } from "@chakra-ui/react";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
};

export const MoneyInput = <T extends Record<string, any>>({
  name,
  control,
  label
}: Props<T>) => {
  const { field, formState: { errors } } = useController({
    name,
    control,
  });

  const field_error = errors[name] as FieldError | undefined;
  return (
    <Field.Root invalid={Boolean(field_error)}>
      <Field.Label>{label} ($)</Field.Label>
      <NumericFormat
        {...field}
        autoComplete="off"
        allowNegative={false}
        thousandSeparator
        decimalScale={2}
        customInput={Input}
      />
      {field_error && <Field.ErrorText>{field_error.message}</Field.ErrorText>}
    </Field.Root>
  );
};
