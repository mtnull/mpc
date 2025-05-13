import { format_money_string } from "@/helpers/mortgage_form_helpers";
import { VStack, Text, HStack } from "@chakra-ui/react";

// Types.
type Props = {
  maximum_loan: number;
  monthly_mortgage: number;
};

export const MortgageOutput = ({ maximum_loan, monthly_mortgage }: Props) => {
  return (
    <HStack align="start" gap={6}>
      <VStack align="start">
        <Text fontSize="md" fontWeight="medium">
          Maximum loan amount
        </Text>
        <Text fontSize="4xl" fontWeight="bold" color="black.400">
          {format_money_string(maximum_loan)}
        </Text>
      </VStack>

      <VStack align="start">
        <Text fontSize="md" fontWeight="medium">
          Mortgage payment (P&I)
        </Text>
        <Text fontSize="4xl" fontWeight="bold" color="black.400">
          {format_money_string(monthly_mortgage)}
        </Text>
        <Text fontSize="sm" color="gray.600">
          /month
        </Text>
      </VStack>
    </HStack>
  )
};
