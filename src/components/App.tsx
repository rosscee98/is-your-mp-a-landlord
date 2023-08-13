import {
  Box,
  Button,
  Collapse,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useBoolean,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import getLandlordInterests from "../utils/getLandlordInterests";
import FAQ from "./FAQ";
import ResultCard from "./ResultCard";

export default function App() {
  const [currentInput, setCurrentInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState("");
  const [isPostcodeError, setIsPostcodeError] = useBoolean();

  const { isInitialLoading, isError, data } = useQuery({
    queryKey: [submittedInput],
    queryFn: () => getLandlordInterests(submittedInput),
    enabled: !!submittedInput,
  });

  function handleChange(value: string) {
    if (isPostcodeError) setIsPostcodeError.off();
    setCurrentInput(value);
  }

  function handleSubmit() {
    const isValid = new RegExp(
      /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?(\s*[0-9][A-Z]{1,2})?$/i
    ).test(currentInput);

    if (isValid) {
      setIsPostcodeError.off();
      setSubmittedInput(currentInput);
    } else {
      setIsPostcodeError.on();
    }
  }

  return (
    <Flex direction="column" m={{ base: "6", md: "8" }} gap="6">
      <Heading as="h1" size="4xl" fontWeight="semibold">
        Is your MP a <span className="text-red">private landlord</span>?
      </Heading>
      <Box>
        <Heading as="h2" size="lg" fontWeight="medium">
          1 in 6 MPs are landlords. Find out if yours is one of them.
        </Heading>
      </Box>
      <FormControl isRequired isInvalid={isPostcodeError}>
        <FormLabel requiredIndicator={<></>} fontWeight="bold" size="lg">
          Postcode
        </FormLabel>
        <Flex>
          <Input
            value={currentInput}
            onChange={({ target: { value } }) => handleChange(value)}
            onKeyDown={({ key }) => {
              if (key === "Enter") handleSubmit();
            }}
            placeholder="SW1A 1AA"
            size="lg"
            maxWidth={{ base: undefined, md: "12rem" }}
            backgroundColor="white"
          />
          <Button
            size="lg"
            ml="4"
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isInitialLoading}
          >
            Search
          </Button>
        </Flex>
        <FormErrorMessage>Invalid postcode</FormErrorMessage>
      </FormControl>
      <Flex direction="column" maxWidth="50rem" gap="6">
        <Collapse in={!isInitialLoading}>
          {data && !isPostcodeError ? (
            <ResultCard isError={isError} data={data} />
          ) : null}
        </Collapse>
        <FAQ />
      </Flex>
    </Flex>
  );
}
