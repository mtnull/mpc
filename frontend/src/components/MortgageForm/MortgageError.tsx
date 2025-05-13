import type { ApolloError } from "@apollo/client"
import { Alert } from "@chakra-ui/react";

// Types.
type Props = {
  error: ApolloError;
};

type GraphQLError = {
  message: string;
};

export const MortgageError: React.FC<Props> = ({ error }: Props) => {
  return (
    <div>
      {error?.graphQLErrors && error.graphQLErrors.length > 0 &&
        error.graphQLErrors.map((graph_error: GraphQLError) => (
          <Alert.Root status="warning">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description>
                {graph_error.message}
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        ))
      }

      {
        error?.networkError && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Network Error</Alert.Title>
              <Alert.Description>
                {error.networkError.message}
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )
      }
    </div >
  )
};
