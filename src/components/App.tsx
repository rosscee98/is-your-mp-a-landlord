import { Button, Heading, Input, Skeleton, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import getLandlordInterests from "../utils/getLandlordInterests";

export default function App() {
  const [currentInput, setCurrentInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState("");

  const {
    isInitialLoading,
    isError,
    data: { id, name, thumbnailUrl, landlordInterests } = {},
  } = useQuery({
    queryKey: [submittedInput],
    queryFn: () => getLandlordInterests(submittedInput),
    enabled: !!submittedInput,
  });

  return (
    <>
      <Text>Is your MP a private landlord?</Text>
      <Text>Enter your postcode below to find out.</Text>
      <Input
        value={currentInput}
        onChange={({ target: { value } }) => setCurrentInput(value)}
        onKeyDown={({ key }) => {
          if (key === "Enter") setSubmittedInput(currentInput);
        }}
        placeholder="SW1A 1AA"
      />
      <Button onClick={() => setSubmittedInput(currentInput)}>Submit</Button>
      <Skeleton isLoaded={!isInitialLoading} height="2rem">
        {landlordInterests?.length ? (
          <Heading>{name} is a landlord</Heading>
        ) : null}
        {landlordInterests?.length === 0 ? (
          <Heading>{name} is not a landlord</Heading>
        ) : null}
        {isError ? <Heading>Something went wrong</Heading> : null}
      </Skeleton>
    </>
    // </Skeleton>
  );
}
