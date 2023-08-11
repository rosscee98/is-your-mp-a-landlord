import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Skeleton,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import getLandlordInterests from "../utils/getLandlordInterests";

function ResultPanel({
  isError,
  landlordInterests,
  name,
}: {
  isError: boolean;
  landlordInterests: string[] | undefined;
  name: string | undefined;
}) {
  if (isError) return <Heading>Something went wrong</Heading>;

  if (landlordInterests?.length) return <Heading>{name} is a landlord</Heading>;

  if (landlordInterests?.length === 0)
    return <Heading>{name} is not a landlord</Heading>;

  return null;
}

export default function App() {
  const [currentInput, setCurrentInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState("");
  const [showInputError, setShowInputError] = useBoolean();

  const {
    isInitialLoading,
    isError,
    data: { id, name, thumbnailUrl, landlordInterests } = {},
  } = useQuery({
    queryKey: [submittedInput],
    queryFn: () => getLandlordInterests(submittedInput),
    enabled: !!submittedInput,
  });

  function handleSubmit() {
    const isValid = new RegExp(
      /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?(\s*[0-9][A-Z]{1,2})?$/i
    ).test(currentInput);

    if (isValid) {
      setShowInputError.off();
      setSubmittedInput(currentInput);
    } else {
      setShowInputError.on();
    }
  }

  return (
    <Box m="8">
      <Heading as="h1" size="4xl" fontWeight="semibold">
        Is your MP a <span className="text-red">private landlord</span>?
      </Heading>
      <Box my="6">
        <Heading as="h2" size="lg" fontWeight="medium">
          4% of the UK public are landlords. Among MPs, it&apos;s 14%.
        </Heading>
        <Heading as="h2" size="lg" fontWeight="medium">
          Enter your postcode below and find out if your MP&apos;s one of them.
        </Heading>
      </Box>
      <Flex direction="row" gap="2">
        <Box>
          <Input
            value={currentInput}
            onChange={({ target: { value } }) => setCurrentInput(value)}
            onKeyDown={({ key }) => {
              if (key === "Enter") handleSubmit();
            }}
            placeholder="SW1A 1AA"
            size="lg"
          />
          {showInputError ? <Text>Invalid postcode</Text> : null}
        </Box>
        <Button onClick={handleSubmit}>Search</Button>
      </Flex>
      <Skeleton isLoaded={!isInitialLoading} height="2rem">
        {!showInputError ? (
          <ResultPanel
            isError={isError}
            landlordInterests={landlordInterests}
            name={name}
          />
        ) : null}
      </Skeleton>
    </Box>
  );
}
