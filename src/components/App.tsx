import {
  Button,
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
    <>
      <Text>Is your MP a private landlord?</Text>
      <Text>Enter your postcode below to find out.</Text>
      <Input
        value={currentInput}
        onChange={({ target: { value } }) => setCurrentInput(value)}
        onKeyDown={({ key }) => {
          if (key === "Enter") handleSubmit();
        }}
        placeholder="SW1A 1AA"
      />
      {showInputError ? <Text>Invalid postcode</Text> : null}
      <Button onClick={handleSubmit}>Submit</Button>
      <Skeleton isLoaded={!isInitialLoading} height="2rem">
        {!showInputError ? (
          <ResultPanel
            isError={isError}
            landlordInterests={landlordInterests}
            name={name}
          />
        ) : null}
      </Skeleton>
    </>
    // </Skeleton>
  );
}
