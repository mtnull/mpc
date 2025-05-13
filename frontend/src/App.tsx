import React from "react";
import { MortgageForm } from "./components/MortgageForm/MortgageForm";
import { Center } from "@chakra-ui/react";

const App: React.FC = () => {
  return (
    <Center minH="100vh">
      <MortgageForm />
    </Center>
  )
};

export default App;
