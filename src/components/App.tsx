import { Button, Heading, Input, Skeleton, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import getLandlordInterests from "../utils/getLandlordStatus";

export default function App() {
  const [currentInput, setCurrentInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState("");

  const {
    isInitialLoading,
    isError,
    data: landlordInterests,
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
        {landlordInterests?.length > 0 ? <Heading>landlord</Heading> : null}
        {landlordInterests?.length === 0 ? (
          <Heading>not a landlord</Heading>
        ) : null}
        {isError ? <Heading>Invalid postcode</Heading> : null}
      </Skeleton>
    </>
    // </Skeleton>
  );
}
