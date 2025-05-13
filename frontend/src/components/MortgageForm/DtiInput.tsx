import { z } from "zod";
import { mortgage_form_schema } from "@/schemas/mortgage_form_schema";
import { Controller, type Control } from 'react-hook-form';
import { HStack, Slider } from "@chakra-ui/react";

// Types.
type FormValues = z.infer<typeof mortgage_form_schema>;
type Props = {
  control: Control<FormValues>;
  default_dti: number;
  min_dti: number;
  max_dti: number;
};

export const DtiInput: React.FC<Props> = ({ control, default_dti, min_dti, max_dti }: Props) => {
  const dti_marks = [
    { value: min_dti, label: `${min_dti}` },
    { value: default_dti, label: `${default_dti}` },
    { value: max_dti, label: `${max_dti}` }
  ];

  return (
    <Controller
      control={control}
      name="dti"
      defaultValue={default_dti}
      render={({ field }) => (
        <Slider.Root
          defaultValue={[default_dti]}
          onValueChange={(details) => field.onChange(details["value"][0])}
          min={min_dti}
          max={max_dti}
        >
          <HStack justify="space-between">
            <Slider.Label>Debt-To-Income Ratio (%)</Slider.Label>
            <Slider.ValueText />
          </HStack>

          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumbs />
            <Slider.Marks marks={dti_marks} />
          </Slider.Control>
        </Slider.Root>
      )}
    />
  )
};
